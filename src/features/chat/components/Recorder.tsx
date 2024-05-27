import { useRef, useEffect, useCallback, useState } from 'react';
import useMediaDevices from '../hooks/useMediaDevices';
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
}

const Recorder = ({ recordLimitTime = 10, isRecording, updateBlob, setIsRecording, disabledBtn }: IRecorderProps) => {
  // devices
  const { getUserMediaStream, stream } = useMediaDevices();
  const mediaRecorderRef = useRef<RecordRTC | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  // countup
  const [recordSeconds, setRecordSeconds] = useState(0);

  useEffect(() => {
    getUserMediaStream({ audio: { deviceId: 'default', channelCount: 1, sampleRate: 16000 } });
  }, [getUserMediaStream]);

  const handleStartRecording = useCallback(() => {
    // Prevent starting a new recording if already recording
    if (isRecording) return;

    setIsRecording(true);
    audioChunksRef.current = [];

    try {
      if (stream) {
        mediaRecorderRef.current = new RecordRTC(stream, {
          type: 'audio',
          desiredSampRate: 16000,
          numberOfAudioChannels: 1,
          recorderType: RecordRTC.StereoAudioRecorder,
        });
        mediaRecorderRef.current.startRecording();
      }
    } catch (error) {
      console.error('Error accessing the microphone: ', error);
    }
  }, [isRecording, stream]);

  const handleStopRecording = useCallback(() => {
    if (!isRecording) return;
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stopRecording(() => {
        if (mediaRecorderRef.current) {
          const audioBlob = mediaRecorderRef.current.getBlob();
          updateBlob(audioBlob);
        }
      });
    }
  }, [isRecording, updateBlob, setIsRecording, mediaRecorderRef]);

  const toggleRecording = () => {
    setRecordSeconds(0);
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
          if (seconds > recordLimitTime + 1) {
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
    if (isRecording && recordSeconds === recordLimitTime + 1) {
      toggleRecording();
    }
  }, [isRecording, recordSeconds, toggleRecording]);

  return (
    <Flex justifyContent="center" direction="column">
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
