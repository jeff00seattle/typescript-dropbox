import { RequestMethod, RequestOptions, Request, RequestResponse } from './helpers/request';
import httpStatus from 'http-status';
import createError from 'http-errors';


interface DropboxEntry {
  '.tag': string,
  name: string,
  path_lower: string,
  path_display: string,
  id: string
}

export interface DropboxFolderEntry {
  metadata: DropboxEntry
};

export interface DropboxListEntry {
  entries: DropboxEntry[]
};

export interface DropboxEntity {
  type: string,
  name: string,
  path: string,
  id: string
};

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

    const res: RequestResponse = await this.post(options);

    if (res.response.statusCode < 200 || res.response.statusCode > 399) {
      throw createError(res.response.statusCode, res.response.statusMessage);
    }

    const resBody: DropboxFolderEntry = res.body as DropboxFolderEntry;
    const folder: DropboxEntity = {
      type: 'folder',
      name: resBody.metadata.name,
      path: resBody.metadata.path_display,
      id: resBody.metadata.id
    };

    return {
      response: {
        statusCode: res.response.statusCode,
        statusMessage: httpStatus[res.response.statusCode]
      },
      body: folder
    } as RequestResponse;
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

    const res: RequestResponse = await this.post(options);

    if (res.response.statusCode < 200 || res.response.statusCode > 399) {
      throw createError(res.response.statusCode, res.response.statusMessage);
    }

    const resBody: DropboxListEntry = res.body as DropboxListEntry;

    const entities = resBody.entries.map(entry => { return {
      type: entry['.tag'],
      name: entry.name,
      path: entry.path_display,
      id: entry.id
    }}) as DropboxEntity[];

    return {
      response: {
        statusCode: res.response.statusCode,
        statusMessage: httpStatus[res.response.statusCode]
      },
      body: entities
    } as RequestResponse;
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

    const res: RequestResponse = await this.listAll(accessToken, parent, false);

    if (res.response.statusCode < 200 || res.response.statusCode > 399) {
      throw createError(res.response.statusCode, res.response.statusMessage);
    }

    const entities: DropboxEntity[] = res.body as DropboxEntity[];
    const folders: DropboxEntity[] = entities.filter(entry => entry['type'] === 'folder') as DropboxEntity[];

    return {
      response: {
        statusCode: res.response.statusCode,
        statusMessage: res.response.statusMessage
      },
      body: folders
    } as RequestResponse;
  }

  async deleteAllFolders(accessToken: string, parent?: string): Promise<RequestResponse> {
    const res: RequestResponse = await this.listFolders(accessToken, parent);

    if (res.response.statusCode < 200 || res.response.statusCode > 399) {
      throw createError(res.response.statusCode, res.response.statusMessage);
    }

    const folders: DropboxEntity[] = res.body as DropboxEntity[];
    for (const folder of folders) {
      await this.deleteById(accessToken, folder.id)
    }

    return {
      response: {
        statusCode: res.response.statusCode,
        statusMessage: res.response.statusMessage
      },
      body: folders
    } as RequestResponse;
  };

  async deleteById(accessToken: string, id: string): Promise<RequestResponse> {
    const options: RequestOptions = {
      method: RequestMethod.POST,
      url: 'https://api.dropboxapi.com/2/files/delete_v2',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: {
        path: id
      },
      json: true
    };

    const res: RequestResponse = await this.post(options);

    if (res.response.statusCode < 200 || res.response.statusCode > 399) {
      throw createError(res.response.statusCode, res.response.statusMessage);
    }

    const resBody: DropboxFolderEntry = res.body as DropboxFolderEntry;
    const folder: DropboxEntity = {
      type: resBody.metadata['.tag'],
      name: resBody.metadata.name,
      path: resBody.metadata.path_display,
      id: resBody.metadata.id
    };

    return {
      response: {
        statusCode: res.response.statusCode,
        statusMessage: httpStatus[res.response.statusCode]
      },
      body: folder
    } as RequestResponse;
  };
}
