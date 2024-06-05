import { useRef } from 'react';
import { IconButton, Box } from '@chakra-ui/react';
import { FaPlayCircle } from 'react-icons/fa';

const AudioController = ({ url, autoPlay }: { url: string; autoPlay: boolean }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      }
    }
  };

  return (
    <Box>
      <IconButton size="xs" isDisabled={!url} aria-label="Voice Message" icon={<FaPlayCircle />} onClick={handlePlay} />
      <audio
        ref={audioRef}
        controls
        key={url}
        autoPlay={autoPlay}
        aria-label="Voice Message"
        style={{ width: 'auto', position: 'absolute' }}
      >
        <source src={url} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
};

export default AudioController;
