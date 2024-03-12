'use client';
import { CheckCircle } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';

export function InputDatabaseUrl() {
    return (
        <TextField
            fullWidth
            //value={databaseUrl}
            onChange={(e) => {}}
            placeholder="URL: e.g. postgres://user:password@host:port/dbname"
            InputProps={{
                endAdornment: (
                    <IconButton sx={{ height: 24, width: 24 }} color="success">
                        <CheckCircle />
                    </IconButton>
                ),
            }}
        />
    );
}
