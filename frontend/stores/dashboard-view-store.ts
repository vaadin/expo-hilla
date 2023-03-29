import {makeAutoObservable, observable, runInAction} from 'mobx';
import Metric from "Frontend/generated/com/example/application/data/service/dashboard/Metric";
import {DashboardEndpoint} from "Frontend/generated/endpoints";

class DashboardViewStore {

    metrics: Metric[] = [];
    constructor() {
        makeAutoObservable(this, {
            metrics: observable.shallow
        },
{ autoBind: true });

        this.initFromServer();
    }

    async initFromServer() {
        const metrics = await DashboardEndpoint.getMetrics();

        runInAction(() => {
            metrics.onNext(value => this.metrics == value);
        });
    }
}

export const dashboardViewStore = new DashboardViewStore();