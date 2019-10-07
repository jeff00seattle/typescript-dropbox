import { Request, RequestMethod, RequestOptions, RequestResponse } from './helpers/request';
import httpStatus from 'http-status';
import createError from 'http-errors';
import { DropboxEntity } from './dropbox';

export interface GithubEntity {
  name: string;
  login: string;
  company: string;
  location: string;
  id: string;
}

export class Github extends Request {
  /**
   *
   * @param username
   */
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

    const res: RequestResponse = await this.get(options);

    if (res.response.statusCode < 200 || res.response.statusCode > 399) {
      throw createError(res.response.statusCode, res.response.statusMessage);
    }

    const user: GithubEntity = res.body as GithubEntity;

    return {
      response: {
        statusCode: res.response.statusCode,
        statusMessage: httpStatus[res.response.statusCode]
      },
      body: {
        login: user.login,
        name: user.name,
        id: user.id,
        company: user.company,
        location: user.location
      }
    } as RequestResponse;
  }

  /**
   *
   * @param username
   */
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

    const res: RequestResponse = await this.get(options);
    if (res.response.statusCode < 200 || res.response.statusCode > 399) {
      throw createError(res.response.statusCode, res.response.statusMessage);
    }

    const userFollowers: GithubEntity[] = res.body as GithubEntity[];

    const followers = userFollowers.map(follower => {
      return follower.login;
    });

    return {
      response: {
        statusCode: res.response.statusCode,
        statusMessage: httpStatus[res.response.statusCode]
      },
      body: followers
    } as RequestResponse;
  }
}
