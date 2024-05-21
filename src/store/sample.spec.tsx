import { screen, render } from '@testing-library/react';
import useSampleStore from './sampleStore';
import userEvent from '@testing-library/user-event';

const SampleComponents = () => {
  const { count, increment, decrement } = useSampleStore();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

describe('sample', () => {
  it('increments and decrements the count', async () => {
    const { getByText } = render(<SampleComponents />);
    const incrementButton = getByText('Increment');
    const decrementButton = screen.getByText('Decrement');

    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    await userEvent.click(decrementButton);
    await userEvent.click(decrementButton);
    await userEvent.click(decrementButton);
    await userEvent.click(decrementButton);

    expect(screen.getByText('Count: -1')).toBeTruthy();
  });
});
