// test chatItem
import { render, screen, userEvent, cleanup } from '@/lib/test-utils';
import ChatItem from './ChatItem';
// @ts-ignore
import styles from './animation.module.css';

describe('ChatItem', () => {
  let handleUpdateText = vi.fn();
  const wrapper = (isProcess = false) => (
    <ChatItem
      text="test"
      handleUpdateText={handleUpdateText}
      language="zh"
      isProcess={isProcess}
      autoPlay={false}
      url={''}
      setLanguage={() => {}}
    >
      <div data-testid="recorder-entry" />
    </ChatItem>
  );
  function renderWrap() {
    const { rerender } = render(wrapper());
    const textBox = screen.getByTestId('chat-text');
    const recorder = screen.queryByTestId('recorder-entry');
    const sendTextBtn = screen.queryByTestId('sendText-entry');

    return {
      textBox,
      recorder,
      sendTextBtn,
      rerender,
    };
  }

  afterEach(() => {
    cleanup();
  });

  test('change textbox to typing mode, after clicking chatItem Textbox', async () => {
    const { textBox } = renderWrap();
    expect(textBox).toHaveAttribute('readOnly');
    expect(textBox).toHaveAttribute('maxLength', '50');
    await userEvent.click(textBox);
    expect(textBox).not.toHaveAttribute('readOnly');
  });

  test('show recorder and text: test before typing', async () => {
    const { recorder, sendTextBtn } = renderWrap();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(recorder).toBeInTheDocument();
    expect(sendTextBtn).not.toBeInTheDocument();
  });

  test('update sending text when pressing sending text', async () => {
    const { textBox, sendTextBtn } = renderWrap();
    let typingText = 'WORD';
    await userEvent.click(textBox);
    expect(textBox).not.toHaveAttribute('readOnly');
    await userEvent.type(textBox, typingText);

    expect(screen.getByText(`test${typingText}`)).toBeInTheDocument();

    if (sendTextBtn) {
      await userEvent.click(sendTextBtn);
      expect(handleUpdateText).toHaveBeenCalledWith(`test${typingText}`);
      expect(screen.getByText(`test`)).toBeInTheDocument();
    }
  });

  test('isProcess is true, clear typing text', async () => {
    const { textBox, rerender } = renderWrap();
    let typingText = 'WORD';
    await userEvent.click(textBox);
    await userEvent.type(textBox, typingText);

    expect(screen.getByText(`test${typingText}`)).toBeInTheDocument();

    rerender(wrapper(true));
    rerender(wrapper(false));
    expect(screen.getByText(`test`)).toBeInTheDocument();
  });
});
