
import {Dropbox, DropboxEntity} from "../../lib/dropbox";
import {RequestResponse} from "../../lib/helpers/request";

const expect = require('chai').expect;
const v4 = require("uuid").v4;
const nock = require('nock');

describe('Dropbox Tests', () => {
    beforeEach( () => {

    });

    it('create folder', async () => {
        const dropbox = new Dropbox();
        const accessToken = v4();
        const folderName = v4();
        const folderPath = `/${folderName}`;

        const response = {
            "metadata": {
                "name": folderName,
                "path_lower": folderPath,
                "path_display":folderPath,
                "id": "id:blahblahblah"
            }
        };

        const scope = nock('https://api.dropboxapi.com/2')
            .log((m, d) => console.log(m))
            .post('/files/create_folder_v2', { 'path': /^\/[a-z0-9\-]+$/, 'autorename': false})
            .matchHeader('Authorization', `Bearer ${accessToken}`)
            .reply(200, response);

        await dropbox.createFolder(accessToken, folderPath)
            .then((res) => {

                expect(res.response.statusCode).is.a('number').equals(200);

            })
            .catch((err) => {
                console.error(JSON.stringify(err, null, 2));
                Dropbox.error(err.response);
            });

        expect(scope.isDone()).to.be.true;
    });

    it('list all', async () => {
        const dropbox = new Dropbox();
        const accessToken = v4();

        const response = {
            "entries": [
                {
                    ".tag": "folder",
                    "name": "af35eabf-cb79-4bf1-bb89-85bc8b341b5c",
                    "path_lower": "/af35eabf-cb79-4bf1-bb89-85bc8b341b5c",
                    "path_display": "/af35eabf-cb79-4bf1-bb89-85bc8b341b5c",
                    "id": "id:D7L5tNn4AoAAAAAAAAAUnw"
                },
                {
                    ".tag": "folder",
                    "name": "9ce570a3-8b15-4c67-9813-fa8627d8bf9a",
                    "path_lower": "/9ce570a3-8b15-4c67-9813-fa8627d8bf9a",
                    "path_display": "/9ce570a3-8b15-4c67-9813-fa8627d8bf9a",
                    "id": "id:D7L5tNn4AoAAAAAAAAAUoA"
                },
                {
                    ".tag": "folder",
                    "name": "7b1b6bc5-0492-430f-94fb-18a4b4c71349",
                    "path_lower": "/7b1b6bc5-0492-430f-94fb-18a4b4c71349",
                    "path_display": "/7b1b6bc5-0492-430f-94fb-18a4b4c71349",
                    "id": "id:D7L5tNn4AoAAAAAAAAAUuQ"
                }
            ]
        };

        const scope = nock('https://api.dropboxapi.com/2')
            .log((m, d) => console.log(m))
            .post('/files/list_folder')
            .matchHeader('Authorization', `Bearer ${accessToken}`)
            .reply(200, response);

        await dropbox.listAll(accessToken)
            .then((res) => {

                expect(res.response.statusCode).is.a('number').equals(200);

            })
            .catch((err) => {
                Dropbox.error(err);
            });

        expect(scope.isDone()).to.be.true;
    });
});