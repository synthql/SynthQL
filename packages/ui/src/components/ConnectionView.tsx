'use client';
import { useConnection } from '@/hooks/useConnection';
import { useIsConnected } from '@/hooks/useIsConnected';
import { trpc } from '@/trpc/createTrpcNext';
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CircularProgress,
    FormControl,
    InputLabel,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export function ConnectionView() {
    const background = useTheme().palette.grey[100];
    const { data: conn, setData: setConnection } = useConnection();
    console.log('conn', conn);
    const [url, setUrl] = useState(conn.url);
    const [schema, setSchema] = useState(conn.schema);
    const [name, setName] = useState(conn.name);
    const [msg, setMsg] = useState('');

    const { setData: setIsConnected } = useIsConnected();

    const { mutateAsync: onConnect, isPending } = trpc.connect.useMutation({
        onSuccess: (data) => {
            setMsg(data.introspection.tables.length + ' tables found');
            setConnection({
                url,
                schema,
                name,
            });
            setIsConnected({
                isConnected: true,
            });
        },
    });

    return (
        <Box
            height={'100%'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
                background,
            }}
        >
            <Card>
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography variant="h6">Connect</Typography>
                    <TextField
                        label="Database URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        helperText="e.g. postgres://user:password@host:5432/dbname"
                    />
                    <TextField
                        label="Schema"
                        value={schema}
                        onChange={(e) => setSchema(e.target.value)}
                        helperText="e.g. postgres://user:password@host:5432/dbname"
                    />
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Name"
                        helperText="A user friendly name for your connection"
                    />

                    <Button
                        startIcon={
                            isPending ? (
                                <CircularProgress size={'12px'} />
                            ) : undefined
                        }
                        disabled={isPending}
                        onClick={() =>
                            onConnect({
                                schema,
                                url,
                            })
                        }
                        variant="contained"
                    >
                        {msg ? msg : 'Connect'}
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}
