import { Routes } from '@angular/router';
import { UnsavedChangesGuard } from '../../services/unsaved-changes.guard';
import { AddressService } from '../../services/address.service';

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
                providers: [AddressService],
                canDeactivate: [UnsavedChangesGuard],
                title: 'CNTS - Vue Donneur'
            },
            {
                path: 'add',
                loadComponent: () => import('./donor-add/donor-add.component').then(m => m.DonorAddComponent),
                providers: [AddressService],
                canDeactivate: [UnsavedChangesGuard],
                title: 'CNTS - Nouveau Donneur'
            }
        ]
    },
];
