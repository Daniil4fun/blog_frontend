import { Box, IconButton, InputAdornment } from "@mui/material";
import { FormEvent, useCallback, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AppButton from "@/components/UI/AppButton";
import { getAuth } from "@/api/api";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/slices/authSlice";
import AppInput from "@/components/UI/AppInput";
import Logo from "@/components/logo/Logo";
import { jwtDecode } from "jwt-decode";
import { setUser } from "@/store/slices/userSlice";
import { DecodedUser, Urls } from "./types";
import { addAlertWithParams } from "@/store/thunks/alertThunks";
import { useNavigate } from "react-router-dom";
import { AuthPageWrapper, PaperWrapper, StyledLink } from "./styled";

const AuthPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const [isRegistration, setIsRegistration] = useState<boolean>(true);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const auth = useCallback(async (event: FormEvent, username: string, password: string) => {
        event.preventDefault();

        try {
            setIsLoading(true);

            const { data } = await getAuth(isRegistration ? Urls.Registration : Urls.Login, username, password);
            const user = jwtDecode<DecodedUser>(data.token);
    
            dispatch(setUser(user));
            dispatch(setLogin(data.token));
    
            localStorage.setItem('user', JSON.stringify({ id: user.id, username: user.username }));
    
            let timer: NodeJS.Timeout = setTimeout(() => {
                setIsLoading(false);
                navigate('/');
            }, 1500);
    
            if (isRegistration) {
                dispatch(addAlertWithParams(`Регистрация прошла успешно. Редирект на главную страницу.`, "success"));
            } else {
                dispatch(addAlertWithParams(`Авторизация прошла успешно. Редирект на главную страницу.`, "success"));
            }
    
            return () => clearTimeout(timer);
        } catch {
            setIsLoading(false);
        }
    }, [isRegistration]);

    const onClickLink = useCallback(() => {
        setIsRegistration(!isRegistration);
    }, [isRegistration]);

    return (
        <AuthPageWrapper>
            <PaperWrapper
                component={'form'}
                elevation={10}
                onSubmit={(event) => auth(event, username, password)}
            >
                <Box>
                    <Logo fontSize="60px" iconSize="66px" />
                    <Box sx={{ width: '350px', mt: '10px' }}>
                        <Box>
                            <AppInput
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                variant="outlined"
                                label="Логин"
                                fullWidth
                                required
                            />
                        </Box>
                        <Box sx={{ mt: '15px' }}>
                            <AppInput
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                variant="outlined"
                                label="Пароль"
                                type={isPassVisible ? "text" : "password"}
                                fullWidth
                                required
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setIsPassVisible(!isPassVisible)}>
                                                    {isPassVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ mt: '15px' }}>
                        <AppButton
                            sx={{ m: '0 auto', width: '350px' }}
                            variant="contained"
                            type="submit"
                            loading={isLoading}
                            loadingPosition="start"
                        >
                            {isRegistration ? 'Регистрация' : 'Войти'}
                        </AppButton>
                    </Box>
                    <Box sx={{ mt: '15px' }}>
                        <StyledLink
                            color="primary"
                            onClick={onClickLink}
                        >
                            {isRegistration ? 'Уже зарегистрированы?' : 'Есть аккаунт?'}
                        </StyledLink>
                    </Box>
                </Box>
            </PaperWrapper>
        </AuthPageWrapper>
    )
}

export default AuthPage;