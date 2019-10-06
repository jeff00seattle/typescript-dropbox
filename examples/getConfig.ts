const path = require("path");
const fileSystem = require("fs");

export interface ArchiveConfig {
    accessToken: string;
    tokenType: string;
}

export function getConfig(): ArchiveConfig {
    const pathAccount = path.join(__dirname, "/config/credentials_token.json");
    const config = fileSystem.readFileSync(pathAccount);
    const jsonConfig = JSON.parse(config);

    const accountConfig: ArchiveConfig = {
        accessToken: jsonConfig.access_token,
        tokenType: jsonConfig.token_type
    };

    return accountConfig;
}