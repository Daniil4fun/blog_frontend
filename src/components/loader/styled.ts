import { Box, LinearProgress, styled, Typography } from "@mui/material";

export const LoaderWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 150;
    height: 100%;
`;

export const LogoWrapper = styled(Box)`
    display: flex; 
    justify-content: center;
`;

export const Loader = styled(LinearProgress)`
    background-color: #808080;
    height: 10px;
    border-radius: 8px;

    & .MuiLinearProgress-bar {
        background-color: #D8AE6C;
    }
`;

export const LoaderText = styled(Typography)`
    font-size: 16px;
    color: black;
    margin-top: 10px;
    text-align: center;
`;