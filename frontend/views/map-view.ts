import * as L from 'leaflet';
import { customElement } from 'lit/decorators.js';
import { View } from '../views/view';

const openStreetMapLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const openStreetMapAttribution = `&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors`;

@customElement('map-view')
export class MapView extends View {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add('block', 'h-full', 'w-full');
  }

  firstUpdated() {
    const map = L.map(this);
    map.setView([38, -100], 4);

    const tileLayer = L.tileLayer(openStreetMapLayer, { attribution: openStreetMapAttribution, maxZoom: 13 });
    tileLayer.addTo(map);

    L.marker([33.75, -84.38]).addTo(map);
  }
}
