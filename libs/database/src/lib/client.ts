import * as AWS from 'aws-sdk';
import { env } from '@nx-workspaces-serverless-lambda-angular/environment';

AWS.config.update({
  region: env.region,
});

let client: AWS.DynamoDB | null = null;

export function getClient(endpoint: string) {
  if (!client) {
    const options = {
      endpoint: endpoint,
      httpOptions: {
        connectTimeout: 1000,
        timeout: 1000,
      },
    };

    client = new AWS.DynamoDB(env.name === 'dev' ? options : undefined);
  }

  return {
    db: client,
    TableName: endpoint
  };
}
