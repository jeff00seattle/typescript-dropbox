"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
class Github extends request_1.Request {
    async getUser(username) {
        const options = {
            method: request_1.RequestMethod.GET,
            url: `https://api.github.com/users/${username}`,
            headers: {
                'User-Agent': 'Awesome-Octocat-App',
                'cache-control': 'no-cache'
            },
            json: true
        };
        return this.get(options);
    }
    async getUserFollowers(username) {
        const options = {
            method: request_1.RequestMethod.GET,
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
exports.Github = Github;
//# sourceMappingURL=github.js.map