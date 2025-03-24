import { Aikadm } from "@aikadm/aikadm";
export class Config {
    id: string = "github.com/HumXC/aikadm-frontend";
    defaultUsername: string = "";
    defaultSession: string = "";
    zoom: number = 1;
    background: string = "https://www.todaybing.com/api/today/";
}
export async function getConfig(): Promise<Config> {
    let config = new Config();
    let _config: Config;
    try {
        _config = await Aikadm.ReadConfig();
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
        await Aikadm.SaveConfig(config);
    } catch (e) {
        console.error("Error saving config:", e);
    }
}
