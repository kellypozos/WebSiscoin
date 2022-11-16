import { Injectable } from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}
export interface Saperator {
    name: string;
    type?: string;
}
export interface SubChildren {
    state: string;
    name: string;
    type?: string;
}
export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
    child?: SubChildren[];
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    saperator?: Saperator[];
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        state: '',
        name: 'Análisis',
        type: 'saperator',
        icon: 'av_timer'
    },
    {
        state: 'dashboards',
        name: 'Panel Principal',
        type: 'sub',
        icon: 'av_timer',
        children: [
            { state: 'dashboard1', name: 'Panel Principal', type: 'link' }

        ]
    }, 
    {
        state: 'inventario',
        name: 'Clientes',
        type: 'link',
        icon: 'group'
    },
    {
        state: 'apps',
        name: 'Productos',
        type: 'sub',
        icon: 'bubble_chart',

        children: [
            { state: 'productos', name: 'Productos', type: 'link' }


        ]
    },
    {
        state: 'historial-ventas',
        name: 'Historial de ventas',
        type: 'link',
        icon: 'folder'
    },
   /*  {
        state: 'analisis-venta',
        name: 'Análisis de ventas',
        type: 'link',
        icon: 'show_chart'

    },
     */
    

];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
