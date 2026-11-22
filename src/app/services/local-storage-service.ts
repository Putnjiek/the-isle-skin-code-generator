import { Injectable } from '@angular/core';

export interface SavedSkin {
    name: string;
    code: string;
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    private readonly storageKey = 'the-isle-skin-code-generator.saved-skins';

    getSavedSkins(): SavedSkin[] {
        const storedSkins = this.getStorage().getItem(this.storageKey);
        if (storedSkins === null) return [];

        const parsed: unknown = JSON.parse(storedSkins);
        if (!Array.isArray(parsed) || !parsed.every(isSavedSkin)) {
            throw new Error('Saved skins in local storage are invalid.');
        }

        return parsed;
    }

    saveSkin(name: string, code: string): SavedSkin[] {
        const trimmedName = name.trim();
        if (!trimmedName) {
            throw new Error('A name is required to save a skin.');
        }

        const savedSkins = this.getSavedSkins();
        const existingIndex = savedSkins.findIndex(skin => skin.name === trimmedName);
        const skin = { name: trimmedName, code };

        if (existingIndex < 0) {
            savedSkins.push(skin);
        } else {
            savedSkins[existingIndex] = skin;
        }

        this.getStorage().setItem(this.storageKey, JSON.stringify(savedSkins));
        return savedSkins;
    }

    deleteSkin(name: string): SavedSkin[] {
        const savedSkins = this.getSavedSkins().filter(skin => skin.name !== name);
        this.getStorage().setItem(this.storageKey, JSON.stringify(savedSkins));
        return savedSkins;
    }

    private getStorage(): Storage {
        const storage = globalThis.localStorage;
        if (!storage) {
            throw new Error('Local storage is not available in this environment.');
        }

        return storage;
    }
}

function isSavedSkin(value: unknown): value is SavedSkin {
    return typeof value === 'object'
        && value !== null
        && 'name' in value
        && typeof value.name === 'string'
        && 'code' in value
        && typeof value.code === 'string';
}
