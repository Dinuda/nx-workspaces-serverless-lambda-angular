import { getClient } from './client';
import { Item, ItemKeys } from './item';
import { DynamoDB } from 'aws-sdk';
import { dbErrorLogger } from './error';

export async function createItem<T extends Item<any>>(
  item: T,
  tableName: string,
  options?: Omit<DynamoDB.PutItemInput, 'TableName'>,
) {
  const { TableName, db } = getClient(tableName);

  try {
    return await db
      .putItem({
        TableName,
        Item: item.toItem(),
        ConditionExpression: 'attribute_not_exists(SK)',
        ...options,
      })
      .promise();
  } catch (e) {
    dbErrorLogger(e);

    throw {
      success: false,
    };
  }
}

export async function updateItem(
  keys: ItemKeys,
  tableName: string,
  options?: Omit<DynamoDB.UpdateItemInput, 'TableName' | 'Key'>
) {
  const { TableName, db } = getClient(tableName);

  try {
    return await db
      .updateItem({
        TableName,
        Key: keys.toItem(),
        ...options,
      })
      .promise();
  } catch (e) {
    dbErrorLogger(e);

    throw {
      success: false,
    };
  }
}

export async function deleteItem(
  keys: ItemKeys,
  tableName: string,
  options?: Omit<DynamoDB.DeleteItemInput, 'TableName'>
) {
  const { TableName, db } = getClient(tableName);

  try {
    await db
      .deleteItem({
        TableName,
        Key: keys.toItem(),
        ...options,
      })
      .promise();
  } catch (e) {
    dbErrorLogger(e);

    throw {
      success: false,
    };
  }
}

export async function query(options: Omit<DynamoDB.QueryInput, 'TableName'>, tableName: string) {
  
  const { TableName, db } = getClient(tableName);

  try {
    return await db
      .query({
        TableName,
        ...options,
      })
      .promise();
  } catch (e) {
    dbErrorLogger(e);

    throw {
      success: false,
    };
  }
}

export async function getItem(
  keys: ItemKeys,
  tableName: string,
  options?: Omit<DynamoDB.GetItemInput, 'TableName'>
) {
  const { TableName, db } = getClient(tableName);

  try {
    return await db
      .getItem({
        TableName,
        Key: keys.toItem(),
        ...options,
      })
      .promise();
  } catch (e) {
    dbErrorLogger(e);

    throw {
      success: false,
    };
  }
}
