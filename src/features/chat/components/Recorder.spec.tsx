// import test library from '@/libs'
import { render, screen, userEvent } from '@/lib/test-utils';
import { vi } from 'vitest';
import Recorder from './Recorder';
import RecordRTC from 'recordrtc';

// test recorder component
describe('Recorder', () => {
  beforeAll(() => {
    vi.mock('../hooks/useMediaDevices', () => ({
      default: () => ({
        stream: '98765',
        getUserMediaStream: () => {},
      }),
    }));

    vi.mock('recordrtc', () => {
      return {
        default: vi.fn().mockImplementation((stream, options) => {
          expect(stream).toBeTruthy(); // Check if 'stream' is not undefined/null
          expect(options).toEqual({
            type: 'audio',
            desiredSampRate: 16000,
            numberOfAudioChannels: 1,
            recorderType: RecordRTC.StereoAudioRecorder,
          });

          return {
            startRecording: vi.fn(),
            stopRecording: vi.fn((callback) => {
              // Mimic the behavior that might happen during stopRecording
              const blob = new Blob(['audio data'], { type: 'audio/wav' });
              callback(blob);
            }),
            getBlob: vi.fn(() => new Blob(['audio data'], { type: 'audio/wav' })),
            setRecordingDuration: vi.fn(),
            reset: vi.fn(),
          };
        }),
      };
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('should render exected through props, isRecording is true', () => {
    render(<Recorder isRecording={true} updateBlob={vi.fn()} setIsRecording={vi.fn()} disabledBtn={false} />);
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
    expect(button).toHaveClass('shine-animation');
  });
  it('should render exected through props, disabledBtn is true', () => {
    render(<Recorder isRecording={true} updateBlob={vi.fn()} setIsRecording={vi.fn()} disabledBtn={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).not.toHaveClass('shine-animation');
  });

  it('if isRecording is true,  click recorder button, expect updateBlob is triggered ', async () => {
    const updateBlobFn = vi.fn();
    const setIsRecordingFn = vi.fn();

    const { rerender } = render(
      <Recorder isRecording={false} updateBlob={updateBlobFn} setIsRecording={setIsRecordingFn} disabledBtn={false} />,
    );

    // mock record 1 seconds
    const button = screen.getByRole('button');
    await userEvent.click(button);

    rerender(
      <Recorder isRecording={true} updateBlob={updateBlobFn} setIsRecording={setIsRecordingFn} disabledBtn={false} />,
    );
    await userEvent.click(button);

    expect(setIsRecordingFn).toHaveBeenCalledWith(false);
    expect(updateBlobFn).toHaveBeenCalled();
  });
  it('if isRecording is false,  click recorder button, expect setIsRecordingFn is triggered ', async () => {
    const updateBlobFn = vi.fn();
    const setIsRecordingFn = vi.fn();
    render(
      <Recorder isRecording={false} updateBlob={updateBlobFn} setIsRecording={setIsRecordingFn} disabledBtn={false} />,
    );
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(setIsRecordingFn).toHaveBeenCalledWith(true);
  });
});
