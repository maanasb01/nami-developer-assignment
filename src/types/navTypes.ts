export type NavOption = {
    title: string;
    img: string;
    alt: string;
    hasSubMenu?: boolean;
    subMenu?: NavOption[];
  }