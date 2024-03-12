import { createTheme } from '@mui/material';

export function synthqlTheme() {
    return createTheme({
        components: {
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                    size: 'small',
                    variant: 'contained',
                },
            },
            MuiTextField: {
                defaultProps: {
                    size: 'small',
                },
            },
            MuiCard: {
                defaultProps: {
                    variant: 'outlined',
                },
            },
        },
    });
}
