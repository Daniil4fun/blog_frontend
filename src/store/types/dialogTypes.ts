import { MouseEvent, ReactNode } from "react";

type DialogButton = {
    name: string;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export type Dialog = {
    isEnabled: boolean;
    title: ReactNode | string;
    content: ReactNode | null;
    buttons: DialogButton[]
};

export type DialogState = Dialog;