import { FC, HTMLProps, ReactNode } from "react";


export interface DashboardLayoutProps extends HTMLProps<HTMLDivElement> {
    children: ReactNode;
    contentClassName?: string;
    withoutNavbar: boolean;
}
export type DashboardLayoutType = FC<DashboardLayoutProps>;