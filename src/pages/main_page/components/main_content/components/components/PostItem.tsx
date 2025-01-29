import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { TPost } from "./types";
import { REACT_APP_API_SERVER } from "@/api/api";
import { formatDate, getUserFromStorage } from "@/utils";
import { PostVariant } from "@/pages/main_page/MainPage";
import { MediaWrapper, PostItemHeader, PostItemWrapper, TitleAndContentWrapper, UserAndDateText } from "./styled";

interface PostItemProps extends TPost {
    setIsPost: Dispatch<SetStateAction<boolean>>;
    setPostVariant: Dispatch<SetStateAction<PostVariant>>;
    setChoosenPostId: Dispatch<SetStateAction<number>>;
}

const PostItem: FC<PostItemProps> = ({
    id,
    content,
    title,
    media,
    updatedAt,
    User,
    UserId,
    setIsPost,
    setPostVariant,
    setChoosenPostId
}) => {

    const handleEditClick = useCallback((id: number) => {
        setIsPost(true);
        setPostVariant('edit');
        setChoosenPostId(id);
    }, []);

    return <PostItemWrapper
        elevation={2}
        key={title}
    >
        <PostItemHeader>
            <TitleAndContentWrapper>
                <Box>
                    <Typography component={"h3"} sx={{ fontWeight: 'bold', fontSize: '20px' }}>{title}</Typography>
                    <Typography>{content}</Typography>
                </Box>
                {getUserFromStorage().id === UserId && <IconButton
                    size="small"
                    onClick={() => handleEditClick(id)}
                >
                    <EditIcon fontSize="small" />
                </IconButton>}
            </TitleAndContentWrapper>
            <Box>
                <UserAndDateText>Пользователь: {User.username}</UserAndDateText>
                <UserAndDateText>Дата: {formatDate(updatedAt)}</UserAndDateText>
            </Box>
        </PostItemHeader>
        <Box sx={{ mt: '20px' }}>
            {media.map(item => {
                if (item.category === 'image') {
                    return <MediaWrapper key={item.filename}>
                        <img src={`${REACT_APP_API_SERVER}/${item.filename}`}
                        />
                    </MediaWrapper>
                } else if (item.category === 'video') {
                    return <MediaWrapper key={item.filename}>
                        <video controls>
                            <source src={`${REACT_APP_API_SERVER}/${item.filename}`} type={`${item.category}/${item.format}`} />
                        </video>
                    </MediaWrapper>
                }
            })}
        </Box>
    </PostItemWrapper>
}

export default PostItem;