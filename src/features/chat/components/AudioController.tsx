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

const AudioController = ({ url, autoPlay = true }: { url: string; autoPlay: boolean }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };
  useEffect(() => {
    if (audioRef.current && autoPlay) {
      handlePlay();
      // userAgnent
    }
  }, [url, autoPlay, audioRef.current]);

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
      <audio ref={audioRef} autoPlay={autoPlay} controls hidden aria-label="Voice Message">
        <source src={url} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
};

export default AudioController;
