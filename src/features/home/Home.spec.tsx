import { render, screen } from '@/lib/test-utils';
import Home from './Home';

describe('Home', () => {
  it('should have Search Seaction section', () => {
    render(<Home />);
    const section = screen.getByTestId('search-section');
    expect(section).toBeInTheDocument();
  });
});
