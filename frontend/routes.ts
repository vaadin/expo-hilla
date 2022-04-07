import { Route } from '@vaadin/router';
import './views/main-layout';
import './views/crud-view';
import './views/sandbox-view';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://hilla.dev/docs/routing)
  {
    path: '',
    component: 'crud-view',
    icon: 'la la-columns',
    title: 'CRUD',
  },
  {
    path: 'dashboards',
    component: 'dashboard-view',
    icon: 'la la-chart-area',
    title: 'Dashboard',
    action: async () => {
      await import('./views/dashboard-view');
    },
  },
  {
    path: 'map',
    component: 'map-view',
    icon: 'la la-map',
    title: 'Map',
    action: async () => {
      await import('./views/map-view');
    },
  },
  {
    path: 'sandbox',
    component: 'sandbox-view',
    icon: 'la la-glasses',
    title: 'Sandbox',
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: [...views],
  },
];
