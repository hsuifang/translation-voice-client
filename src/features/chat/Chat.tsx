import { useState, useRef, useEffect } from 'react';
import { Box, HStack, Grid, Text, Flex, Avatar, useToast, Select, useMediaQuery } from '@chakra-ui/react';
import Recorder from './components/Recorder';
import VoiceAnimation from './components/VoiceAnimation';
import { clamp } from 'framer-motion';
import dayjs from 'dayjs';
import { useSpeachTranslate } from './services/mutations';

interface ISource {
  url: string;
  autoPlay: boolean;
  sourceText?: string;
  targetText?: string;
}
interface AudioContent {
  time: string;
  source: ISource[];
}

const Chat = () => {
  const [isLessThan500] = useMediaQuery('(max-width: 500px)');

  const [audioUrl, setAudioUrl] = useState<AudioContent[]>([]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // lang
  const [sourceLang, setSourceLang] = useState('zh');
  const [targetLang, setTargetLang] = useState('en');

  // upload audio
  const { mutateAsync: speechTranslateReq } = useSpeachTranslate();

  // toast
  const toast = useToast();

  const handleUpdateBlob = (blob: Blob) => {
    // 確認長度
    const url = URL.createObjectURL(blob);
    const mediaElement = new Audio(url);

    mediaElement.addEventListener('loadedmetadata', () => {
      if (mediaElement.duration < 1 || mediaElement.duration > 10) {
        toast({
          status: 'error',
          description: '錄音長度須介於 1 秒 ~ 10 秒 ',
          position: 'top',
        });
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

  function base64ToBlob(base64: string, mimetype: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimetype });
  }

  const handleUpload = async (blob: Blob) => {
    setIsUploading(true);
    const audioFile = new File([blob], `record-${dayjs().format('YYYYMMDDHHmmss')}.wav`, { type: 'audio/wav' });
    try {
      const { source_text, target_text, file } = await speechTranslateReq({
        file: audioFile,
        source_lang: sourceLang,
        target_lang: targetLang,
      });

      // Convert base64 string to Blob
      const audioBlob = base64ToBlob(file, 'audio/wav');
      // Create a URL for the Blob
      const audioURL = URL.createObjectURL(audioBlob);
      // const audioURL = URL.createObjectURL(result);
      setAudioUrl((prev) => {
        if (prev.length === 0) {
          return prev;
        }
        const newSource = [
          ...prev[prev.length - 1].source,
          { url: audioURL, autoPlay: true, sourceText: source_text, targetText: target_text },
        ];
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
  }, [audioUrl]);

  return (
    <Grid
      templateRows="5% 80% 15%"
      maxW={clamp(450, 500, 500)}
      w="100%"
      h="100%"
      mx="auto"
      borderRadius="8px"
      padding="20px"
      bg="gray.100"
    >
      <HStack>
        <Text>
          {sourceLang}轉 {targetLang}
        </Text>
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
          <Flex mb="10px" wrap={'wrap'} key={content.time + idx}>
            <Avatar
              size={isLessThan500 ? 'xs' : 'md'}
              name="longphant"
              mr="10px"
              src="https://obs.line-scdn.net/0hl2Vf6yhUMx1rHyG96v9MSjlCOH9YfS0WSSsnegtgBEYHfysjVikZLUxPCyxHfzwgHBgaOghgH0ZHThIrCywZegd3C3tCfS8gHCwJCwVPG38AVCgRXwUM/f256x256"
            />
            <Box>
              <Box bg="white" padding="10px" w="fit-content" borderRadius="8px" mb="5px">
                {content.source.map((src, idx) => (
                  <Box mb="10px" key={src.url + idx}>
                    {src.sourceText && <Text mb={2}>{src.sourceText}</Text>}
                    <audio controls autoPlay={src.autoPlay}>
                      <source src={src.url} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                    {src.targetText && <Text>{src.targetText}</Text>}
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
        <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          <option value="zh">中文</option>
          <option value="en">英文</option>
          <option value="ko">韓語</option>
          <option value="ja">日文</option>
          <option value="pl">波文</option>
        </Select>
        <Box mx="2">
          <Recorder updateBlob={handleUpdateBlob} setIsRecording={setIsRecording} isRecording={isRecording} />
        </Box>
        <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          <option value="zh">中文</option>
          <option value="en">英文</option>
          <option value="ko">韓語</option>
          <option value="ja">日文</option>
          <option value="pl">波文</option>
        </Select>
      </HStack>
    </Grid>
  );
};

export default Chat;
