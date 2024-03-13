import { default as pgStructure, Options } from 'pg-structure';

type Props = {
    connectionString: string;
} & Options;

export async function introspect(props: Props) {
    const db = await pgStructure(props);

    db.schemas[0].tables;
}
