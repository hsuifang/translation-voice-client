import { useState, useRef, useEffect } from 'react';
import { Box, HStack, Input, Grid, Text, Flex, Avatar, useToast, Select } from '@chakra-ui/react';
import Recorder from './components/Recorder';
import VoiceAnimation from './components/VoiceAnimation';
import { clamp } from 'framer-motion';
import dayjs from 'dayjs';
import { useSpeachTranslate } from './services/mutations';

interface ISource {
  url: string;
  autoPlay: boolean;
}
interface AudioContent {
  time: string;
  source: ISource[];
}

const Chat = () => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState<string[]>([]);
  const [audioUrl, setAudioUrl] = useState<AudioContent[]>([]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // upload audio
  const { mutateAsync: speechTranslateReq } = useSpeachTranslate();

  const handleClick = () => {
    setMessage([...message, text]);
    setText('');
  };

  //
  const toast = useToast();

  const handleUpdateBlob = (blob: Blob) => {
    // 確認長度
    const url = URL.createObjectURL(blob);
    const mediaElement = new Audio(url);
    mediaElement.addEventListener('loadedmetadata', () => {
      console.log('----', mediaElement.duration);
      if (mediaElement.duration < 2 || mediaElement.duration > 10) {
        toast({
          status: 'error',
          description: '錄音長度須介於 2 秒 和 10 秒 ',
          position: 'top',
        });
        return;
      } else {
        setAudioUrl([
          ...audioUrl,
          {
            time: dayjs().format('HH:mm:ss'),
            source: [
              {
                url,
                autoPlay: false,
              },
            ],
          },
        ]);
        handleUpload(blob);
      }
    });
    mediaElement.load();
  };

  const handleUpload = async (blob: Blob) => {
    setIsUploading(true);
    const audioFile = new File([blob], `record-${dayjs().format('YYYYMMDDHHmmss')}.wav`, { type: 'audio/wav' });
    try {
      const result = await speechTranslateReq(audioFile);
      const audioURL = URL.createObjectURL(result);

      setAudioUrl((prev) => {
        if (prev.length === 0) {
          return prev;
        }
        const newSource = [...prev[prev.length - 1].source, { url: audioURL, autoPlay: true }];
        const newLast = { ...prev[prev.length - 1], source: newSource };
        const newItems = [...prev.slice(0, -1), newLast];
        return newItems;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  // scroll Style

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [message, audioUrl]);

  // lang
  const [lang, setLang] = useState('zh');

  return (
    <Grid
      templateRows="5% 80% 15%"
      maxW={clamp(450, 500, 500)}
      w="100%"
      mx="auto"
      minH="700px"
      maxH="100vh"
      borderRadius="8px"
      padding="20px"
      bg="gray.100"
    >
      {/* 對話筐 */}
      <HStack>
        <Text>中文轉 {lang}</Text>
      </HStack>
      <Box
        bg="gray.50"
        position="relative"
        borderRadius="8px"
        overflowY="scroll"
        scrollBehavior="smooth"
        padding="10px"
      >
        {audioUrl.map((content, idx) => (
          <Flex mb="10px" key={content.time + idx}>
            <Avatar
              size="md"
              name="longphant"
              mr="10px"
              src="https://obs.line-scdn.net/0hl2Vf6yhUMx1rHyG96v9MSjlCOH9YfS0WSSsnegtgBEYHfysjVikZLUxPCyxHfzwgHBgaOghgH0ZHThIrCywZegd3C3tCfS8gHCwJCwVPG38AVCgRXwUM/f256x256"
            />
            <Box>
              <Box bg="white" padding="10px" w="fit-content" borderRadius="8px" mb="5px">
                {content.source.map((src, idx) => (
                  <Box mb="10px" key={src.url + idx}>
                    <audio controls autoPlay={src.autoPlay}>
                      <source src={src.url} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                  </Box>
                ))}
              </Box>
              <Text as="samp" display="block" textAlign="right" fontSize="10px">
                {content.time}
              </Text>
              {isUploading && idx === audioUrl.length - 1 && <VoiceAnimation />}
            </Box>
          </Flex>
        ))}

        <div ref={endOfMessagesRef} />
        {isRecording && (
          <Box w="100%" position="absolute" bottom="10px" left="50%" transform="translateX(-50%)">
            <Flex w="100%" justifyContent="center">
              <VoiceAnimation />
            </Flex>
          </Box>
        )}
      </Box>
      <HStack>
        <Select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="zh">中文</option>
          <option value="en">英文</option>
          <option value="ko">韓語</option>
          <option value="ja">日文</option>
        </Select>
        <Input
          size="lg"
          placeholder="輸入文字"
          value={text}
          bg="white"
          disabled
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleClick();
            }
          }}
        />
        <Recorder updateBlob={handleUpdateBlob} setIsRecording={setIsRecording} isRecording={isRecording} />
      </HStack>
    </Grid>
  );
};

export default Chat;
