import { Url } from 'url';
const request = require('request');

export enum RequestMethod {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH'
}

export interface RequestOptions {
  method: RequestMethod;
  url: string | Url;
  headers?: object;
  body?: object;
  json: boolean;
}

export interface RequestResponse {
  response: {
    statusCode: number;
    statusMessage: string;
  };
  body?: {};
}

export class Request {
  protected async get(options: RequestOptions): Promise<RequestResponse> {
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        return resolve({ body, response });
      });
    });
  }

  protected async post(options: RequestOptions): Promise<RequestResponse> {
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        return resolve({ body, response });
      });
    });
  }

  static success(response, body) {
    console.log(`Status: ${response.statusCode}`);
    console.log(`Message: ${response.statusMessage}`);

    console.log(`Body: ${JSON.stringify(body, null, 2)}`);
  }

  static error(response) {
    console.error(`Status: ${response.statusCode}`);
    console.error(`Message: ${response.statusMessage}`);
  }

  protected trimChar(entity: string, charToRemove) {
    while (entity.charAt(0) === charToRemove) {
      entity = entity.substring(1);
    }

    while (entity.charAt(entity.length - 1) === charToRemove) {
      entity = entity.substring(0, entity.length - 1);
    }

    return entity;
  }
}
