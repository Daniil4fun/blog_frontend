import { Box, styled, Typography, TypographyProps } from "@mui/material";

type PostsListWrapperProps = {
    postsListLength?: number;
}

export const PostsListWrapper = styled(Box)<PostsListWrapperProps>`
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    justify-content: ${({ postsListLength }) => (postsListLength ? 'flex-start' : 'center')};
    align-items: center;
    flex: 3;
`;

export const NoPostsText = styled(Typography)<TypographyProps>`
    font-size: 34px;
    font-weight: bold;
    color: white;
`;

export const PostsLoaderComponent = styled(Box)`
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 3;
`;