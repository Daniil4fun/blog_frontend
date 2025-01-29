import { Box, Paper, PaperProps, styled } from "@mui/material";

export const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1;
`;

export const ManagePostWrapper = styled(Paper)<PaperProps>`
    width: 100%;
    height: 500px;
    padding: 20px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

export const FilesWrapper = styled(Box)`
    width: 100px;
    height: 100px;
    border: 2px solid lightgray;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    position: relative;

    & > img, & > video {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    & > video {
        pointer-events: none;
    }
`;

export const ManagePostBtnsWrapper = styled(Box)`
    align-self: start;
    margin-top: auto;
    display: flex;
    gap: 10px;
`;

export const PreviewWrapper = styled(Box)`
    width: 560px;
    height: 300px;
    border: 3px solid lightgray;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;

    & > img, & > video {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;