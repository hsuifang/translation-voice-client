import { useRef, useEffect, useState } from 'react';
import RecordRTC from 'recordrtc';
import { IconButton } from '@chakra-ui/react';
import { FaMicrophone } from 'react-icons/fa';
import { Text, Box, Flex } from '@chakra-ui/react';
// @ts-ignore
import styles from './animation.module.css';

interface IRecorderProps {
  disabledBtn: boolean;
  updateBlob: (blob: Blob) => void;
  isRecording: boolean;
  recordLimitTime: number;
  setIsRecording: (isRecording: boolean) => void;
  stream: MediaStream | null;
}

const Recorder = ({
  recordLimitTime = 10,
  isRecording,
  updateBlob,
  setIsRecording,
  disabledBtn,
  stream,
}: IRecorderProps) => {
  // devices
  const mediaRecorderRef = useRef<RecordRTC | null>(null);

  // countup
  const [recordSeconds, setRecordSeconds] = useState(0);

  const handleStartRecording = () => {
    // Prevent starting a new recording if already recording
    if (isRecording && stream) return;
    setIsRecording(true);

    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state === 'inactive') {
        console.log('mediaRecorderRef.current.state', mediaRecorderRef.current.state);
        // mediaRecorderRef.current.onStateChanged('recording');
      }
      mediaRecorderRef.current.startRecording();
    }
  };

  const handleStopRecording = () => {
    if (!isRecording) return;
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stopRecording(() => {
        if (mediaRecorderRef.current) {
          const audioBlob = mediaRecorderRef.current.getBlob();
          updateBlob(audioBlob);
          mediaRecorderRef.current.reset();
        }
      });
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordSeconds((seconds) => {
          if (seconds > recordLimitTime) {
            clearInterval(interval!);
            return recordLimitTime;
          }
          return seconds + 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, setRecordSeconds]);

  useEffect(() => {
    setRecordSeconds(0);
  }, [isRecording]);

  useEffect(() => {
    if (isRecording && recordSeconds === recordLimitTime) {
      toggleRecording();
    }
  }, [isRecording, recordSeconds, toggleRecording]);

  useEffect(() => {
    if (stream) {
      mediaRecorderRef.current = new RecordRTC(stream, {
        type: 'audio',
        desiredSampRate: 16000,
        numberOfAudioChannels: 1,
        recorderType: RecordRTC.StereoAudioRecorder,
      });
    }
  }, [stream]);

  return (
    <Flex justifyContent="center" direction="column" data-testid="recorder-entry">
      <Box textAlign="center">
        {isRecording && !disabledBtn && (
          <Text as="samp" fontSize="12px" color="#999">
            {recordSeconds}s
          </Text>
        )}
      </Box>
      <IconButton
        aria-label="toggle recording button"
        borderRadius="50%"
        fontSize={'3xl'}
        minW="50px"
        minH="50px"
        size="lg"
        color={isRecording ? 'white' : 'gray.600'}
        colorScheme={disabledBtn ? 'blackAlpha' : isRecording ? 'red' : 'yellow'}
        icon={<FaMicrophone />}
        onClick={toggleRecording}
        className={isRecording && !disabledBtn ? styles.shineAnimation : ''}
        isDisabled={disabledBtn}
      />
    </Flex>
  );
};

export default Recorder;
