import '@vaadin/button';
import '@vaadin/notification';
import { Notification } from '@vaadin/notification';
import '@vaadin/text-field';
import { TextFieldChangeEvent } from '@vaadin/text-field';
import * as HelloWorldEndpoint from 'Frontend/generated/HelloWorldEndpoint';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from './view';

@customElement('sandbox-view')
export class SandboxView extends View {
  @state() name = '';
  @state() greetings: string[] = [];

  render() {
    return html`
      <div class="flex gap-m items-end">
        <vaadin-text-field label="Your name" .value=${this.name} @value-changed=${this.nameChanged}></vaadin-text-field>
        <vaadin-button @click=${this.sayHello}>Say hello</vaadin-button>
      </div>
      ${this.greetings.map((greeting) => html`<p>${greeting}</p>`)}
    `;
  }

  nameChanged(e: TextFieldChangeEvent) {
    this.name = e.target.value;
  }

  async sayHello() {
    const serverResponse = await HelloWorldEndpoint.sayHello(this.name);
    this.greetings = [...this.greetings, serverResponse];
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'flex-col', 'p-m', 'gap-m', 'items-start');
  }
}
