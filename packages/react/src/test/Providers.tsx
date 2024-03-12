import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { SynthqlProvider } from '..';

const queryClient = new QueryClient();
export function Providers(
    props: React.PropsWithChildren<{ endpoint: string }>,
) {
    return (
        <QueryClientProvider client={queryClient}>
            <SynthqlProvider
                value={{
                    endpoint: props.endpoint,
                    requestInit: {
                        method: 'POST',
                    },
                }}
            >
                {props.children}
            </SynthqlProvider>
        </QueryClientProvider>
    );
}
