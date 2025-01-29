import { AppDispatch } from "@/store";
import { removeAlertById } from "@/store/thunks/alertThunks";
import { Alert as AlertType } from "@/store/types/alertTypes";
import { IconButton } from "@mui/material"
import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { AlertMessage, AlertWrapper } from "./styled";

const AlertItem: FC<AlertType> = ({ id, message, severity }) => {
    const dispatch: AppDispatch = useDispatch();

    const handleRemoveAlert = useCallback((id: string) => {
        dispatch(removeAlertById(id));
    }, []);

    return <AlertWrapper
        severity={severity}
        action={
            <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => handleRemoveAlert(id)}
            >
                <CloseIcon fontSize="inherit" />
            </IconButton>
        }
    >
        <AlertMessage>
            {message}
        </AlertMessage>
    </AlertWrapper>
}

export default AlertItem;