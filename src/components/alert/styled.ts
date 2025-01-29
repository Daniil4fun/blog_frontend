import { Alert, Box, styled } from "@mui/material";

export const StyledAlertsWrapper = styled(Box)`
    width: calc(100% - 20px);
    position: fixed;
    bottom: 10px;
    left: 10px;
    z-index: 10;
`;

export const AlertWrapper = styled(Alert)`
    width: 100%;
    display: flex;
    align-items: center;

    &:not(:first-of-type) {
        margin-top: 10px;
    }
`;

export const AlertMessage = styled(Box)`
    white-space: pre-wrap; 
    max-height: 50vh; 
    overflow-y: auto;
`;