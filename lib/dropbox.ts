import { RequestMethod, RequestOptions, Request, RequestResponse } from './request';

export class Dropbox extends Request {
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
    // const { response, body } = await this.post(options);
    //
    // if (response.statusCode !== 200) {
    //   return this.error(response);
    // }
    //
    // this.success(response, body);
    //
    // return body;
  }
}
