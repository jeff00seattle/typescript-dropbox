import { Request, RequestResponse } from './request';
export interface DropboxEntry {
    type: string;
    name: string;
    id: string;
}
export declare class Dropbox extends Request {
    /**
     * @method createFolder
     * @param accessToken
     * @param folderPath
     *
     * https://www.dropbox.com/developers/documentation/http/documentation#files-create_folder
     */
    createFolder(accessToken: string, folderPath: string): Promise<RequestResponse>;
    /**
     * @method listAll
     * @param accessToken
     * @param parent
     *
     * https://www.dropbox.com/developers/documentation/http/documentation#files-list_folder
     */
    listAll(accessToken: string, parent?: string, recursive?: boolean): Promise<RequestResponse>;
    /**
     * @method listFolders
     * @param accessToken
     * @param parent
     *
     * https://www.dropbox.com/developers/documentation/http/documentation#files-list_folder
     */
    listFolders(accessToken: string, parent?: string): Promise<RequestResponse>;
}
