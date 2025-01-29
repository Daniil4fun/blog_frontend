import PostItem from "./components/PostItem";
import { Dispatch, FC, SetStateAction } from "react";
import { TPost } from "./components/types";
import { PostVariant } from "@/pages/main_page/MainPage";
import LoaderComponent from "@/components/loader/LoaderComponent";
import { NoPostsText, PostsListWrapper, PostsLoaderComponent } from "./styled";

interface PostsListProps {
    posts: TPost[];
    setIsPost: Dispatch<SetStateAction<boolean>>;
    setPostVariant: Dispatch<SetStateAction<PostVariant>>;
    setChoosenPostId: Dispatch<SetStateAction<number>>;
    isSuccessPosts: boolean;
}

const PostsList: FC<PostsListProps> = ({
    posts,
    setIsPost,
    setPostVariant,
    setChoosenPostId,
    isSuccessPosts
}) => {

    if (!isSuccessPosts) {
        return <PostsLoaderComponent>
            <LoaderComponent />
        </PostsLoaderComponent>
    }

    return <PostsListWrapper postsListLength={posts.length}>
        {posts.map(({ id, content, media, title, updatedAt, UserId, User }) => {
            return <PostItem
                key={id}
                id={id}
                content={content}
                media={media}
                title={title}
                updatedAt={updatedAt}
                UserId={UserId}
                User={User}
                setIsPost={setIsPost}
                setPostVariant={setPostVariant}
                setChoosenPostId={setChoosenPostId}
            />
        })}
        {!posts.length && <NoPostsText component={"h2"}>
            Пока что нет постов
        </NoPostsText>}
    </PostsListWrapper>
}

export default PostsList;