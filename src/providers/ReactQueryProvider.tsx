import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface Props {
  children: React.ReactNode
}

const queryClient = new QueryClient();

export function ReactQueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={ queryClient }>
      <ReactQueryDevtools initialIsOpen={ true } />
      { children }
    </QueryClientProvider>
  );
}