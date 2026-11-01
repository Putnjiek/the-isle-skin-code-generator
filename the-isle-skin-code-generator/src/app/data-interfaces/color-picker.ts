import { Colors4, Colors5 } from "./dino";

export interface IColorPicker {
    label: string;
    color: string;
    property: keyof Colors4;
}

export const emptyColorPicker = (property: keyof Colors4, label = "", color = emptyColor): IColorPicker => ({
    label,
    color,
    property
})

export const emptyColor = "000000";