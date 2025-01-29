import { Box, styled } from "@mui/material";

interface SidebarWrapperProps {
  side: "left" | "right";
  isPost?: boolean;
}

const getFlexValue = ({ side, isPost }: SidebarWrapperProps) => {
  if (side === "left") {
    return isPost ? "3" : "1";
  }
  return isPost ? "0" : "1";
};

const getPaddingValue = ({ side, isPost }: SidebarWrapperProps) => {
  if (side === "left") {
    return "20px";
  }
  return isPost ? "0" : "20px";
};

const getTransitionValue = ({ side }: SidebarWrapperProps) => {
  return side === "left" ? "flex 0.5s" : "flex 0.5s, padding 0.5s";
};

export const SidebarWrapper = styled(Box)<SidebarWrapperProps>`
  flex: ${getFlexValue};
  padding: ${getPaddingValue};
  transition: ${getTransitionValue};
`;