import { AlertColor } from "@mui/material";

export type Alert = {
    id: string;
    message: string | null;
    severity: AlertColor;
}

export interface AlertsState {
    alerts: Alert[]
}