import React from 'react';

export interface SynthqlContext {
    endpoint: string;
    requestInit?: RequestInit;
}

export const synthqlContext = React.createContext<SynthqlContext | null>(null);

export function SynthqlProvider({
    value,
    children,
}: {
    value: SynthqlContext;
    children: React.ReactNode | any;
}) {
    return (
        <synthqlContext.Provider value={value}>
            {children}
        </synthqlContext.Provider>
    );
}

export function useSynthqlContext(): SynthqlContext {
    const context = React.useContext(synthqlContext);
    if (!context) {
        throw new Error('useSynthql must be used within a SynthqlProvider');
    }
    return context;
}
