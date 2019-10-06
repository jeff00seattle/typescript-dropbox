const expect = require('chai').expect;
const v4 = require("uuid").v4;
const nock = require('nock');
const github = require('../lib/github');

describe('GET followers', () => {
    beforeEach( () => {

    });

    it('Should assert true to be true', (done) => {
        expect(true).to.be.true;

        done();
    });

    it('returns user', (done) => {
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

        // tslint:disable-next-line:prefer-const
        const username = 'octocat';

        // Mock the TMDB configuration request response
        nock('https://api.github.com')
            .get(`/users/${username}`)
            .reply(200, userResponse);

        github.getUser(username, (err, res) => {
            // console.log(`user: ${JSON.stringify(res, null, 2)}`);
            //expect an object back
            expect(typeof res).to.equal('object');

            //Test result of name, company and location for the response
            expect(res.name).to.equal('The Octocat')
            expect(res.company).to.equal('GitHub')
            expect(res.location).to.equal('San Francisco')
            done();
        });
    });

    it('returns user followers', (done) => {
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

        // Mock the TMDB configuration request response
        nock('https://api.github.com')
            .get(`/users/${username}/followers`)
            .reply(200, followersResponse);

        github.getUserFollowers(username, (err, res) => {
            // console.log(`res: ${JSON.stringify(res, null, 2)}`);
            // It should return an array object
            expect(Array.isArray(res)).to.equal(true);
            // Ensure that at least one follower is in the array
            expect(res).to.have.length.above(1);
            // Each of the items in the array should be a string
            res.forEach((follower) => {
                expect(follower).to.be.a('string');
            });
            done();
        });
    });
});

describe('Dropbox', () => {
    beforeEach( () => {

    });

    it('Should assert true to be true', (done) => {
        expect(true).to.be.true;
        done();
    });

    it('returns folder', (done) => {
        // const folderName = v4();
        // const folderPath = `/${folderName}`;
        //
        // const folderResponse = {
        //     "metadata": {
        //         "name": folderName,
        //         "path_lower": folderPath,
        //         "path_display":folderPath,
        //         "id": "id:blahblahblah"
        //     }
        // };


        done();
    });
});;