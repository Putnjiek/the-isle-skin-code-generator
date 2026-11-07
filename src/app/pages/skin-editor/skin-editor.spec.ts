import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkinEditor } from './skin-editor';

describe('SkinEditor', () => {
  let component: SkinEditor;
  let fixture: ComponentFixture<SkinEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkinEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(SkinEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
