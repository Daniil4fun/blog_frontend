import { Box, Paper, styled } from "@mui/material";

export const DialogMask = styled(Box)`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

export const DialogWrapper = styled(Paper)`
    width: 600px; 
    background-color: white; 
    border-radius: 20px;
`;

export const DialogHeader = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lightgray;
    padding: 10px 20px;
`;

export const DialogContent = styled(Box)`
    color: gray;
    font-size: 14px;
    white-space: break-spaces;
    padding: 10px 20px;
    max-height: 400px;
    overflow-y: auto;
`;

export const DialogButtonsWrapper = styled(Box)`
    padding: 10px 20px; 
    display: flex; 
    justify-content: end; 
    align-items: center; 
    gap: 5px;
`;