import { Request, RequestResponse } from './request';
export declare class Github extends Request {
    getUser(username: string): Promise<RequestResponse>;
    getUserFollowers(username: string): Promise<RequestResponse>;
}
