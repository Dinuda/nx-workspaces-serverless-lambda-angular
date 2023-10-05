import type { Environment } from './environment.types';

export const env: Environment = {
  name: 'dev',
  region: 'us-east-1',
  profile: 'default',
  jwtSecret: 'iFsckOkWeaHpZgkBQyLqEAL',
  dynamo: {
    endpoint: 'http://localhost:4566',
    tableName: `dev-AppTable`,
  },
};
