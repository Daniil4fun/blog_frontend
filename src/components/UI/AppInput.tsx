import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { AppInputProps } from "./types/types";

const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: `2px solid #D8AE6C`
                        }
                    },
                    
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                        border: `2px solid red`
                    }

                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: "#D8AE6C"
                    },
                    "&.Mui-error": {
                        color: "red"
                    }
                }
            }
        }
    }
});

const AppInput = ({ children, sx, ...props }: AppInputProps) => {

    return <ThemeProvider theme={theme}>
        <TextField
            {...props}
        >
            {children}
        </TextField>
    </ThemeProvider>
}

export default AppInput;