import { ColorProperty } from "./dino";

export interface IColorPicker {
    label: string;
    color: string;
    property: ColorProperty;
}

export const emptyColorPicker = (property: ColorProperty, label = "", color = emptyColor): IColorPicker => ({
    label,
    color,
    property
})

export const emptyColor = "000000";