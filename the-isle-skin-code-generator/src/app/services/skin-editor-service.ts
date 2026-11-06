import { Service } from '@angular/core';
import { Colors, Colors1, Colors2, Colors3, Colors4, Colors5, Colors6, Colors7, Dino, emptyColor } from '../data-interfaces';

@Service()
export class SkinEditorService {

    generateSkinCode(name: string, pattern: string, colors: Colors): string {
        let code = `${name}${pattern}${colors.underbelly || emptyColor}FF${colors.body || emptyColor}FF`;

        if (isColors2(colors)) {
            code += `${colors.flank || emptyColor}FF`;
        }

        if (isColors3(colors)) {
            code += `${colors.markings || emptyColor}FF${colors.maleDisplay || emptyColor}FF`;
        }

        if (isColors4(colors) && colors.accents) {
            code += `${colors.accents}FF`;
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

        return code;
    }

}

export function isColors2(skin: Colors1 | Colors2): skin is Colors2 {
    return 'flank' in skin;
}

export function isColors3(skin: Colors1 | Colors3): skin is Colors3 {
    return 'markings' in skin || 'maleDisplay' in skin;
}

export function isColors4(skin: Colors1 | Colors3 | Colors4): skin is Colors4 {
    return 'accents' in skin;
}

export function isColors5(skin: Colors1 | Colors3 | Colors5): skin is Colors5 {
    return 'claws' in skin;
}

export function isColors6(skin: Colors1 | Colors3 | Colors6): skin is Colors6 {
    return 'mouth' in skin;
}

export function isColors7(skin: Colors1 | Colors3 | Colors7): skin is Colors7 {
    return 'teeth' in skin;
}