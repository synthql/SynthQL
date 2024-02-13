'use client';
import { useGlobalShortcut } from "@/hooks/useGlobalShortcut";
import { useQueryResults } from "@/hooks/useQueryResults";
import { trpc } from "@/trpc/createTrpcNext";
import { useMonaco } from "@monaco-editor/react";
import { PlayArrow } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { useCallback } from "react";

export function ButtonExecuteQuery() {
    const monaco = useMonaco()

    const { setData: setQueryResults } = useQueryResults()
    const { mutateAsync: executeProgram, isPending } = trpc.executeProgram.useMutation()


    const handleExecute = useCallback(async () => {
        if (!monaco) {
            return
        }

        const model = monaco.editor.getModels()[0];

        if (!model) {
            return
        }

        const string = model.getValue()

        const { query, result, sql } = await executeProgram({
            program: string
        });
        setQueryResults({
            query,
            results: result,
            sql
        })
    }, [monaco, executeProgram, setQueryResults]);

    useGlobalShortcut('r', handleExecute)

    return <Tooltip title="Execute query (Ctrl+Enter)">
        <Button disabled={isPending} color='primary' variant="contained" onClick={handleExecute}>
            <PlayArrow />
        </Button>
    </Tooltip>;
}
