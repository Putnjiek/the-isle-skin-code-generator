import { Service } from '@angular/core';
import { Colors, Colors1, Colors2, Colors3, Colors4, Colors5, Colors6, Colors7, Dino, emptyColor } from '../data-interfaces';

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

        if (isColors4(colors) && colors.accents) {
            code += `${colors.accents}FF`;
        }

        code += `${colors.underbelly || emptyColor}FF`;

        code += `${colors.body || emptyColor}FF`;

        if (isColors2(colors)) {
            code += `${colors.flank || emptyColor}FF`;
        }

        if (isColors3(colors)) {
            code += `${colors.markings || emptyColor}FF`;
        }

        // if (isColors5(colors)) {
        //     code += `${colors.claws}FF`;
        // }

        // if (isColors6(colors)) {
        //     code += `${colors.mouth}FF`;
        // }

        // if (isColors7(colors)) {
        //     code += `${colors.teeth}FF`
        // }

        if (isColors3(colors)) {
            code += `${colors.maleDisplay || emptyColor}FF`
        }

        return code;
    }

}

/**
 * Checks whether the color object contains a flank color.
 * @param skin The color object to check.
 * @returns True if the object contains the flank property.
 */
export function isColors2(skin: Colors1 | Colors2): skin is Colors2 {
    return 'flank' in skin;
}

/**
 * Checks whether the color object contains markings or male display colors.
 * @param skin The color object to check.
 * @returns True if the object contains either property.
 */
export function isColors3(skin: Colors1 | Colors3): skin is Colors3 {
    return 'markings' in skin || 'maleDisplay' in skin;
}

/**
 * Checks whether the color object contains an accents color.
 * @param skin The color object to check.
 * @returns True if the object contains the accents property.
 */
export function isColors4(skin: Colors1 | Colors3 | Colors4): skin is Colors4 {
    return 'accents' in skin;
}

/**
 * Checks whether the color object contains a claws color.
 * @param skin The color object to check.
 * @returns True if the object contains the claws property.
 */
export function isColors5(skin: Colors1 | Colors3 | Colors5): skin is Colors5 {
    return 'claws' in skin;
}

/**
 * Checks whether the color object contains a mouth color.
 * @param skin The color object to check.
 * @returns True if the object contains the mouth property.
 */
export function isColors6(skin: Colors1 | Colors3 | Colors6): skin is Colors6 {
    return 'mouth' in skin;
}

/**
 * Checks whether the color object contains a teeth color.
 * @param skin The color object to check.
 * @returns True if the object contains the teeth property.
 */
export function isColors7(skin: Colors1 | Colors3 | Colors7): skin is Colors7 {
    return 'teeth' in skin;
}