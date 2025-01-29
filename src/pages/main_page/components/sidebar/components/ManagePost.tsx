import AppButton from "@/components/UI/AppButton";
import AppInput from "@/components/UI/AppInput";
import { Box, IconButton } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import { ChangeEvent, Dispatch, FC, FormEvent, MouseEvent, SetStateAction, useCallback, useEffect, useState } from "react";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { addAlertWithParams } from "@/store/thunks/alertThunks";
import { hideDialog, showDialog } from "@/store/thunks/dialogThunks";
import { deleteData, getData, postData, putData, REACT_APP_API_SERVER } from "@/api/api";
import { TPost } from "../../main_content/components/components/types";
import { PostVariant } from "@/pages/main_page/MainPage";
import { FilesWrapper, ManagePostBtnsWrapper, ManagePostWrapper, PreviewWrapper, VisuallyHiddenInput } from "./styled";

interface ManagePostProps {
    setIsPost: Dispatch<SetStateAction<boolean>>;
    setPosts: Dispatch<SetStateAction<TPost[]>>;
    postVariant: PostVariant;
    choosenPostId: number;
}

const ManagePost: FC<ManagePostProps> = ({
    setIsPost,
    setPosts,
    postVariant,
    choosenPostId
}) => {
    const dispatch: AppDispatch = useDispatch();

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [files, setFiles] = useState([]);
    const [apiFiles, setApiFiles] = useState<File[]>([]);
    const [deletedMedia, setDeletedMedia] = useState<string[]>([]);

    useEffect(() => {
        const getPostData = async () => {
            if (postVariant === 'new') {
                setTitle("");
                setContent("");
                setFiles([]);
                setApiFiles([]);
            } else {
                const { data } = await getData(`/posts/${choosenPostId}`);
                const { content, title, media } = data;

                const preparedMediaData = media.map((file: {
                    filename: string,
                    category: string,
                    format: string
                }) => {
                    return {
                        url: `${REACT_APP_API_SERVER}/${file.filename}`,
                        type: `${file.category}/${file.format}`
                    }
                });

                setContent(content);
                setTitle(title);
                setFiles(preparedMediaData);
            }
        }
        getPostData();
    }, [postVariant]);

    const handleChangeFiles = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList) {
            const newFiles = Array.from(fileList).map(file => ({
                url: URL.createObjectURL(file),
                type: file.type,
                isFromClient: true,
                name: file.name
            }));

            const combinedFiles = [...files, ...newFiles];

            if (combinedFiles.length > 5) {
                dispatch(addAlertWithParams('Вы можете загрузить не более 5 файлов', "warning"));
                setFiles(combinedFiles.slice(0, 5));
                setApiFiles(Array.from(fileList).slice(0, 5));
            } else {
                setFiles(combinedFiles);
                setApiFiles(prevApiFiles => [...prevApiFiles, ...Array.from(fileList)]);
            }
        }
    }, [files, apiFiles]);

    const getPreviewBlock = useCallback((event: MouseEvent<HTMLDivElement>, file: { url: string, type: string }) => {
        const tag = file.type.startsWith('image/')
            ? <img src={file.url} alt="image" />
            : file.type.startsWith('video/')
                ? <video controls>
                    <source src={file.url} type={file.type} />
                </video>
                : <Box>Превью недоступно</Box>;

        dispatch(showDialog(
            "",
            <PreviewWrapper>
                {tag}
            </PreviewWrapper>,
            [{
                name: "Close",
                onClick: () => dispatch(hideDialog())
            }]
        ))
    }, []);

    const handleCreatePost = useCallback(async (event: FormEvent) => {
        event.preventDefault();

        const parsedUser = JSON.parse(localStorage.getItem('user'));
        const formData = new FormData();

        formData.append('title', title);
        formData.append('content', content);
        formData.append('userId', (parsedUser.id).toString());

        apiFiles.forEach(file => {
            formData.append('img', file);
        });

        const { data } = await postData('', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        setIsPost(false);
        setPosts(prevPosts => [data, ...prevPosts]);
    }, [title, content, apiFiles]);

    const handleEditPost = useCallback(async (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('title', title);
        formData.append('content', content);

        apiFiles.forEach(file => {
            formData.append('img', file);
        });

        formData.append('deletedMedia', JSON.stringify(deletedMedia));


        const { data } = await putData(choosenPostId.toString(), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        setIsPost(false);
        setPosts(prevPosts => [data, ...prevPosts.filter(item => item.id !== data.id)]);
    }, [title, content, apiFiles, deletedMedia, choosenPostId]);

    const onCloseIconClick = useCallback((event: MouseEvent<HTMLButtonElement>, file: { name?: string, url: string, isFromClient?: boolean }) => {
        event.stopPropagation();

        if (!file.isFromClient) {
            const lastIndexOfSlash = file.url.lastIndexOf('/');
            const filename = file.url.slice(lastIndexOfSlash + 1);

            setDeletedMedia(prev => [...prev, filename]);
        } else {
            setApiFiles(prevApiFiles => prevApiFiles.filter(apiFile =>
                apiFile.name !== file.name
            ));
        }

        setFiles(files.filter(item => item.url !== file.url));
    }, [files, deletedMedia, apiFiles]);

    const onClickDeletePost = useCallback(async () => {
        await deleteData(`/posts/${choosenPostId}`);
        setPosts(prevPosts => [...prevPosts.filter(item => item.id !== choosenPostId)]);
        setIsPost(false);
    }, [choosenPostId]);

    return <ManagePostWrapper
        component={"form"}
        onSubmit={postVariant === 'new' ? handleCreatePost : handleEditPost}
        elevation={2}
    >
        <AppInput
            value={title}
            onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setTitle(event.target.value)}
            variant="outlined"
            label="Заголовок"
            fullWidth
            slotProps={{ htmlInput: { maxLength: 60 } }}
        />
        <AppInput
            value={content}
            onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setContent(event.target.value)}
            variant="outlined"
            label="Текст"
            multiline
            rows={5}
            fullWidth
            slotProps={{ htmlInput: { maxLength: 240 } }}
        />
        <AppButton
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ ml: 'auto' }}
        >
            Медиа файлы
            <VisuallyHiddenInput
                type="file"
                accept="image/*, video/*"
                onChange={handleChangeFiles}
                multiple
            />
        </AppButton>
        <Box sx={{ display: 'flex', gap: '3px' }}>
            {files.map((file, index) => {
                return <FilesWrapper
                    key={index}
                    onClick={(event) => getPreviewBlock(event, file)}
                >
                    {file.type.startsWith('image/')
                        ? <img src={file.url} alt={`file-${index}`} />
                        : file.type.startsWith('video/')
                            ? <video controls>
                                <source src={file.url} type={file.type} />
                            </video>
                            : undefined}
                    <IconButton
                        onClick={(event) => onCloseIconClick(event, file)}
                        size="small"
                        sx={{ position: 'absolute', top: '0', left: '70%' }}
                    >
                        <CancelIcon fontSize="small" />
                    </IconButton>
                </FilesWrapper>
            })}
        </Box>
        <ManagePostBtnsWrapper>
            <AppButton
                type="submit"
                variant="contained"
                disabled={Boolean(!(title.trim() && (content.trim() || files.length)))}
            >
                {postVariant === 'new' ? 'Добавить пост' : 'Редактировать пост'}
            </AppButton>
            {postVariant === 'edit' && <AppButton
                variant="contained"
                sx={{
                    bgcolor: '#d32f2f',
                    ':hover': {
                        bgcolor: '#ef5350'
                    }
                }}
                onClick={onClickDeletePost}
            >
                Удалить пост
            </AppButton>}
        </ManagePostBtnsWrapper>
    </ManagePostWrapper>
}

export default ManagePost;