import React from 'react';

export interface XqlContext {
    xqlEndpoint: string;
    requestInit?: RequestInit;
}

export const xqlContext = React.createContext<XqlContext | null>(null);

export function XqlProvider({
    value = {
        xqlEndpoint: '/xql',
        requestInit: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    },
    children,
}: {
    value?: XqlContext;
    children: React.ReactNode | any;
}) {
    return <xqlContext.Provider value={value}>{children}</xqlContext.Provider>;
}

export function useXqlContext(): XqlContext {
    const context = React.useContext(xqlContext);
    if (!context) {
        throw new Error('useXqlContext must be used within a XqlProvider');
    }
    return context;
}