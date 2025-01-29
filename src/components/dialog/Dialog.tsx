import { Typography, Box, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import AppButton from '../UI/AppButton';
import { DialogButtonsWrapper, DialogContent, DialogHeader, DialogMask, DialogWrapper } from './styled';

const Dialog = () => {
    const { title, buttons, content, isEnabled } = useSelector((state: RootState) => state.dialog);

    return (
        isEnabled && <DialogMask>
            <DialogWrapper>
                <DialogHeader>
                    <Typography variant="h6">{title}</Typography>
                    {buttons.find(btn => btn.name === "Close") && <IconButton
                        onClick={buttons.find(btn => btn.name === "Close").onClick}
                    >
                        <CloseIcon />
                    </IconButton>}
                </DialogHeader>
                <DialogContent>
                    {content}
                </DialogContent>
                <DialogButtonsWrapper>
                    {buttons.filter(btn => btn.name !== "Close").map((filteredBtn, index) => {
                        return <AppButton
                            key={index}
                            variant={index === 0 ? 'contained' : 'outlined'}
                            onClick={e => filteredBtn.onClick(e)}
                        >
                            {filteredBtn.name}
                        </AppButton>
                    })}
                </DialogButtonsWrapper>
            </DialogWrapper>
        </DialogMask>
    );
}

export default Dialog;