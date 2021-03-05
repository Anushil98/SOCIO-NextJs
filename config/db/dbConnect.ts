import 'reflect-metadata';
import { Connection, createConnection, getConnection, getConnectionOptions } from 'typeorm';

const context = require.context('../../src/Db/entities', true, /\.entity\.ts$/);
const entityFileNames = context.keys();
const entities = entityFileNames.map((file) => context(file).default);
let connection = undefined;
export const initializeDatabase = async (optionOverrides: Record<string, any> = {}): Promise<Connection> => {

  const currentConnection = getConnection();
  if (currentConnection) {
    console.log("Connection 1");
    return connection;
  }

  const connectionOptions = await getConnectionOptions();
  connection = await createConnection({ ...connectionOptions, entities, ...optionOverrides });

  console.log("Connection 2");

  return connection;
};

export default initializeDatabase;
