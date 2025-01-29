import { Box, Paper, styled, Typography } from "@mui/material";

export const PostItemWrapper = styled(Paper)`
    border-radius: 15px;
    width: 95%;
    padding: 20px;
    margin-top: 20px;
`;

export const PostItemHeader = styled(Box)`
    display: flex; 
    justify-content: space-between;
`;

export const TitleAndContentWrapper = styled(Box)`
    display: flex; 
    gap: 10px; 
    align-items: flex-start;
`;

export const UserAndDateText = styled(Typography)`
    font-size: 12px; 
    color: rgba(121, 121, 121, 0.6);
`;

export const MediaWrapper = styled(Box)`
    margin-top: 10px;
    border: 3px solid lightgray;
    padding: 5px;
    border-radius: 5px;

    & > img, & > video {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;