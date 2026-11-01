import { Colors2 } from "./dino";

export interface IColorPicker {
    label: string;
    color: string;
    property: keyof Colors2;
}

export const emptyColorPicker = (property: keyof Colors2, label = "", color = emptyColor): IColorPicker => ({
    label,
    color,
    property
})

export const emptyColor = "000000";