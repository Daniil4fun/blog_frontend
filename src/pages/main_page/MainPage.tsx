import AppHeader from "@/pages/main_page/components/header/AppHeader";
import { Box, IconButton } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import MainContent from "./components/main_content/MainContent";
import AppButton from "@/components/UI/AppButton";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import { hideDialog, showDialog } from "@/store/thunks/dialogThunks";
import { check, getData } from "@/api/api";
import Sidebar from "./components/sidebar/Sidebar";
import ManagePost from "./components/sidebar/components/ManagePost";
import { TPost } from "./components/main_content/components/components/types";
import { MainPageWrapper, ManagePostWrapper } from "./styled";

export type PostVariant = "edit" | "new";

const MainPage = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const { isAuth } = useSelector((state: RootState) => state.auth);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccessPosts, setIsSuccessPosts] = useState<boolean>(false);
    const [isPost, setIsPost] = useState<boolean>(false);
    const [posts, setPosts] = useState<TPost[]>([]);
    const [postVariant, setPostVariant] = useState<PostVariant>('new');
    const [choosenPostId, setChoosenPostId] = useState<null | number>(null);

    useEffect(() => {
        const getPosts = async () => {
            const { data } = await getData('/posts/');
            setIsSuccessPosts(true);
            const { rows } = data;

            setPosts([...rows].reverse());
        }
        getPosts();
    }, []);

    const checkToken = useCallback(async () => {
        try {
            setIsLoading(true);
            await check();
            setIsPost(true);
            setPostVariant('new');
        } catch (error) {
            dispatch(showDialog(
                "Оповещение",
                "Вы были разлогинены, так как срок жизни токена истек. Хотите авторизоваться?",
                [
                    {
                        name: 'Close',
                        onClick: () => dispatch(hideDialog())
                    },
                    {
                        name: 'Да',
                        onClick: () => {
                            navigate('/auth');
                            dispatch(hideDialog());
                        }
                    },
                    {
                        name: 'Нет',
                        onClick: () => dispatch(hideDialog())
                    },
                ]
            ));
        } finally {
            setIsLoading(false);
        }
    }, []);

    const onClickNewPost = useCallback(() => {
        if (isAuth) {
            checkToken();
        } else {
            dispatch(showDialog(
                'Оповещение',
                'Только авторизованные пользователи могут создавать посты. Хотите авторизоваться?',
                [
                    {
                        name: 'Close',
                        onClick: () => dispatch(hideDialog())
                    },
                    {
                        name: 'Да',
                        onClick: () => {
                            navigate('/auth');
                            dispatch(hideDialog());
                        }
                    },
                    {
                        name: 'Нет',
                        onClick: () => dispatch(hideDialog())
                    },
                ]
            ));
        }
    }, [isAuth]);

    const onClickArrowLeft = useCallback(() => {
        setIsPost(false);
    }, []);

    return <Box>
        <AppHeader />
        <MainPageWrapper>
            <Sidebar isPost={isPost} side="left">
                {isPost
                    ? <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <IconButton onClick={onClickArrowLeft} size="large">
                            <ArrowBackIosNewIcon fontSize="large" />
                        </IconButton>
                    </Box>
                    : <AppButton
                        fullWidth
                        variant="outlined"
                        startIcon={<AddIcon />}
                        sx={{ color: 'white' }}
                        onClick={onClickNewPost}
                        loading={isLoading}
                        loadingPosition="end"
                    >
                        Новый пост
                    </AppButton>}
                {isPost && <ManagePostWrapper>
                    <ManagePost
                        setPosts={setPosts}
                        setIsPost={setIsPost}
                        postVariant={postVariant}
                        choosenPostId={choosenPostId}
                    />
                </ManagePostWrapper>}
            </Sidebar>
            <MainContent
                setPostVariant={setPostVariant}
                setIsPost={setIsPost}
                posts={posts}
                setChoosenPostId={setChoosenPostId}
                isSuccessPosts={isSuccessPosts}
            />
            <Sidebar isPost={isPost} side="right" />
        </MainPageWrapper>
    </Box>
}

export default MainPage;