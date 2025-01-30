import { Box, styled } from "@mui/material";

interface SidebarWrapperProps {
  side: "left" | "right";
  isPost?: boolean;
}

export const SidebarWrapper = styled(Box, {
    shouldForwardProp: (prop) => !['isPost', 'side'].includes(prop as string)
})<SidebarWrapperProps>(({ theme, side, isPost }) => ({
    flex: side === "left" 
        ? isPost ? "3" : "1" 
        : isPost ? "0" : "1",
    padding: side === "left" 
        ? "20px" 
        : isPost ? "0" : "20px",
    transition: side === "left" 
        ? "flex 0.5s" 
        : "flex 0.5s, padding 0.5s"
}));