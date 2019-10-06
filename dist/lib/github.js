"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('request');
function getUserFollowers(username, callback) {
    const options = {
        method: 'GET',
        url: `https://api.github.com/users/${username}/followers`,
        headers: { 'User-Agent': 'Awesome-Octocat-App', 'cache-control': 'no-cache' }
    };
    request(options, (err, res, body) => {
        if (!err) {
            const followers = JSON.parse(body).map(follower => {
                return follower.login;
            });
            callback(null, followers);
        }
        else {
            callback('Error Occurred!', null);
        }
    });
}
exports.getUserFollowers = getUserFollowers;
function getUser(username, callback) {
    const options = {
        method: 'GET',
        url: `https://api.github.com/users/${username}`,
        headers: { 'User-Agent': 'Awesome-Octocat-App', 'cache-control': 'no-cache' }
    };
    request(options, (err, res, body) => {
        if (!err) {
            const user = JSON.parse(body);
            callback(null, user);
        }
        else {
            callback('Error Occurred!', null);
        }
    });
}
exports.getUser = getUser;
//# sourceMappingURL=github.js.map