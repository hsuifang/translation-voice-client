import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme';

const queryClient = new QueryClient();

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </QueryClientProvider>
  );
};

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
