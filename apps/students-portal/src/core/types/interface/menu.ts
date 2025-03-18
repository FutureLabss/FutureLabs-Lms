import { IconType } from "react-icons";

export interface Menu {
  title: string;
  id: string;
  icon?: IconType;
  path: string;
  disabled?: boolean;
}