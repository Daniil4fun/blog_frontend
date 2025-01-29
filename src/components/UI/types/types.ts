import { ButtonProps, OutlinedTextFieldProps } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { ReactNode } from "react";

export interface AppButtonProps extends ButtonProps {
    children: ReactNode;
}

export interface AppInputProps extends OutlinedTextFieldProps {
    children?: ReactNode;
    sx?: SxProps<Theme>;
}