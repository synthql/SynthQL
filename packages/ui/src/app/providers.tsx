'use client';
import { synthqlTheme } from '@/theme';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { trpc } from '../trpc/createTrpcNext';

function Providers(props: { children: React.ReactNode }) {
    const [theme] = useState(() => synthqlTheme());

    const [queryClient] = useState(() => new QueryClient());
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                {props.children as any}
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default trpc.withTRPC(Providers);
