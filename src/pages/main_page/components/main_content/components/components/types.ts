export type TPost = {
    id?: number;
    title: string;
    content: string;
    media: { category: string, filename: string, format: string }[];
    updatedAt: string;
    User: { username: string };
    UserId: number;
};