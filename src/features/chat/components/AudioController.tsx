import { useEffect, useRef } from 'react';
import { IconButton, IconButtonProps, Box } from '@chakra-ui/react';
import { FaPlayCircle } from 'react-icons/fa';
import styled from '@emotion/styled';

const StyledIconButton = styled(IconButton)`
  animation: slowShow 0.5s linear;
  transition: opacity 1s;

  @keyframes slowShow {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

interface AudioControllerProps {
  url: string | null;
  autoPlay?: boolean;
  iconButtonProps?: IconButtonProps;
  onError?: (error: any) => void;
}

const AudioController = ({ url, autoPlay = true, onError, iconButtonProps }: AudioControllerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = async () => {
    try {
      if (audioRef.current) {
        if (audioRef.current.paused) {
          await audioRef.current.play();
          audioRef.current.muted = false;
        } else {
          audioRef.current.pause();
          audioRef.current.muted = true;
          audioRef.current.currentTime = 0;
        }
      }
    } catch (error) {
      if (onError) onError(error);
    }
  };

  const fireAutoPlay = () => {
    if (autoPlay) {
      handlePlay();
    }
  };

  useEffect(() => {
    if (audioRef.current && url) {
      audioRef.current.src = url;
      audioRef.current.muted = true;
      audioRef.current.currentTime = 0;
      if (autoPlay) {
        fireAutoPlay();
      }
    }
  }, [url, audioRef.current]);

  useEffect(() => {
    document.addEventListener('touchstart', fireAutoPlay, { once: true });
    document.addEventListener('click', fireAutoPlay, { once: true });
    return () => {
      document.removeEventListener('touchstart', fireAutoPlay);
      document.removeEventListener('click', fireAutoPlay);
    };
  }, []);

  return (
    <Box>
      <StyledIconButton
        variant="ghost"
        isDisabled={!url}
        colorScheme={url ? 'green' : 'gray'}
        borderRadius="50%"
        aria-label={url ? 'Play voice message' : 'Voice message unavailable'}
        icon={<FaPlayCircle size={24} />}
        onClick={handlePlay}
        {...iconButtonProps}
      />
      <audio ref={audioRef} muted={true} playsInline={true} aria-label="Voice Message">
        {url && <source src={url} type="audio/wav" />}
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
};

export default AudioController;
