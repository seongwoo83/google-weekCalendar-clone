import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addWeeks, startOfWeek } from "date-fns";

interface CalendarEvent{
    id: string;
    title: string;
    date: string;
    startHour: number;
    endHour: number;
}

interface CalendarState {
    weekstart: Date;
    eventList: CalendarEvent[];
}
const initialState: CalendarState = {
    weekstart: startOfWeek(new Date(), {weekStartsOn: 1}),
    eventList: [],
}

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        goToPrevWeek(state){
            state.weekstart = addWeeks(state.weekstart, -1);
        },
        goToNextWeek(state){
            state.weekstart = addWeeks(state.weekstart, 1);
        },
        goToToday(state){
            state.weekstart = startOfWeek(new Date(), {weekStartsOn: 1});
        },
        setWeekByDate(state, action: PayloadAction<Date>){
            state.weekstart = startOfWeek(action.payload, {weekStartsOn: 1});
        },
        addEvent(state, action: PayloadAction<CalendarEvent>){
            state.eventList.push(action.payload);
        },
        deleteEvent(state, action: PayloadAction<string>){
            state.eventList = state.eventList.filter(event => event.id !== action.payload);
        }
    }
})

export const {goToPrevWeek, goToNextWeek, goToToday, setWeekByDate, addEvent, deleteEvent} = calendarSlice.actions;
export default calendarSlice.reducer;