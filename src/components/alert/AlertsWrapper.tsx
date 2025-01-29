import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RootState } from '@/store';
import AlertItem from './AlertItem';
import { StyledAlertsWrapper } from './styled';

const theme = createTheme({
    components: {
        MuiAlert: {
            styleOverrides: {
                message: {
                    width: '100%'
                },
            },
        }
    },
});

const AlertsWrapper = () => {
    const { alerts } = useSelector((state: RootState) => state.alert);

    return (
        <ThemeProvider theme={theme}>
            <StyledAlertsWrapper>
                {alerts.map(alert => {
                    return <AlertItem
                        key={alert.id}
                        id={alert.id}
                        message={alert.message}
                        severity={alert.severity}
                    />
                })}
            </StyledAlertsWrapper>
        </ThemeProvider>
    );
}

export default AlertsWrapper;