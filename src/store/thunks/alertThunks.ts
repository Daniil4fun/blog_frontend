import { AlertColor } from '@mui/material';
import { nanoid } from 'nanoid';
import { addAlert, deleteAlert } from '../slices/alertSlice';
import { AppDispatch } from '../index';

export const addAlertWithParams = (message: string, severity: AlertColor) => (dispatch: AppDispatch) => {
  const newAlert = {
    id: nanoid(),
    message,
    severity,
  };
  dispatch(addAlert(newAlert));
};

export const removeAlertById = (id: string) => (dispatch: AppDispatch) => {
  dispatch(deleteAlert(id));
}