import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./donor-layout/donor-layout.component').then(m => m.DonorLayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./donor-list/donor-list.component').then(m => m.DonorListComponent),
                title: 'CNTS - Donneurs'
            },
            {
                path: 'list',
                loadComponent: () => import('./donor-list/donor-list.component').then(m => m.DonorListComponent),
                title: 'CNTS - Donneurs'
            },
            {
                path: 'view/:id',
                loadComponent: () => import('./donor-view/donor-view.component').then(m => m.DonorViewComponent),
                title: 'CNTS - Donneur'
            }
        ]
    },
];
