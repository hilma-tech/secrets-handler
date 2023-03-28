import { DatabaseType } from "../types/database.type";

type exec<T> = () => T

export type connectorSecretConfig = {
    name: string;
    alias: string;
    port?: number | exec<number>;
    engine?: DatabaseType | exec<DatabaseType>;
    dbname?: string | exec<string>;
    username?: string | exec<string>;
    host?: string | exec<string>;
    password?: string | exec<string>;
}
