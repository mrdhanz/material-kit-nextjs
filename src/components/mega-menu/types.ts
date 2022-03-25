export interface MegaMenuItems {
    title: string;
    path: string;
    [key: string]: any;
}
export interface MegaMenuChildren {
    subheader: string;
    items: MegaMenuItems[];
    [key: string]: any;
}
export interface MegaMenuProduct {
    image?: string;
    name?: string;
    path: string;
    [key: string]: any;
}