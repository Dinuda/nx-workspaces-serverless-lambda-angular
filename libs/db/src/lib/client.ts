import * as AWS from 'aws-sdk';
import { DynamoDB } from 'aws-sdk';


import { env } from '@nx-workspaces-serverless-lambda-angular/env';

AWS.config.update({
  region: env.region,
});

let client: DynamoDB | null = null;

export function getClient(tableName: string) {
  if (!client) {
    const options = {
      endpoint: env.dynamo.endpoint,
      httpOptions: {
        connectTimeout: 1000,
        timeout: 1000,
      },
    };

    client = new DynamoDB(env.name === 'dev' ? options : undefined);
  }

  return {
    db: client,
    TableName: tableName,
  };
}
