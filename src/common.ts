export function applyZoom(zoom: number) {
    document.documentElement.style.fontSize = `${zoom * 16}px`;
}
export async function getLocationFromIP(): Promise<{ latitude: number; longitude: number } | null> {
    try {
        let response = await fetch("http://ip-api.com/json/");
        let data = await response.json();
        if (data.status !== "success") {
            console.error("获取 IP 位置失败:", data.message);
            return null;
        }
        console.log("纬度:", data.lat, "经度:", data.lon);
        return { latitude: data.lat, longitude: data.lon };
    } catch (error) {
        console.error("获取 IP 位置失败:", error);
        return null;
    }
}
export const Styles = ["center-card", "left-card"];
