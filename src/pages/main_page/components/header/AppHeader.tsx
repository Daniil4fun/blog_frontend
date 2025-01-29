import AppButton from "@/components/UI/AppButton";
import Logo from "@/components/logo/Logo";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setLogout } from "@/store/slices/authSlice";
import { setUser } from "@/store/slices/userSlice";
import { addAlertWithParams } from "@/store/thunks/alertThunks";
import { useNavigate } from "react-router-dom";
import { AppHeaderWrapper } from "./styled";

const AppHeader = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuth } = useSelector((state: RootState) => state.auth);

    const unAuthorize = useCallback(() => {
        dispatch(setUser({ id: null, username: '' }));
        dispatch(setLogout());
        dispatch(addAlertWithParams("Успешно разавторизован", "success"));
    }, []);

    const authorize = useCallback(() => {
        navigate('auth');
    }, []);

    return (
        <AppHeaderWrapper>
            <Logo fontSize="40px" iconSize="44px" />
            <AppButton
                onClick={isAuth ? unAuthorize : authorize}
                variant="contained"
            >
                {isAuth ? 'Разавторизоваться' : 'Авторизоваться'}
            </AppButton>
        </AppHeaderWrapper>
    )
}

export default AppHeader;