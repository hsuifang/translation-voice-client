import { useCallback, useEffect, useState } from 'react';

interface MediaDevice {
  deviceId: string;
  kind: string;
  label: string;
  groupId: string;
}

interface UseMediaDevicesHook {
  devices: MediaDevice[];
  stream: MediaStream | null;
  error: Error | null;
  getUserMediaStream: (contraints: MediaStreamConstraints) => Promise<void>;
}

const useMediaDevices = (): UseMediaDevicesHook => {
  // store a list of the currently available media input and output devices
  const [devices, setDevices] = useState<MediaDevice[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const getDevices = useCallback(async () => {
    try {
      setError(null);
      const mediaDevices = await navigator.mediaDevices.enumerateDevices();
      setDevices(mediaDevices as MediaDevice[]);
    } catch (err) {
      setError(err as Error);
    }
  }, []);

  const getUserMediaStream = useCallback(async (constraints: MediaStreamConstraints) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      // After permission is granted and stream is received, enumerate devices
      await getDevices();
    } catch (e) {
      setError(e as Error);
      setStream(null);
    }
  }, []);

  useEffect(() => {
    const handleDeviceChange = () => {
      // Call getDevices again to refresh the list of devices
      getDevices();
    };
    // Add event listener for device change
    if (navigator.mediaDevices) {
      navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
    }

    // Cleanup function to remove event listener
    return () => {
      if (navigator.mediaDevices) {
        navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
      }
    };
  }, [getDevices]);

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [stream]);

  return {
    devices,
    error,
    stream,
    getUserMediaStream,
  };
};

export default useMediaDevices;
