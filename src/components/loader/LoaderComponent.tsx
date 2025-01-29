import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import Logo from "../logo/Logo";
import { Loader, LoaderText, LoaderWrapper, LogoWrapper } from "./styled";

const LoaderComponent: FC<{ children?: ReactNode }> = ({ children }) => {
    return (
        <LoaderWrapper>
            <Box>
                <LogoWrapper>
                    <Logo fontSize="60px" iconSize="66px" />
                </LogoWrapper>
                <Box sx={{ marginTop: '15px' }}>
                    <Loader />
                </Box>
                <LoaderText>{children}</LoaderText>
            </Box>
        </LoaderWrapper>
    )
}

export default LoaderComponent;