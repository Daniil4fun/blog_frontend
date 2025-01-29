import PostsList from "./components/PostsList";
import { Dispatch, FC, SetStateAction } from "react";
import { TPost } from "./components/components/types";
import { PostVariant } from "../../MainPage";
import { MainContentWrapper } from "./styled";

interface MainContentProps {
    posts: TPost[];
    setIsPost: Dispatch<SetStateAction<boolean>>;
    setPostVariant: Dispatch<SetStateAction<PostVariant>>;
    setChoosenPostId: Dispatch<SetStateAction<number>>;
    isSuccessPosts: boolean;
}

const MainContent: FC<MainContentProps> = ({
    posts,
    setIsPost,
    setPostVariant,
    setChoosenPostId,
    isSuccessPosts
}) => {
    return <MainContentWrapper>
        <PostsList
            setPostVariant={setPostVariant}
            setIsPost={setIsPost}
            setChoosenPostId={setChoosenPostId}
            posts={posts}
            isSuccessPosts={isSuccessPosts}
        />
    </MainContentWrapper>
}

export default MainContent;