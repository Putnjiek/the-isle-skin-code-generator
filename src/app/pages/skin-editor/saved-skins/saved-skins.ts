import { Component, input, output, signal } from '@angular/core';
import { Toast } from '../../../components/toast/toast';
import { LocalStorageService, SavedSkin } from '../../../services/local-storage-service';

@Component({
    imports: [Toast],
    selector: 'app-saved-skins',
    templateUrl: './saved-skins.html',
    standalone: true
})
export class SavedSkins {
    code = input.required<string>();
    loadRequested = output<string>();

    savedSkins = signal<SavedSkin[]>([]);
    selectedSkinName = signal('');
    saveName = signal('');
    showSaveToast = signal(false);
    errorMessage = signal('');

    constructor(private localStorageService: LocalStorageService) {
        try {
            this.savedSkins.set(this.localStorageService.getSavedSkins());
        } catch (error) {
            this.errorMessage.set(errorMessage(error, 'Unable to load saved skins.'));
        }
    }

    saveSkin() {
        try {
            this.savedSkins.set(this.localStorageService.saveSkin(this.saveName(), this.code()));
            this.saveName.set('');
            this.errorMessage.set('');
            this.showSaveToast.set(true);
        } catch (error) {
            this.errorMessage.set(errorMessage(error, 'Unable to save this skin.'));
        }
    }

    selectSavedSkin(name: string) {
        this.selectedSkinName.set(name);
        this.saveName.set(name);
        const savedSkin = this.savedSkins().find(skin => skin.name === name);
        if (savedSkin) this.loadRequested.emit(savedSkin.code);
    }

    deleteSavedSkin(name: string) {
        if (name !== this.selectedSkinName()) return;

        try {
            this.savedSkins.set(this.localStorageService.deleteSkin(name));
            this.selectedSkinName.set('');
            this.errorMessage.set('');
        } catch (error) {
            this.errorMessage.set(errorMessage(error, 'Unable to delete this skin.'));
        }
    }
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}
