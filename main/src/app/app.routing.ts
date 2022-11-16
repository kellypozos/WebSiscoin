import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { GeneratePdfComponent } from './generate-pdf/generate-pdf.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RecomendacionesEstadisticasComponent } from './recomendaciones-estadisticas/recomendaciones-estadisticas.component';
import { AnalisisVentaComponent } from './analisis-venta/analisis-venta.component';
import { AgregarProductoComponent } from './apps/agregar-producto/agregar-producto.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { EditarEmpresa2Component } from './editar-empresa2/editar-empresa2.component';
import { HistorialVentasComponent } from './historial-ventas/historial-ventas.component';
import { VigilanteGuard } from './vigilante.guard';
import { InventarioComponent } from './inventario/inventario.component';




export const AppRoutes: Routes = [
    {

        path: '',
        component: FullComponent,


        children: [
            {
                path: '',
                redirectTo: '/authentication/login',
                pathMatch: 'full',

            },

            {

                path: 'dashboard',
                redirectTo: '/dashboards/dashboard1',
                pathMatch: 'full',
                canActivate:[VigilanteGuard]

            },
            {

                path: 'dashboard2',
                redirectTo: '/dashboards/dashboard2',
                pathMatch: 'full',
                canActivate:[VigilanteGuard]


            },

            {
                path: 'dashboards',
                loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule),
                canActivate:[VigilanteGuard]
            },
            {
                path: 'material',
                loadChildren: () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
            },
            {
                path: 'apps',
                loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
            },
            {
                path: 'forms',
                loadChildren: () => import('./forms/forms.module').then(m => m.FormModule)
            },
            {
                path: 'tables',
                loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
            },

            {
                path: 'generate-pdf', component: GeneratePdfComponent,
                data: {
                    title: 'Pronóstico',
                    urls: [
                        { title: 'Dashboard', url: '/dashboard' },
                        { title: 'Pronóstico' }
                    ]
                },
                canActivate:[VigilanteGuard]
            },

            {
                path: 'historial-ventas', component: HistorialVentasComponent,
                data: {
                    title: 'Historial de ventas',
                    urls: [
                        { title: 'Dashboard', url: '/dashboard' },
                        { title: 'Historial de ventas' }
                    ]
                },
                canActivate:[VigilanteGuard]
            },
            {
                path: 'empresa', component: EmpresaComponent,
                data: {
                    title: 'Empresa',
                    urls: [
                        { title: 'Dashboard', url: '/dashboard' },
                        { title: 'Empresa' }
                    ]
                },
                canActivate:[VigilanteGuard]
            },
            {
                path: 'inventario', component: InventarioComponent,
                data: {
                    title: 'Inventario',
                    urls: [
                        { title: 'Dashboard', url: '/dashboard' },
                        { title: 'Inventario' }
                    ]
                },
                canActivate:[VigilanteGuard]
            },
            {
                path: 'editar-empresa2', component: EditarEmpresa2Component,
                data: {
                    title: 'Editar Empresa',
                    urls: [
                        { title: 'Dashboard', url: '/dashboard' },
                        { title: 'Editar Empresa' }
                    ]
                },
                canActivate:[VigilanteGuard]
            },

            {
                path: 'editar-perfil', component: EditarPerfilComponent,
                data: {
                    title: 'Editar Perfil',
                    urls: [
                        { title: 'Dashboard', url: '/dashboard' },
                        { title: 'Editar Perfil' }
                    ]
                }, canActivate:[VigilanteGuard]
            },

            {
                path: 'analisis-venta', component: AnalisisVentaComponent,
                data: {
                    title: 'Análisis de ventas',
                    urls: [
                        { title: 'Dashboard', url: '/dashboard' },
                        { title: 'Análisis de ventas' }
                    ]
                }, canActivate:[VigilanteGuard]
            },


            {
                path: 'recomendaciones-estadisticas', component: RecomendacionesEstadisticasComponent,
                data: {
                    title: 'Recomendaciones estadísticas',
                    urls: [
                        { title: 'Dashboard', url: '/dashboard' },
                        { title: 'Recomendaciones estadísticas' }
                    ]
                }, canActivate:[VigilanteGuard]
            },

            {
                path: 'perfil', component: PerfilComponent,
                data: {
                    title: 'Perfil',
                    urls: [
                        { title: 'Dashboard', url: '/dashboard' },
                        { title: 'Perfil' }
                    ]
                },  canActivate:[VigilanteGuard]
            },


            {
                path: 'tree',
                loadChildren: () => import('./tree/tree.module').then(m => m.TreeModule)
            },
            {
                path: 'datatables',
                loadChildren: () => import('./datatables/datatables.module').then(m => m.DataTablesModule)
            },
            {
                path: 'pages',
                loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
            },
            {
                path: 'widgets',
                loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
            },
            {
                path: 'charts',
                loadChildren: () => import('./charts/chartslib.module').then(m => m.ChartslibModule)
            },
            {
                path: 'multi',
                loadChildren: () => import('./multi-dropdown/multi-dd.module').then(m => m.MultiModule)
            }
        ]
    },
    {
        path: '',
        component: AppBlankComponent,
        children: [
            {
                path: 'authentication',
                loadChildren:
                    () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'authentication/404'
    }
];
