const { getConfig } = require('./getConfig');
import {Dropbox} from '../lib/dropbox';
const v4 = require("uuid").v4;

const folderName = v4();
const folderPath = `/${folderName}`;

const dropbox = new Dropbox();

const accountConfig = getConfig();

(async () => {
    await dropbox.createFolder(accountConfig.accessToken, folderPath)
        .then((res) => {
            // console.log(JSON.stringify(res, null, 2));
            Dropbox.success(res.response, res.body);
        })
        .catch((err) => {
            // console.error(JSON.stringify(err, null, 2));
            Dropbox.error(err.response);
        });


    await dropbox.listAll(accountConfig.accessToken)
        .then((res) => {
            console.log(25);
            // console.log(JSON.stringify(res, null, 2));
            Dropbox.success(res.response, res.body);
        })
        .catch((err) => {
            // console.error(JSON.stringify(err, null, 2));
            Dropbox.error(err.response);
        });

    await dropbox.listFolders(accountConfig.accessToken)
        .then((res) => {
            // console.log(JSON.stringify(res, null, 2));
            Dropbox.success(res.response, res.body);
        })
        .catch((err) => {
            // console.error(JSON.stringify(err, null, 2));
            Dropbox.error(err.response);
        });
})();