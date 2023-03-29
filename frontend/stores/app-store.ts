import { RouterLocation } from '@vaadin/router';
import { DashboardViewStore } from "Frontend/stores/dashboard-view-store";
import { makeAutoObservable } from 'mobx';

export class AppStore {
  applicationName = 'Hilla Cool!';

  // The location, relative to the base path, e.g. "hello" when viewing "/hello"
  location = '';

  currentViewTitle = '';

  constructor() {
    makeAutoObservable(this);
    dashboardViewStore = new DashboardViewStore();
  }

  setLocation(location: RouterLocation) {
    const serverSideRoute = location.route?.path == '(.*)';
    if (location.route && !serverSideRoute) {
      this.location = location.route.path;
    } else if (location.pathname.startsWith(location.baseUrl)) {
      this.location = location.pathname.substr(location.baseUrl.length);
    } else {
      this.location = location.pathname;
    }
    if (serverSideRoute) {
      this.currentViewTitle = document.title; // Title set by server
    } else {
      this.currentViewTitle = (location?.route as any)?.title || '';
    }
  }
}
export const appStore = new AppStore();
export const dashboardViewStore = appStore.;
