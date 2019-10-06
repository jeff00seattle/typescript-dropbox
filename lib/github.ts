import { Request, RequestMethod, RequestOptions, RequestResponse } from './request';

export class Github extends Request {
  async getUser(username: string): Promise<RequestResponse> {
    const options: RequestOptions = {
      method: RequestMethod.GET,
      url: `https://api.github.com/users/${username}`,
      headers: {
        'User-Agent': 'Awesome-Octocat-App',
        'cache-control': 'no-cache'
      },
      json: true
    };
    return this.get(options);
  }

  async getUserFollowers(username: string): Promise<RequestResponse> {
    const options: RequestOptions = {
      method: RequestMethod.GET,
      url: `https://api.github.com/users/${username}/followers`,
      headers: {
        'User-Agent': 'Awesome-Octocat-App',
        'cache-control': 'no-cache'
      },
      json: true
    };
    return this.get(options);
  }
}
