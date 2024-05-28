// test SelectOptions component
import { render, screen } from '@/lib/test-utils';
import SelectOptions from './SelectOptions';

describe('SelectOptions', () => {
  const mockSetValue = vi.fn();
  const options = [
    {
      key: 'option1',
      value: 'value1',
    },
    {
      key: 'option2',
      value: 'value2',
    },
  ];

  it('should render SelectOptions', () => {
    render(<SelectOptions value="1" options={options} setValue={mockSetValue} disabled={false} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('option1')).toBeInTheDocument();
    expect(screen.getByText('option2')).toBeInTheDocument();
  });
});
