import { Button, createTheme, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { AppButtonProps } from "./types/types";

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    variants: [
                        {
                            props: { variant: 'contained' },
                            style: {
                                backgroundColor: '#D8AE6C',
                                textTransform: 'none',
                                fontFamily: 'Inter, sans-serif',
                                padding: '10px',
                                "&:hover": {
                                    backgroundColor: 'rgba(216, 174, 108, 1)'
                                },
                            },
                        },
                        {
                            props: { variant: 'outlined' },
                            style: {
                                textTransform: 'none',
                                fontFamily: 'Inter, sans-serif',
                                padding: '10px',
                                border: '2px solid white',
                                borderRadius: '10px'
                            },
                        },
                    ],
                },
            },
        },
    }
});

const AppButton: FC<AppButtonProps> = ({ children, ...props }) => {

    return <ThemeProvider theme={theme}>
        <Button {...props}>
            {children}
        </Button>
    </ThemeProvider>
}

export default AppButton;