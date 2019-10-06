

import {getUser, getUserFollowers} from '../lib/github';

const username = 'octocat';
getUserFollowers(username, function(err, users) {
    if (!err) {
        console.log(`followers: ${JSON.stringify(users, null, 2)}`);
    } else {
        console.error(err);
    }
});

getUser(username, function(err, users) {
    if (!err) {
        console.log(`user: ${JSON.stringify(users, null, 2)}`);
    } else {
        console.error(err);
    }
});