import { Box, Paper, PaperProps, styled, Typography } from "@mui/material";

export const AuthPageWrapper = styled(Box)`
    display: flex; 
    align-items: center; 
    height: 100vh; 
    justify-content: center; 
`;

export const PaperWrapper = styled(Paper)<PaperProps>`
    padding: 20px;
    height: 420px;
    width: 450px;
    border-radius: 20px;

    & > div {
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        margin-top: 30px;
    }
`;

export const StyledLink = styled(Typography)`
    text-decoration: underline; 
    cursor: pointer; 
    font-size: 10px; 
    user-select: none;
`;