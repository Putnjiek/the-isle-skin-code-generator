import { Service } from '@angular/core';
import { Colors, Colors1, Colors2, Colors3, Colors4, Colors5, Colors7, Dino, emptyColor, ColorsMouth } from '../data-interfaces';

export interface ParsedSkinCode {
    name: Dino['name'];
    pattern: string;
    colors: Colors;
}

@Service()
export class SkinEditorService {
    /**
     * Generates a skin code from the dinosaur name, pattern and selected colors.
     * Each color is appended with its alpha value (FF).
     * @param name The name of the selected dinosaur.
     * @param pattern The code of the selected skin pattern.
     * @param colors The colors used to generate the skin code.
     * @returns The complete generated skin code.
     */
    generateSkinCode(name: string, pattern: string, colors: Colors): string {
        let code = `${name}${pattern}`;

        if (isColorsMouth(colors)) {
            code += `${colors.mouth || emptyColor}FF`;
        }

        if (isColorsClaws(colors)) {
            code += `${colors.claws || emptyColor}FF`;
        }

        if (isColorsTeeth(colors)) {
            code += `${colors.teeth || emptyColor}FF`;
        }

        if (isColorsAccents(colors) && colors.accents) {
            code += `${colors.accents}FF`;
        }

        code += `${colors.underbelly || emptyColor}FF`;

        code += `${colors.body || emptyColor}FF`;

        if (isColorsFlank(colors)) {
            code += `${colors.flank || emptyColor}FF`;
        }

        if (isColorsMaleAndMarkings(colors)) {
            code += `${colors.markings || emptyColor}FF`;
        }

        if (isColorsMaleAndMarkings(colors)) {
            code += `${colors.maleDisplay || emptyColor}FF`;
        }

        return code;
    }

    /**
     * Parses a generated skin code and restores the dinosaur, pattern and colors.
     */
    parseSkinCode(code: string, dinos: Dino[]): ParsedSkinCode | null {
        const normalized = code.trim().replace(/^#/, '').replace(/\s/g, '').toUpperCase();
        if (!normalized) return null;

        const dino = [...dinos]
            .sort((a, b) => b.name.length - a.name.length)
            .find(candidate => normalized.startsWith(candidate.name.toUpperCase()));
        if (!dino) return null;

        const patternCode = normalized.slice(dino.name.length, dino.name.length + 3);
        const pattern = dino.patterns.find(candidate => candidate.code === patternCode);
        if (!pattern) return null;

        const payload = normalized.slice(dino.name.length + 3);
        if (!payload || payload.length % 8 !== 0) return null;

        const segments: string[] = [];
        for (let index = 0; index < payload.length; index += 8) {
            const segment = payload.slice(index, index + 8);
            if (!/^[0-9A-F]{6}FF$/i.test(segment)) return null;
            segments.push(segment.slice(0, 6));
        }

        const colors = { ...pattern.colors } as Colors;
        let index = 0;

        if (isColorsMouth(colors)) {
            if (index >= segments.length) return null;
            colors.mouth = segments[index++];
        }

        if (isColorsClaws(colors)) {
            if (index >= segments.length) return null;
            colors.claws = segments[index++];
        }

        if (isColorsTeeth(colors)) {
            if (index >= segments.length) return null;
            colors.teeth = segments[index++];
        }

        if (isColorsAccents(colors)) {
            if (index >= segments.length) return null;
            colors.accents = segments[index++];
        }

        if (index >= segments.length) return null;
        colors.underbelly = segments[index++];
        if (index >= segments.length) return null;
        colors.body = segments[index++];

        if (isColorsFlank(colors)) {
            if (index >= segments.length) return null;
            colors.flank = segments[index++];
        }

        if (isColorsMaleAndMarkings(colors)) {
            if (index >= segments.length) return null;
            colors.markings = segments[index++];

            if (index >= segments.length) return null;
            colors.maleDisplay = segments[index++];
        }

        if (index !== segments.length) return null;

        return {
            name: dino.name,
            pattern: patternCode,
            colors
        };
    }

}

/**
 * Checks whether the color object contains a flank color.
 * @param skin The color object to check.
 * @returns True if the object contains the flank property.
 */
export function isColorsFlank(skin: Colors1 | Colors2): skin is Colors2 {
    return 'flank' in skin;
}

/**
 * Checks whether the color object contains markings or male display colors.
 * @param skin The color object to check.
 * @returns True if the object contains either property.
 */
export function isColorsMaleAndMarkings(skin: Colors1 | Colors3): skin is Colors3 {
    return 'markings' in skin || 'maleDisplay' in skin;
}

/**
 * Checks whether the color object contains an accents color.
 * @param skin The color object to check.
 * @returns True if the object contains the accents property.
 */
export function isColorsAccents(skin: Colors1 | Colors3 | Colors4): skin is Colors4 {
    return 'accents' in skin;
}

/**
 * Checks whether the color object contains a claws color.
 * @param skin The color object to check.
 * @returns True if the object contains the claws property.
 */
export function isColorsClaws(skin: Colors1 | Colors3 | Colors5): skin is Colors5 {
    return 'claws' in skin;
}

/**
 * Checks whether the color object contains a mouth color.
 * @param skin The color object to check.
 * @returns True if the object contains the mouth property.
 */
export function isColorsMouth(skin: Colors1 | Colors3 | ColorsMouth): skin is ColorsMouth {
    return 'mouth' in skin;
}

/**
 * Checks whether the color object contains a teeth color.
 * @param skin The color object to check.
 * @returns True if the object contains the teeth property.
 */
export function isColorsTeeth(skin: Colors1 | Colors3 | Colors7): skin is Colors7 {
    return 'teeth' in skin;
}