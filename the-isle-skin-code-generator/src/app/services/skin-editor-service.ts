import { Service } from '@angular/core';
import { Colors, Colors2, DinoVariant, emptyColor, Skin } from '../data-interfaces';

@Service()
export class SkinEditorService {

    generateSkinCode(dino: Skin): string {
        const hasExtendedColors = dino.variants.find(variant => variant.code === dino.variant)?.extendedColors ?? false;

        const colors = dino.colors;

        let code = `${dino.name}${dino.variant}${colors.underbelly || emptyColor}FF${colors.body || emptyColor}FF`;

        if (hasExtendedColors) {
            const extendedColors = isColors2(colors) ? colors : undefined;

            code += `${extendedColors?.flank || emptyColor}FF${extendedColors?.markings || emptyColor}FF${extendedColors?.maleDisplay || emptyColor}FF`;
        }

        return code;
    }

}

export function isColors2(skin: Colors | Colors2): skin is Colors2 {
    return 'flank' in skin || 'markings' in skin || 'maleDisplay' in skin;
}