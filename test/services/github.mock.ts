
import {RequestResponse} from "../../lib/helpers/request";
import {Github, GithubEntity} from "../../lib/github";

const expect = require('chai').expect;
const v4 = require("uuid").v4;
const nock = require('nock');

describe('Github Tests', () => {
    beforeEach( () => {

    });

    it('returns user', async () => {
        const github = new Github();

        const userResponse = {
            "login": "octocat",
            "id": 583231,
            "node_id": "MDQ6VXNlcjU4MzIzMQ==",
            "avatar_url": "https://avatars3.githubusercontent.com/u/583231?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/octocat",
            "html_url": "https://github.com/octocat",
            "followers_url": "https://api.github.com/users/octocat/followers",
            "following_url": "https://api.github.com/users/octocat/following{/other_user}",
            "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
            "organizations_url": "https://api.github.com/users/octocat/orgs",
            "repos_url": "https://api.github.com/users/octocat/repos",
            "events_url": "https://api.github.com/users/octocat/events{/privacy}",
            "received_events_url": "https://api.github.com/users/octocat/received_events",
            "type": "User",
            "site_admin": false,
            "name": "The Octocat",
            "company": "GitHub",
            "blog": "http://www.github.com/blog",
            "location": "San Francisco",
            "email": null,
            "hireable": null,
            "bio": null,
            "public_repos": 8,
            "public_gists": 8,
            "followers": 2777,
            "following": 9,
            "created_at": "2011-01-25T18:44:36Z",
            "updated_at": "2019-09-23T14:29:34Z"
        };

        const username = 'octocat';

        const scope = nock('https://api.github.com')
            .log((m, d) => console.log(m))
            .get(`/users/${username}`)
            .reply(200, userResponse);

        await github.getUser(username)
            .then((res: RequestResponse) => {
                expect(typeof res).to.equal('object');

                const user: GithubEntity = res.body as GithubEntity;

                //Test result of name, company and location for the response
                expect(user.name).to.equal('The Octocat');
                expect(user.company).to.equal('GitHub');
                expect(user.location).to.equal('San Francisco');
            })
            .catch((err) => {
                console.error(JSON.stringify(err, null, 2));
                Github.error(err.response);
            });

        // if (!scope.isDone()) {
        //     console.error('pending mocks: %j', scope.pendingMocks())
        // }

        expect(scope.isDone()).to.be.true;
    });

    it('returns user followers', async () => {
        const github = new Github();

        const followersResponse = [{
            "login": "octocat",
            "id": 583231,
            "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/octocat",
            "html_url": "https://github.com/octocat",
            "followers_url": "https://api.github.com/users/octocat/followers",
            "following_url": "https://api.github.com/users/octocat/following{/other_user}",
            "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
            "organizations_url": "https://api.github.com/users/octocat/orgs",
            "repos_url": "https://api.github.com/users/octocat/repos",
            "events_url": "https://api.github.com/users/octocat/events{/privacy}",
            "received_events_url": "https://api.github.com/users/octocat/received_events",
            "type": "User",
            "site_admin": false
        }, {
            "login": "nanocat",
            "id": 583233,
            "avatar_url": "https://avatars.githubusercontent.com/u/583233?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/nanocat",
            "html_url": "https://github.com/nanocat",
            "followers_url": "https://api.github.com/users/nanocat/followers",
            "following_url": "https://api.github.com/users/nanocat/following{/other_user}",
            "gists_url": "https://api.github.com/users/nanocat/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/nanocat/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/nanocat/subscriptions",
            "organizations_url": "https://api.github.com/users/nanocat/orgs",
            "repos_url": "https://api.github.com/users/nanocat/repos",
            "events_url": "https://api.github.com/users/nanocat/events{/privacy}",
            "received_events_url": "https://api.github.com/users/nanocat/received_events",
            "type": "User",
            "site_admin": false
        }];

        const username = 'octocat';

        const scope = nock('https://api.github.com')
            .log((m, d) => console.log(m))
            .get(`/users/${username}/followers`)
            .reply(200, followersResponse);

        await github.getUserFollowers(username)
            .then((res) => {

                const followers: string[] = res.body as string[];

                expect(Array.isArray(followers)).to.equal(true);
                // Ensure that at least one follower is in the array
                expect(followers).to.have.length.above(1);
                // Each of the items in the array should be a string
                followers.forEach((followers) => {
                    expect(followers).to.be.a('string');
                });
            })
            .catch((err) => {
                console.error(JSON.stringify(err, null, 2));
                Github.error(err.response);
            });

        // if (!scope.isDone()) {
        //     console.error('pending mocks: %j', scope.pendingMocks())
        // }

        expect(scope.isDone()).to.be.true;
    });
});
