import * as AWS from 'aws-sdk';
import { env } from '@nx-workspaces-serverless-lambda-angular/environment';

AWS.config.update({
  region: env.region,
});

let client: AWS.DynamoDB | null = null;

export function getClient() {
  if (!client) {
    const options = {
      endpoint: env.dynamo.endpoint,
      httpOptions: {
        connectTimeout: 1000,
        timeout: 1000,
      },
    };

    client = new AWS.DynamoDB(env.name === 'dev' ? options : undefined);
  }

  return {
    db: client,
    TableName: env.dynamo.tableName,
  };
}
