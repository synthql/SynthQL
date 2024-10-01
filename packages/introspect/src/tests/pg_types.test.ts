import { describe, expect, test } from 'vitest';
import { Pool, types } from 'pg';

export const createTableQuery = `
    CREATE TABLE all_data_types (
        col_id SERIAL PRIMARY KEY,
        col_bigint BIGINT,
        col_bigserial BIGSERIAL,
        col_bit BIT(1),
        col_bit_varying BIT VARYING(10),
        col_boolean BOOLEAN,
        col_box BOX,
        col_bytea BYTEA,
        col_character CHARACTER(10),
        col_varchar CHARACTER VARYING(50),
        col_cidr CIDR,
        col_circle CIRCLE,
        col_date DATE,
        col_double_precision DOUBLE PRECISION,
        col_inet INET,
        col_integer INTEGER,
        col_interval INTERVAL,
        col_json JSON,
        col_jsonb JSONB,
        col_line LINE,
        col_lseg LSEG,
        col_macaddr MACADDR,
        col_macaddr8 MACADDR8,
        col_money MONEY,
        col_numeric NUMERIC(10, 2),
        col_path PATH,
        col_pg_lsn PG_LSN,
        col_pg_snapshot PG_SNAPSHOT,
        col_point POINT,
        col_polygon POLYGON,
        col_real REAL,
        col_smallint SMALLINT,
        col_smallserial SMALLSERIAL,
        col_serial SERIAL,
        col_text TEXT,
        col_time TIME,
        col_time_with_timezone TIME WITH TIME ZONE,
        col_timestamp TIMESTAMP,
        col_timestamp_with_timezone TIMESTAMP WITH TIME ZONE,
        col_tsquery TSQUERY,
        col_tsvector TSVECTOR,
        col_txid_snapshot TXID_SNAPSHOT,
        col_uuid UUID,
        col_xml XML
    );
`;

export const insertTableQuery = `
    INSERT INTO all_data_types (
        col_bigint, col_bit, col_bit_varying, col_boolean, col_box,
        col_bytea, col_character, col_varchar, col_cidr, col_circle,
        col_date, col_double_precision, col_inet, col_integer, col_interval,
        col_json, col_jsonb, col_line, col_lseg, col_macaddr,
        col_macaddr8, col_money, col_numeric, col_path, col_pg_lsn,
        col_pg_snapshot, col_point, col_polygon, col_real, col_smallint,
        col_text, col_time, col_time_with_timezone, col_timestamp,
        col_timestamp_with_timezone, col_tsquery, col_tsvector, col_txid_snapshot,
        col_uuid, col_xml
    ) VALUES (
        9223372036854775807, -- BIGINT max value
        B'1', -- BIT
        B'1010', -- BIT VARYING
        TRUE, -- BOOLEAN
        '((0,0),(1,1))', -- BOX
        '\xDEADBEEF', -- BYTEA
        'CHAR(10)  ', -- CHARACTER(10)
        'VARCHAR', -- CHARACTER VARYING
        '192.168.100.128/25', -- CIDR
        '<(0,0),2>', -- CIRCLE
        '2023-05-18', -- DATE
        3.14159265358979, -- DOUBLE PRECISION
        '192.168.100.128', -- INET
        2147483647, -- INTEGER max value
        '1 year 2 months 3 days 4 hours 5 minutes 6 seconds', -- INTERVAL
        '{"key": "value"}', -- JSON
        '{"key": "value"}', -- JSONB
        '{1,-1,2}', -- LINE
        '[(0,0),(1,1)]', -- LSEG
        '08:00:2b:01:02:03', -- MACADDR
        '08:00:2b:01:02:03:04:05', -- MACADDR8
        19.99, -- MONEY
        3.14159265358979, -- NUMERIC
        '[(0,0),(1,1),(2,2)]', -- PATH
        '16/B374D848', -- PG_LSN
        '10:20:10,14,15', -- PG_SNAPSHOT
        '(1,1)', -- POINT
        '((0,0),(0,1),(1,1),(1,0))', -- POLYGON
        3.14, -- REAL
        32767, -- SMALLINT max value
        'This is a text column', -- TEXT
        '04:05:06', -- TIME
        '04:05:06 PST', -- TIME WITH TIME ZONE
        '2023-05-18 04:05:06', -- TIMESTAMP
        '2023-05-18 04:05:06 PST', -- TIMESTAMP WITH TIME ZONE
        'fat & rat', -- TSQUERY
        'a fat cat sat on a mat and ate a fat rat', -- TSVECTOR
        '10:20:10,14,15', -- TXID_SNAPSHOT
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', -- UUID
        '<root><element>value</element></root>' -- XML
    );
`;

export const selectTableQuery = `
    SELECT 
        col_id,
        col_bigint,
        col_bigserial,
        col_bit,
        col_bit_varying,
        col_boolean,
        col_box,
        col_bytea,
        col_character,
        col_varchar,
        col_cidr,
        col_circle,
        col_date,
        col_double_precision,
        col_inet,
        col_integer,
        col_interval,
        col_json,
        col_jsonb,
        col_line,
        col_lseg,
        col_macaddr,
        col_macaddr8,
        col_money,
        col_numeric,
        col_path,
        col_pg_lsn,
        col_pg_snapshot,
        col_point,
        col_polygon,
        col_real,
        col_smallint,
        col_smallserial,
        col_serial,
        col_text,
        col_time,
        col_time_with_timezone,
        col_timestamp,
        col_timestamp_with_timezone,
        col_tsquery,
        col_tsvector,
        col_txid_snapshot,
        col_uuid,
        col_xml
    FROM 
        all_data_types
    WHERE
        col_id = 1;
`;

export const deleteTableQuery = `
    DROP TABLE IF EXISTS all_data_types;
`;

// Database connection configuration
const client = new Pool({
    connectionString: 'postgresql://postgres:postgres@localhost:5432/postgres',
    max: 10,
});

// // Use the OIDs imported from pg.types to set custom type parsers
// types.setTypeParser(types.builtins.DATE, (value) => value);
// types.setTypeParser(types.builtins.TIMESTAMP, (value) => value);
// types.setTypeParser(types.builtins.TIMESTAMPTZ, (value) => value);

describe('pg_types', () => {
    test.skip('Add to Pagila', async () => {
        await client.connect();

        await deleteData();

        await createTable();

        await insertData();

        for (const [name, value] of Object.entries(await selectData())) {
            console.log({
                'Name:': name,
                'Value:': value,
                'JS primitive type': typeof value,
            });
        }

        await deleteData();
    }, 100_000);
});

const createTable = async () => {
    try {
        await client.query(createTableQuery);

        console.log('Table created successfully!');
    } catch (err) {
        console.error('Error creating table', err);
    }
};

const insertData = async () => {
    try {
        await client.query(insertTableQuery);

        console.log(`Record inserted successfully!`);
    } catch (err) {
        console.error('Error inserting record', err);
    }
};

const selectData = async () => {
    try {
        const results = await client.query(selectTableQuery);

        console.log(`Record found successfully!`);

        return results.rows[0];
    } catch (err) {
        console.error('Error finding record', err);
    }
};

const deleteData = async () => {
    try {
        await client.connect();

        const results = await client.query(deleteTableQuery);

        console.log(`Table deleted successfully!`);

        return results.rows[0];
    } catch (err) {
        console.error('Error deleting table', err);
    }
};
