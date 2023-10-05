import { BaseSchema, object, string } from 'yup';

import { BodyParams } from '@nx-workspaces-serverless-lambda-angular/http/types';
import { createHandler } from '@nx-workspaces-serverless-lambda-angular/http/handlers';
import { httpError } from '@nx-workspaces-serverless-lambda-angular/http/response';
import { schemaValidator } from '@nx-workspaces-serverless-lambda-angular/http/schema-validator.middleware';

type Params = BodyParams<{ name: string; }>;

export const main = createHandler<Params>(async (event) => {
  const { name } = event.body;
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello ${name}!`,
      }),
    };
  } catch (error) {
      return httpError(error);
  }
});

main.use([
  schemaValidator<Params>({
    body: object({
      name: string().required(),
    }) as BaseSchema<Params['body']>
  }),
]);