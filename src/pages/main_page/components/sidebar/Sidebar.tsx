import { FC, ReactNode } from "react";
import { SidebarWrapper } from "./styled";

const Sidebar: FC<{
    children?: ReactNode,
    isPost: boolean,
    side: "left" | "right"
}> = ({
    children,
    isPost,
    side
}) => {
        return <SidebarWrapper isPost={isPost} side={side}>
            {children}
        </SidebarWrapper>
    }

export default Sidebar;