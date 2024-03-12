import { useEffect } from 'react';

export function useGlobalShortcut(key: string, callback: () => void) {
    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.key === key && event.ctrlKey) {
                callback();
            }
        };
        window.addEventListener('keydown', handler);
        return () => {
            window.removeEventListener('keydown', handler);
        };
    }, [key, callback]);
}
