import { Service } from '@angular/core';
import { Colors, Colors1, Colors3, Colors4, Colors5, Colors6, Dino, emptyColor } from '../data-interfaces';

@Service()
export class SkinEditorService {

    generateSkinCode(name: string, pattern: string, colors: Colors): string {
        let code = `${name}${pattern}${colors.underbelly || emptyColor}FF${colors.body || emptyColor}FF`;

        if (isColors2(colors)) {
            code += `${colors.flank || emptyColor}`;
        }

        if (isColors3(colors)) {
            code += `FF${colors.markings || emptyColor}FF${colors.maleDisplay || emptyColor}FF`;
        }

        if (isColors4(colors)) {
            code += `${colors.accents}FF`;
        }

        if (isColors5(colors)) {
            code += `${colors.claws}FF`;
        }

        if (isColors6(colors)) {
            code += `${colors.mouth}FF`;
        }

        return code;
    }

}

export function isColors2(skin: Colors1 | Colors3): skin is Colors3 {
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