import { AppDispatch } from '../index';
import { ReactNode } from 'react';
import { manageDialog } from '../slices/dialogSlice';
import { Dialog } from '../types/dialogTypes';

export const showDialog = (
    title: string,
    content: string | ReactNode,
    buttons: { name: string; onClick: () => void }[]
) => (dispatch: AppDispatch) => {
    const dialog: Dialog = {
        isEnabled: true,
        title,
        content,
        buttons
    };
    dispatch(manageDialog(dialog));
};

export const hideDialog = () => (dispatch: AppDispatch) => {
    const dialog: Dialog = {
        isEnabled: false,
        title: '',
        content: null,
        buttons: []
    };
    dispatch(manageDialog(dialog));
}