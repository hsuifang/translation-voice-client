import useDialogStore from './useDialogStore';
import { Dialog } from './useDialogStore';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

type mainProps = {
  message: string;
  type?: Dialog;
  onComfirm?: () => void;
};
const MainComponent = ({ message, type = Dialog.Alert, onComfirm = () => {} }: mainProps) => {
  const { openDialog, closeDialog } = useDialogStore();
  return (
    <div>
      <button data-test="openbtn" type="button" onClick={() => openDialog(message, type, onComfirm)}>
        open
      </button>
      <button data-test="closebtn" type="button" onClick={() => closeDialog()}>
        close
      </button>
      <DialogComponent />
    </div>
  );
};

const DialogComponent = () => {
  const { dialog } = useDialogStore();
  return (
    <div>
      <p data-testid="isopen">isOpen: {dialog.isOpen.toString()}</p>
      <p data-testid="istype">type: {dialog.type}</p>
      <p data-testid="message">message: {dialog.message}</p>
      <button data-test="checkbtn" type="button" onClick={dialog.confirmAction}>
        確認
      </button>
      <button data-test="closebtn" type="button">
        關閉
      </button>
    </div>
  );
};

describe('useDialogStore', () => {
  it('default data', () => {
    render(<MainComponent message="test" />);
    expect(screen.getByText('isOpen: false')).toBeTruthy();
    expect(screen.getByText('type: alert')).toBeTruthy();
    expect(screen.getByText('message:')).toBeTruthy();
  });

  it('click button to openDialog', async () => {
    const message = 'HHAHHAHAHHAHHAHA';
    render(<MainComponent message={message} />);
    await userEvent.click(screen.getByText('open'));
    expect(screen.getByText('isOpen: true')).toBeTruthy();
    expect(screen.getByText('type: alert')).toBeTruthy();
  });

  it('click button to closeDialog', async () => {
    render(<MainComponent message="test" />);
    await userEvent.click(screen.getByText('open'));
    expect(screen.getByText('isOpen: true')).toBeTruthy();
    await userEvent.click(screen.getByText('close'));
    expect(screen.getByTestId('isopen')).toHaveTextContent('isOpen: false');
  });

  it('test Type', () => {
    render(<MainComponent message="test" type={Dialog.Confirm} />);
    waitFor(() => {
      expect(screen.getByText('type: confirm')).toBeTruthy();
    });
  });

  it('click confirmAction', async () => {
    const fnHandle = vi.fn();
    render(<MainComponent message="test" type={Dialog.Confirm} onComfirm={fnHandle} />);
    waitFor(() => {
      expect(fnHandle).toHaveBeenCalled();
    });
  });
});
