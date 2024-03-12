import { Box } from '@mui/material';

export function PanelContainer(props: React.PropsWithChildren<{}>) {
    return (
        <Box
            height={'100%'}
            sx={{
                padding: 0,
                background: '#fafafa',
                borderBottom: '1px solid #e0e0e0',
                flexDirection: 'column',
            }}
            {...props}
        >
            {props.children as any}
        </Box>
    );
}
