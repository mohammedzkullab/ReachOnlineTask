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
}