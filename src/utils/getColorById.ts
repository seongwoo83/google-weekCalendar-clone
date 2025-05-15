import { pastelColors } from "../constants/eventColor";

export const getColorById = (id: string) => {
    let hash = 0;
    for(let i = 0; i < id.length; i++){
        hash = (hash * 31 + id.charCodeAt(i)) % pastelColors.length;
    }
    return pastelColors[hash];
}