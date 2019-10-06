import { Request, RequestResponse } from './request';
export declare class Dropbox extends Request {
    createFolder(accessToken: string, folderPath: string): Promise<RequestResponse>;
}
