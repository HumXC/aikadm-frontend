import { getLocationFromIP } from "./common";
import { Aikadm } from "./bindings/github.com/HumXC/aikadm";
export class Config {
    id: string = "github.com/HumXC/aikadm-frontend";
    defaultUsername: string = "";
    defaultSession: string = "";
    lang: string = "en";
    zoom: number = 1;
    nightLightMode: boolean = false;
    latitude: string = "";
    longitude: string = "";
    highColorTemp: number = 6500;
    lowColorTemp: number = 4000;
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
    if (config.latitude === "" || config.longitude === "") {
        getLocationFromIP().then((location) => {
            if (location) {
                config.latitude = location.latitude.toFixed(1).toString();
                config.longitude = location.longitude.toFixed(1).toString();
                saveConfig(config);
            }
        });
    }
    return config;
}
export async function saveConfig(config: Config) {
    try {
        await Aikadm.SaveConfig(config);
    } catch (e) {
        console.error("Error saving config:", e);
    }
}
