import { Routes } from '@angular/router';
import { SkinEditor } from './pages/skin-editor/skin-editor';

export const routes: Routes = [

    {
        path: "*",
        component: SkinEditor
    },
    {
        path: "",
        component: SkinEditor
    }
];
