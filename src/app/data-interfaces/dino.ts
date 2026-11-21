import { Diat, DinoNames } from "../enums";
import { emptyColor } from "./color-picker";

export type Colors = Colors1 | Colors2 | Colors3 | Colors4 | Colors5 | ColorsClawsMouth | ColorsMouth | Colors7
export type ColorProperty =
    | keyof Colors1
    | keyof Colors2
    | keyof Colors3
    | keyof Colors4
    | keyof Colors5
    | keyof ColorsClawsMouth
    | keyof ColorsMouth
    | keyof Colors7;

export interface Dino {
    name: DinoNames;
    diat: Diat;
    patterns: DinoPattern[];
}

export interface DinoPattern {
    code: string;
    colors: Colors;
}

export interface Colors1 {
    body: string;
    underbelly: string;
}

export interface Colors2 extends Colors1 {
    flank: string;
}

export interface Colors3 extends Colors2 {
    markings: string;
    maleDisplay: string;
}

export interface Colors4 extends Colors3 {
    accents: string;
}

export interface Colors5 extends Colors3 {
    claws: string;
}

export interface ColorsClawsMouth extends Colors5 {
    mouth: string;
}

export interface ColorsMouth extends Colors3 {
    mouth: string;
}

export interface Colors7 extends Colors3 {
    teeth: string;
}

export const emptyDino = (): Dino => ({
    name: DinoNames.Diabloceratops,
    diat: Diat.Carni,
    patterns: []
});

export const emptyPattern = (code = "000", colors: Colors = emptyColorsMaleAndMarkings()): DinoPattern => ({
    code,
    colors
})

export const emptyColors = (): Colors1 => ({
    body: emptyColor,
    underbelly: emptyColor
})

export const emptyColorsFlank = (): Colors2 => ({
    ...emptyColors(),
    flank: emptyColor
})

export const emptyColorsMaleAndMarkings = (): Colors3 => ({
    ...emptyColorsFlank(),
    maleDisplay: emptyColor,
    markings: emptyColor
})

export const emptyColorsAccents = (): Colors4 => ({
    ...emptyColorsMaleAndMarkings(),
    accents: emptyColor
})

export const emptyColorsClaws = (): Colors5 => ({
    ...emptyColorsMaleAndMarkings(),
    claws: emptyColor
})

export const emptyColorsClawsMouth = (): ColorsClawsMouth => ({
    ...emptyColorsClaws(),
    mouth: emptyColor
})

export const emptyColorsMouth = (): ColorsMouth => ({
    ...emptyColorsMaleAndMarkings(),
    mouth: emptyColor
})

export const emptyColorsTeeth = (): Colors7 => ({
    ...emptyColorsMaleAndMarkings(),
    teeth: emptyColor
})