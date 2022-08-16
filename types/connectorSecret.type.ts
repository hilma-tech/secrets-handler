import { DatabaseType } from "./database.type";

interface connectorSecret {
    port?: number;
    engine?: DatabaseType;
    dbname?: string;
    username?: string;
    host?: string;
    password?: string
}

export default connectorSecret;