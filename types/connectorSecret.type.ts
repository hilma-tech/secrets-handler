import { DatabaseType } from "./database.type";

export interface connectorSecret {
    port?: number;
    engine?: DatabaseType;
    dbname?: string;
    username?: string;
    host?: string;
    password?: string
}

