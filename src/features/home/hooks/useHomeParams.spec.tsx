import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
const queryClient = new QueryClient();
import useHomeParams from './useHomeParams';

const Wrapper = ({ children }: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('useHomeParams', () => {
  test('get intial value - queryStr', () => {
    const { result } = renderHook(() => useHomeParams(), {
      wrapper: Wrapper,
    });
    expect(result.current.queryStr).toEqual({
      examDate: '',
      examId: '',
      medicalId: '',
    });
  });
  test('get intial lists - items', () => {
    const { result } = renderHook(() => useHomeParams(), {
      wrapper: Wrapper,
    });
    expect(result.current.items).toEqual([]);
  });
  test('set queryStr', async () => {
    const { result } = renderHook(() => useHomeParams(), {
      wrapper: Wrapper,
    });
    act(() => {
      result.current.setQureyStr({
        examDate: '2022-01-01',
        examId: '1',
        medicalId: '2',
      });
    });
    await waitFor(() => {
      expect(result.current.queryStr).toEqual({
        examDate: '2022-01-01',
        examId: '1',
        medicalId: '2',
      });
    });
  });
  test('set items', () => {
    const { result } = renderHook(() => useHomeParams(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.setListData([
        {
          id: 1,
          name: 'test',
        },
      ]);
    });
    expect(result.current.items).toEqual([
      {
        id: 1,
        name: 'test',
      },
    ]);
  });
});
