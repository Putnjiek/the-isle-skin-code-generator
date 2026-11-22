import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedSkins } from './saved-skins/saved-skins';

describe('SavedSkins', () => {
    let component: SavedSkins;
    let fixture: ComponentFixture<SavedSkins>;

    beforeEach(async () => {
        localStorage.clear();
        await TestBed.configureTestingModule({
            imports: [SavedSkins],
        }).compileComponents();

        fixture = TestBed.createComponent(SavedSkins);
        fixture.componentRef.setInput('code', 'DIABLO010');
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should save a skin and emit its code when selected', () => {
        component.saveName.set('My skin');
        component.saveSkin();

        let loadedCode = '';
        component.loadRequested.subscribe(code => loadedCode = code);
        component.selectSavedSkin('My skin');

        expect(loadedCode).toBe('DIABLO010');
    });

    it('should only delete the selected skin', () => {
        component.saveName.set('My skin');
        component.saveSkin();

        component.deleteSavedSkin('My skin');
        expect(component.savedSkins()).toHaveLength(1);

        component.selectSavedSkin('My skin');
        component.deleteSavedSkin('My skin');

        expect(component.savedSkins()).toEqual([]);
        expect(component.selectedSkinName()).toBe('');
        expect(localStorage.getItem('the-isle-skin-code-generator.saved-skins')).toBe('[]');
    });

    it('should enable the delete button only after selecting a skin', () => {
        fixture.detectChanges();
        const deleteButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="button"]');
        expect(deleteButton.disabled).toBe(true);

        component.saveName.set('My skin');
        component.saveSkin();
        component.selectSavedSkin('My skin');
        fixture.detectChanges();

        expect(deleteButton.disabled).toBe(false);
    });
});
