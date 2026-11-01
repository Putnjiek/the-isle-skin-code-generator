import { Diat, DinoNames } from "../enums";
import { emptyColor } from "./color-picker";

export interface Dino {
    name: DinoNames;
    diat: Diat;
    variants: DinoVariant[];
}

export interface DinoVariant {
    name: string;
    code: string;
    extendedColors: boolean;
}

export interface Skin extends Dino {
    variant: string;
    colors: Colors | Colors2;
}

export interface Colors {
    body: string;
    underbelly: string;
}

export interface Colors2 extends Colors {
    flank: string;
    markings: string;
    maleDisplay: string;
}

export const emptySkin = (): Skin => ({
    name: DinoNames.Allosaurus,
    diat: Diat.Carni,
    variants: [],
    variant: '',
    colors: emptyColors()
});

export const emptyColors = (): Colors => ({
    body: emptyColor,
    underbelly: emptyColor
})

export const emptyColors2 = (): Colors2 => ({
    body: emptyColor,
    underbelly: emptyColor,
    flank: emptyColor,
    maleDisplay: emptyColor,
    markings: emptyColor
})