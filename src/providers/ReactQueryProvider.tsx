import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface Props {
  children: React.ReactNode
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

export function ReactQueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={ queryClient }>
      <ReactQueryDevtools initialIsOpen={ true } />
      { children }
    </QueryClientProvider>
  );
}