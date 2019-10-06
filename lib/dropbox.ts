import { RequestMethod, RequestOptions, Request, RequestResponse } from './request';

export interface DropboxEntry {
  type: string;
  name: string;
  id: string;
}

export class Dropbox extends Request {
  /**
   * @method createFolder
   * @param accessToken
   * @param folderPath
   *
   * https://www.dropbox.com/developers/documentation/http/documentation#files-create_folder
   */
  async createFolder(accessToken: string, folderPath: string): Promise<RequestResponse> {
    const options: RequestOptions = {
      method: RequestMethod.POST,
      url: 'https://api.dropboxapi.com/2/files/create_folder_v2',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: {
        path: folderPath,
        autorename: false
      },
      json: true
    };
    return this.post(options);
  }

  /**
   * @method listAll
   * @param accessToken
   * @param parent
   *
   * https://www.dropbox.com/developers/documentation/http/documentation#files-list_folder
   */
  async listAll(accessToken: string, parent?: string, recursive?: boolean): Promise<RequestResponse> {
    if (parent === undefined) {
      parent = '';
    }

    if (recursive === undefined) {
      recursive = false;
    }
    const options: RequestOptions = {
      method: RequestMethod.POST,
      url: 'https://api.dropboxapi.com/2/files/list_folder',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: {
        path: parent,
        recursive
      },
      json: true
    };

    return this.post(options);
  }

  /**
   * @method listFolders
   * @param accessToken
   * @param parent
   *
   * https://www.dropbox.com/developers/documentation/http/documentation#files-list_folder
   */
  async listFolders(accessToken: string, parent?: string): Promise<RequestResponse> {
    if (parent === undefined) {
      parent = '';
    }

    const options: RequestOptions = {
      method: RequestMethod.POST,
      url: 'https://api.dropboxapi.com/2/files/list_folder',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: {
        path: parent
      },
      json: true
    };

    const res: RequestResponse = await this.post(options);

    const body = JSON.parse(JSON.stringify(res.body));
    const entries = body.entries;
    const folders: DropboxEntry[] = entries.filter(entry => entry['.tag'] === 'folder') as DropboxEntry[];

    body.entries = folders;

    return {
      body,
      response: res.response
    };
  }

  // async deleteAllFolders(accessToken: string, parent?: string) {
  //
  //   const res: RequestResponse = await this.listFolders(accessToken, parent);
  //
  //   const body = JSON.parse(JSON.stringify(res.body));
  //   const folders = body.entries;
  //
  //   for (const folder of folders) {
  //     awit
  //   }
  //
  //   return res;
  // };
}
