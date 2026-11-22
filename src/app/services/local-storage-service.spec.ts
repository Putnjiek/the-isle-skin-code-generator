import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage-service';

describe('LocalStorageService', () => {
    let service: LocalStorageService;

    beforeEach(() => {
        localStorage.clear();
        TestBed.configureTestingModule({});
        service = TestBed.inject(LocalStorageService);
    });

    it('should save and retrieve named skins', () => {
        service.saveSkin('My skin', 'DIABLO010');

        expect(service.getSavedSkins()).toEqual([
            { name: 'My skin', code: 'DIABLO010' }
        ]);
    });

    it('should update an existing skin with the same trimmed name', () => {
        service.saveSkin('My skin', 'first-code');
        service.saveSkin(' My skin ', 'updated-code');

        expect(service.getSavedSkins()).toEqual([
            { name: 'My skin', code: 'updated-code' }
        ]);
    });

    it('should reject empty names', () => {
        expect(() => service.saveSkin('  ', 'DIABLO010'))
            .toThrowError('A name is required to save a skin.');
    });

    it('should delete a saved skin by name', () => {
        service.saveSkin('Keep me', 'DIABLO010');
        service.saveSkin('Delete me', 'AUSTRORAPTOR310');

        expect(service.deleteSkin('Delete me')).toEqual([
            { name: 'Keep me', code: 'DIABLO010' }
        ]);
        expect(service.getSavedSkins()).toEqual([
            { name: 'Keep me', code: 'DIABLO010' }
        ]);
    });
});
