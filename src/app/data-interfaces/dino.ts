import { Diat, DinoNames } from "../enums";
import { emptyColor } from "./color-picker";

export type Colors = Colors1 | Colors2 | Colors3 | Colors4 | Colors5 | Colors6

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

export interface Colors6 extends Colors5 {
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

export const emptyPattern = (code = "000", colors: Colors = emptyColors3()): DinoPattern => ({
    code,
    colors
})

export const emptyColors = (): Colors1 => ({
    body: emptyColor,
    underbelly: emptyColor
})

export const emptyColors2 = (): Colors2 => ({
    ...emptyColors(),
    flank: emptyColor
})

export const emptyColors3 = (): Colors3 => ({
    ...emptyColors2(),
    maleDisplay: emptyColor,
    markings: emptyColor
})

export const emptyColors4 = (): Colors4 => ({
    ...emptyColors3(),
    accents: emptyColor
})

export const emptyColors5 = (): Colors5 => ({
    ...emptyColors3(),
    claws: emptyColor
})

export const emptyColors6 = (): Colors6 => ({
    ...emptyColors5(),
    mouth: emptyColor
})

export const emptyColors7 = (): Colors7 => ({
    ...emptyColors3(),
    teeth: emptyColor
})