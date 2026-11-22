import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App theme', () => {
    let fixture: ComponentFixture<App>;
    let component: App;
    const themeStorageKey = 'the-isle-skin-code-generator.theme';

    beforeEach(async () => {
        localStorage.removeItem(themeStorageKey);
        await TestBed.configureTestingModule({
            imports: [App],
        }).compileComponents();

        fixture = TestBed.createComponent(App);
        component = fixture.componentInstance;
    });

    it('should default to dark mode', () => {
        expect(component.theme()).toBe('dark');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('light-mode')).toBe(false);
    });

    it('should toggle between light and dark modes', () => {
        component.toggleTheme();
        fixture.detectChanges();
        expect(component.theme()).toBe('light');
        expect(fixture.nativeElement.classList.contains('light-mode')).toBe(true);
        expect(localStorage.getItem(themeStorageKey)).toBe('light');

        component.toggleTheme();
        fixture.detectChanges();
        expect(component.theme()).toBe('dark');
        expect(fixture.nativeElement.classList.contains('light-mode')).toBe(false);
        expect(localStorage.getItem(themeStorageKey)).toBe('dark');
    });

    it('should restore the saved theme on startup', () => {
        localStorage.setItem(themeStorageKey, 'light');

        fixture = TestBed.createComponent(App);
        component = fixture.componentInstance;

        expect(component.theme()).toBe('light');
    });
});
