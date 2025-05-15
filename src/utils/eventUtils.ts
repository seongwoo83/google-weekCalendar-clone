import { pastelColors } from '../constants/eventColor';

interface CalendarEvent{
    id: string;
    title: string;
    date: string;
    startHour: number;
    endHour: number;
}

export function assignCOlorsToEvents(event: CalendarEvent[]):(CalendarEvent & {color: string})[]{
    const sorted = [...event].sort((a, b) => a.startHour - b.startHour);
    
    const result:(CalendarEvent & {color: string})[] = [];

    for(let i =0; i<sorted.length; i++){
        const current = sorted[i];

        const overlapping = result.filter((event) => current.startHour < event.endHour && current.endHour > event.startHour).map(event => event.color);

        const availableColors = pastelColors.filter((color) => !overlapping.includes(color));


        const color =
        availableColors.length > 0
            ? availableColors[Math.floor(Math.random() * availableColors.length)]
            : pastelColors[0];

        result.push({ ...current, color });
    }
    return result;
}