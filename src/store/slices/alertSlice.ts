import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert, AlertsState } from '@/store/types/alertTypes';

const initialState: AlertsState = {
    alerts: []
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        addAlert: (state, action: PayloadAction<Alert>) => {
            state.alerts.push(action.payload);
        },
        deleteAlert: (state, action: PayloadAction<string>) => {
            state.alerts = state.alerts.filter(item => item.id !== action.payload);
        },
    },
});

export const { addAlert, deleteAlert } = alertSlice.actions;
export default alertSlice.reducer;