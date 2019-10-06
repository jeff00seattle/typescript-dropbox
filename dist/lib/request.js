"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('request');
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["POST"] = "POST";
    RequestMethod["GET"] = "GET";
    RequestMethod["DELETE"] = "DELETE";
    RequestMethod["PUT"] = "PUT";
    RequestMethod["PATCH"] = "PATCH";
})(RequestMethod = exports.RequestMethod || (exports.RequestMethod = {}));
class Request {
    async get(options) {
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                return resolve({ body, response });
            });
        });
    }
    async post(options) {
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                return resolve({ body, response });
            });
        });
    }
    static success(response, body) {
        console.log(`Status: ${response.statusCode}`);
        console.log(`Message: ${response.statusMessage}`);
        console.log(`Body: ${JSON.stringify(body, null, 2)}`);
    }
    static error(response) {
        console.error(`Status: ${response.statusCode}`);
        console.error(`Message: ${response.statusMessage}`);
    }
    trimChar(entity, charToRemove) {
        while (entity.charAt(0) === charToRemove) {
            entity = entity.substring(1);
        }
        while (entity.charAt(entity.length - 1) === charToRemove) {
            entity = entity.substring(0, entity.length - 1);
        }
        return entity;
    }
}
exports.Request = Request;
//# sourceMappingURL=request.js.map