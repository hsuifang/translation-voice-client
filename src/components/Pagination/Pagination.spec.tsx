import { cleanup, render, userEvent, screen } from '@/lib/test-utils';
import Pagination from './Pagination';

describe('Pagination', () => {
  let pageInfo = {
    total: 30,
    pageSize: 6,
    page: 2,
  };
  const onChange = (page: number) => {
    pageInfo = { ...pageInfo, page };
  };

  beforeEach(() => {
    render(<Pagination total={pageInfo.total} page={pageInfo.page} pageSize={pageInfo.pageSize} onChange={onChange} />);
  });
  afterEach(() => {
    pageInfo.page = 2;
    cleanup();
  });

  describe('UI', () => {
    it('render a pagination', () => {
      const pagination = screen.getByRole('navigation');
      expect(pagination).toBeInTheDocument();
    });
    it('page is 2, show index 15 is eplisis', () => {
      const ellipsis = screen.getByText('...');
      expect(ellipsis).toBeInTheDocument();
    });
  });

  describe('Logical', () => {
    it('page is 2, click prevBtn, show page 1 is selected', async () => {
      const previousBtn = await screen.findByRole('button', { name: 'previous' });
      await userEvent.click(previousBtn);
      expect(pageInfo.page).toBe(1);
    });
    it('page is 2, click nextBtn, show page 3 is selected', async () => {
      const nextBtn = await screen.findByRole('button', { name: 'next' });
      await userEvent.click(nextBtn);
      expect(pageInfo.page).toBe(3);
    });
    it('page is 2, click page 17, show page 17 is selected', async () => {
      const page17Button = await screen.findByText('3');
      await userEvent.click(page17Button);
      expect(pageInfo.page).toBe(3);
    });
  });
});
