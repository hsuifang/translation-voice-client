// import test library from '@/libs'
import { render, screen, userEvent } from '@/lib/test-utils';
import { vi } from 'vitest';
import Recorder from './Recorder';
import RecordRTC from 'recordrtc';
import styles from './animation.module.css';

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
    render(
      <Recorder
        recordLimitTime={10}
        isRecording={true}
        updateBlob={vi.fn()}
        setIsRecording={vi.fn()}
        disabledBtn={false}
        stream={'98765' as any}
      />,
    );
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
    expect(button).toHaveClass(styles.shineAnimation);
  });
  it('should render exected through props, disabledBtn is true', () => {
    render(
      <Recorder
        recordLimitTime={10}
        isRecording={true}
        updateBlob={vi.fn()}
        setIsRecording={vi.fn()}
        disabledBtn={true}
        stream={'98765' as any}
      />,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).not.toHaveClass('shineAnimation');
  });

  it('if isRecording is true,  click recorder button, expect updateBlob is triggered ', async () => {
    const updateBlobFn = vi.fn();
    const setIsRecordingFn = vi.fn();

    const { rerender } = render(
      <Recorder
        recordLimitTime={10}
        isRecording={false}
        updateBlob={updateBlobFn}
        setIsRecording={setIsRecordingFn}
        disabledBtn={false}
        stream={'98765' as any}
      />,
    );

    // mock record 1 seconds
    const button = screen.getByRole('button');
    await userEvent.click(button);

    rerender(
      <Recorder
        recordLimitTime={10}
        isRecording={true}
        updateBlob={updateBlobFn}
        setIsRecording={setIsRecordingFn}
        disabledBtn={false}
        stream={'98765' as any}
      />,
    );
    await userEvent.click(button);

    expect(setIsRecordingFn).toHaveBeenCalledWith(false);
    expect(updateBlobFn).toHaveBeenCalled();
  });
  it('if isRecording is false,  click recorder button, expect setIsRecordingFn is triggered ', async () => {
    const updateBlobFn = vi.fn();
    const setIsRecordingFn = vi.fn();
    render(
      <Recorder
        recordLimitTime={10}
        isRecording={false}
        updateBlob={updateBlobFn}
        setIsRecording={setIsRecordingFn}
        disabledBtn={false}
        stream={'98765' as any}
      />,
    );
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(setIsRecordingFn).toHaveBeenCalledWith(true);
  });
});
