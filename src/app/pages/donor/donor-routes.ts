import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./donor-list/donor-list.component').then(m => m.DonorListComponent),
    },
    {
        path: 'view/:id',
        loadComponent: () => import('./donor-view/donor-view.component').then(m => m.DonorViewComponent),
    }
];
