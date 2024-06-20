// test chatItem
import { render, screen, userEvent, cleanup } from '@/lib/test-utils';
import ChatItem from './ChatItem';
// @ts-ignore
import styles from './animation.module.css';

describe('ChatItem', () => {
  let handleUpdateText = vi.fn();
  const wrapper = (isProcess = false) => (
    <ChatItem
      isProcess={isProcess}
      language="zh"
      model="auto"
      handleUpdateText={handleUpdateText}
      triggerSettings={() => null}
      text="test"
      url={''}
      autoPlay={false}
    >
      <div data-testid="recorder-entry" />
    </ChatItem>
  );
  function renderWrap() {
    const { rerender } = render(wrapper());
    const textBox = screen.getByTestId('chat-text');
    const recorder = screen.queryByTestId('recorder-entry');
    const sendTextBtn = screen.queryByTestId('sendText-entry');
    const switchSettingsBtn = screen.queryByTestId('switchSettings-entry');
    const toggleTypingBtn = screen.queryByTestId('toggleTyping-entry');

    return {
      textBox,
      recorder,
      sendTextBtn,
      switchSettingsBtn,
      toggleTypingBtn,

      rerender,
    };
  }

  afterEach(() => {
    cleanup();
  });

  test('render expected chatItem', async () => {
    const { textBox } = renderWrap();
    expect(textBox).toHaveAttribute('maxLength', '50');
  });

  test('show recorder and text: test before typing', async () => {
    const { recorder, sendTextBtn } = renderWrap();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(recorder).toBeInTheDocument();
    expect(sendTextBtn).not.toBeInTheDocument();
  });

  test('update sending text when pressing sending text', async () => {
    const { textBox, sendTextBtn, toggleTypingBtn } = renderWrap();
    let typingText = 'WORD';

    if (toggleTypingBtn) {
      await userEvent.click(toggleTypingBtn);
    }
    await userEvent.type(textBox, typingText);
    expect(screen.getByText(`test${typingText}`)).toBeInTheDocument();

    if (sendTextBtn) {
      await userEvent.click(sendTextBtn);
      expect(handleUpdateText).toHaveBeenCalledWith(`test${typingText}`);
      expect(screen.getByText(`test`)).toBeInTheDocument();
    }
  });

  test('isProcess is true, clear typing text', async () => {
    const { textBox, rerender, toggleTypingBtn } = renderWrap();
    let typingText = 'WORD';
    if (toggleTypingBtn) {
      await userEvent.click(toggleTypingBtn);
    }
    await userEvent.type(textBox, typingText);

    expect(screen.getByText(`test${typingText}`)).toBeInTheDocument();

    rerender(wrapper(true));
    rerender(wrapper(false));
    expect(screen.getByText(`test`)).toBeInTheDocument();
  });
});
