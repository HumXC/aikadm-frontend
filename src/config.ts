import { ReadConfig, SaveConfig } from "./wailsjs/go/main/App";
export class Config {
    id: string = "github.com/HumXC/html-greet-frontend";
    defaultUsername: string = "";
    defaultSession: string = "";
    lang: string = "en";
    zoom: number = 1;
    nightLightMode: boolean = false;
}
export async function getConfig(): Promise<Config> {
    let config = new Config();
    let _config: Config;
    try {
        _config = await ReadConfig();
    } catch (e) {
        console.error("Error reading config:", e);
        return config;
    }
    if (!_config || _config.id !== config.id) {
        saveConfig(config);
        return config;
    }
    config = Object.assign(config, _config);
    console.log("Config loaded:", config);
    return config;
}
export async function saveConfig(config: Config) {
    try {
        await SaveConfig(config);
    } catch (e) {
        console.error("Error saving config:", e);
    }
}
