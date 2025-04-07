import { ReadConfig, SaveConfig as SaveConfig_ } from "@aikadm/aikadm";
export class Config {
    id: string = "github.com/HumXC/aikadm-frontend";
    defaultUsername: string = "";
    defaultSession: string = "";
    zoom: number = 1;
    background: string = "https://www.todaybing.com/api/today/";
}
let config = new Config();
async function GetConfig_(): Promise<Config> {
    let _config: Config;
    try {
        _config = await ReadConfig();
    } catch (e) {
        console.error("Error reading config:", e);
        return config;
    }
    if (!_config || _config.id !== config.id) {
        SaveConfig();
        return config;
    }
    config = Object.assign(config, _config);
    console.log("Config loaded:", config);
    return config;
}
let isReady = false;
let readyFunc: (() => void) | null = null;

GetConfig_().then((c) => {
    config = c;
    isReady = true;
    if (readyFunc) {
        readyFunc();
    }
    readyFunc = null;
});
function WaitReady() {
    return new Promise<void>((resolve) => {
        if (isReady) {
            resolve();
        } else {
            readyFunc = resolve;
        }
    });
}
export async function GetConfig(): Promise<Config> {
    await WaitReady();
    return config;
}

export async function SaveConfig() {
    try {
        await SaveConfig_(config);
    } catch (e) {
        console.error("Error saving config:", e);
    }
}
