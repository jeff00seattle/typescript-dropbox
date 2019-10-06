"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
class Dropbox extends request_1.Request {
    async createFolder(accessToken, folderPath) {
        const options = {
            method: request_1.RequestMethod.POST,
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
exports.Dropbox = Dropbox;
//# sourceMappingURL=dropbox.js.map