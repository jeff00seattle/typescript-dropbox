"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
class Dropbox extends request_1.Request {
    /**
     * @method createFolder
     * @param accessToken
     * @param folderPath
     *
     * https://www.dropbox.com/developers/documentation/http/documentation#files-create_folder
     */
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
    }
    /**
     * @method listAll
     * @param accessToken
     * @param parent
     *
     * https://www.dropbox.com/developers/documentation/http/documentation#files-list_folder
     */
    async listAll(accessToken, parent, recursive) {
        if (parent === undefined) {
            parent = '';
        }
        if (recursive === undefined) {
            recursive = false;
        }
        const options = {
            method: request_1.RequestMethod.POST,
            url: 'https://api.dropboxapi.com/2/files/list_folder',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: {
                path: parent,
                recursive
            },
            json: true
        };
        return this.post(options);
    }
    /**
     * @method listFolders
     * @param accessToken
     * @param parent
     *
     * https://www.dropbox.com/developers/documentation/http/documentation#files-list_folder
     */
    async listFolders(accessToken, parent) {
        if (parent === undefined) {
            parent = '';
        }
        const options = {
            method: request_1.RequestMethod.POST,
            url: 'https://api.dropboxapi.com/2/files/list_folder',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: {
                path: parent
            },
            json: true
        };
        const res = await this.post(options);
        const body = JSON.parse(JSON.stringify(res.body));
        const entries = body.entries;
        const folders = entries.filter(entry => entry['.tag'] === 'folder');
        body.entries = folders;
        return {
            body,
            response: res.response
        };
    }
}
exports.Dropbox = Dropbox;
//# sourceMappingURL=dropbox.js.map