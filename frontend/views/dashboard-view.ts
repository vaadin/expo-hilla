import OrderInfo from 'Frontend/generated/com/example/application/data/service/dashboard/OrderInfo';
import Metric from 'Frontend/generated/com/example/application/data/service/dashboard/Metric';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from './view';
import { dashboardViewStore } from '../stores/dashboard-view-store';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/select';
import '@vaadin/charts';
import '@vaadin/charts/src/vaadin-chart-series';

import { DashboardEndpoint } from 'Frontend/generated/endpoints';

@customElement('dashboard-view')
export class DashboardView extends View {

  //private metrics: Metric[] = [];

  private orderInfo: OrderInfo[] = [];

  years = [{ label: '2023' }, { label: '2022' }, { label: '2021' }, { label: '2020' }];
  monthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'flex-col', 'gap-m');

    //DashboardEndpoint.getMetrics().onNext((metrics) => (this.metrics = metrics ?? []));
    this.orderInfo = await DashboardEndpoint.getOrderInfo();
  }

  render() {
    return html`
      <div class="flex justify-between flex-wrap">
        ${dashboardViewStore.metrics.map(
      (metric) => html`
            <div class="flex flex-col items-start gap-s p-m" style="width: 120px;">
              <h2 class="font-normal m-0 text-secondary text-xs">${metric.name}</h2>
              <span class="font-semibold text-3xl">
                ${metric.value.toLocaleString('en-US', {
        maximumFractionDigits: metric.fractionDigits,
      })}${metric.unit}
              </span>
              <span theme="badge ${metric.change > 0 ? 'success' : 'error'}">
                <vaadin-icon
                  class="box-border p-xs"
                  icon=${metric.change > 0 ? 'vaadin:arrow-up' : 'vaadin:arrow-down'}></vaadin-icon>
                <span>${metric.change.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
              </span>
            </div>
          `
    )}
      </div>
      <div>
        <div class="flex justify-between p-m">
          <div>
            <h2 class="text-xl m-0">Orders</h2>
            <span class="text-secondary text-xs">Cumulative (city/month)</span>
          </div>
          <vaadin-select .items=${this.years} value="2023"></vaadin-select>
        </div>
        ${this.orderInfo &&
      html`
          <vaadin-chart .categories=${this.monthNames} type="area">
            ${this.orderInfo.map(
        (orderInfo) => html`
                <vaadin-chart-series .title=${orderInfo.city}></vaadin-chart-series>
              `
      )}
          </vaadin-chart>
        `}
      </div>
    `;
  }
}
