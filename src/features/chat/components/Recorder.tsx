import { useRef, useEffect, useCallback } from 'react';
import useMediaDevices from '../hooks/useMediaDevices';
import RecordRTC from 'recordrtc';
import { IconButton } from '@chakra-ui/react';
import { FaMicrophone } from 'react-icons/fa';

const Recorder = ({
  updateBlob,
  isRecording,
  setIsRecording,
}: {
  updateBlob: (blob: Blob) => void;
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
}) => {
  // devices
  const { getUserMediaStream, stream } = useMediaDevices();
  const mediaRecorderRef = useRef<RecordRTC | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    getUserMediaStream({ audio: { deviceId: 'default', channelCount: 1, sampleRate: 16000 } });
  }, [getUserMediaStream]);

  const toggleRecording = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };

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
      alert(error);
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
  }, [isRecording, stream]);

  return (
    <IconButton
      aria-label="Call Segun"
      borderRadius="50%"
      fontSize={'3xl'}
      minW="70px"
      minH="70px"
      size="lg"
      colorScheme={isRecording ? 'red' : 'teal'}
      icon={<FaMicrophone />}
      onClick={toggleRecording}
    />
  );
};

export default Recorder;
