import { FC, HTMLProps } from "react";

export type SizeVariantsType = "small" | "medium" | "large";
export type DivElementType = HTMLProps<HTMLDivElement>;

//button
export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    type?: "button" | "submit" | "reset";
    buttonSize?: SizeVariantsType;
    fullWidth?: boolean;
    loading?: boolean;
    ref?: React.Ref<HTMLButtonElement>;
}


//card 
export interface CardProps extends DivElementType { }
export type CardType = FC<CardProps>;


//input

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    inputType: string;
    placeholder?: string;
    helperText?: string;
    className?: string;
    inputClassName?: string;
    labelClassName?: string;
}

//skeleton

interface SkeletonProps extends HTMLProps<HTMLSpanElement> {
    width?: number;
    height?: number;
    variant?: "circular" | "rectangular" | "rounded";
    numberOfLoaders?: number
}

export type SkeletonType = FC<SkeletonProps>;

//Table 
export interface TableProps {
    columns: string[];
    fetchUrl: string;
    withoutSearch?: boolean;
    className?: string;
}


// Modal 

export interface ModalProps {
    isOpen: boolean,
    openModal: () => void,
    closeModal: () => void,
    children: React.ReactNode,
    actionFunc?: () => void;
    dialogTitle?: string;
}
