/// <reference types="node" />
import { Url } from 'url';
export declare enum RequestMethod {
    POST = "POST",
    GET = "GET",
    DELETE = "DELETE",
    PUT = "PUT",
    PATCH = "PATCH"
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
export declare class Request {
    protected get(options: RequestOptions): Promise<RequestResponse>;
    protected post(options: RequestOptions): Promise<RequestResponse>;
    static success(response: any, body: any): void;
    static error(response: any): void;
    protected trimChar(entity: string, charToRemove: any): string;
}
