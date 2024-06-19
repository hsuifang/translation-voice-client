import { useEffect, useRef } from 'react';
import { IconButton, Box } from '@chakra-ui/react';
import { FaPlayCircle } from 'react-icons/fa';
import styled from '@emotion/styled';

const StyledIconButton = styled(IconButton)`
  animation: slowShow 0.5s linear;
  transition: opacity 0.5s;

  @keyframes slowShow {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const AudioController = ({ url, autoPlay = true }: { url: string | null; autoPlay: boolean }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = async () => {
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
  };

  const firstAutoPlay = () => {
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
        handlePlay();
      }
    }
  }, [url, audioRef.current]);

  useEffect(() => {
    document.addEventListener('touchstart', firstAutoPlay, { once: true });
    document.addEventListener('click', firstAutoPlay, { once: true });
    return () => {
      document.removeEventListener('touchstart', firstAutoPlay);
      document.removeEventListener('click', firstAutoPlay);
    };
  }, []);

  return (
    <Box>
      <StyledIconButton
        variant="ghost"
        colorScheme={'url' ? 'green' : 'gray'}
        borderRadius="50%"
        isDisabled={!url}
        aria-label="Voice Message"
        icon={<FaPlayCircle size={24} />}
        onClick={handlePlay}
      />
      <audio ref={audioRef} muted={true} playsInline={true} autoPlay={autoPlay} aria-label="Voice Message">
        {url && <source src={url} type="audio/wav" />}
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
};

export default AudioController;
