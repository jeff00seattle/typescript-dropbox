import {Github, GithubEntity} from '../lib/github';
const github = new Github();

const username = 'octocat';

(async () => {
    await github.getUserFollowers(username)
        .then((res) => {
            const followers: GithubEntity[] = res.body as GithubEntity[];
            // const followers = JSON.parse(JSON.stringify(res.body)).map(follower => {
            //     return follower.login;
            // });

            Github.success(res.response, followers);
        })
        .catch((err) => {
            console.error(JSON.stringify(err, null, 2));
            Github.error(err.response);
        });

    await github.getUser(username)
        .then((res) => {
            const user: GithubEntity = res.body as GithubEntity;

            Github.success(res.response, user);
        })
        .catch((err) => {
            console.error(JSON.stringify(err, null, 2));
            Github.error(err.response);
        });
})();