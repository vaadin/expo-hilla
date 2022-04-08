import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/split-layout';
import '@vaadin/grid/vaadin-grid-sort-column.js';
import '@vaadin/text-field';
import '@vaadin/email-field';
import '@vaadin/date-picker';
import { GridActiveItemChangedEvent } from '@vaadin/grid';
import { html } from 'lit';
import { View } from './view';
import Person from 'Frontend/generated/com/example/application/data/entity/Person';
import { CrudEndpoint } from 'Frontend/generated/endpoints';
import { customElement, state } from 'lit/decorators.js';
import { Binder, field } from '@hilla/form';
import PersonModel from 'Frontend/generated/com/example/application/data/entity/PersonModel';

@customElement('crud-view')
export class CrudView extends View {
  @state() people: Person[] = [];
  @state() selected?: Person;
  binder = new Binder(this, PersonModel);

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add('h-full', 'w-full');
    this.people = await CrudEndpoint.findAll();
  }

  render() {
    const { model } = this.binder;

    return html`
      <vaadin-split-layout class="h-full w-full">
        <vaadin-grid
          class="h-full"
          .items=${this.people}
          .selectedItems=${[this.selected]}
          @active-item-changed=${this.activeItemChanged}
          style="width: 65%;"
        >
          <vaadin-grid-sort-column path="firstName" auto-width></vaadin-grid-sort-column>
          <vaadin-grid-sort-column path="lastName" auto-width></vaadin-grid-sort-column>
          <vaadin-grid-sort-column path="email" auto-width></vaadin-grid-sort-column>
          <vaadin-grid-sort-column path="dateOfBirth" auto-width></vaadin-grid-sort-column>
          <vaadin-grid-sort-column path="country" auto-width></vaadin-grid-sort-column>
        </vaadin-grid>

        <div class="flex flex-col gap-s p-m" style="width: 35%;">
          <vaadin-text-field label="First name" ${field(model.firstName)}></vaadin-text-field>
          <vaadin-text-field label="Last name" ${field(model.lastName)}></vaadin-text-field>
          <vaadin-email-field label="Email" ${field(model.email)}></vaadin-email-field>
          <vaadin-date-picker label="Date of birth" ${field(model.dateOfBirth)}></vaadin-date-picker>
          <vaadin-text-field label="Country" ${field(model.country)}></vaadin-text-field>

          <div class="flex gap-m">
            <vaadin-button theme="primary" @click=${this.save}>Save</vaadin-button>
            <vaadin-button theme="tertiary" @click=${this.cancelEdit}>Cancel</vaadin-button>
          </div>
        </div>
      </vaadin-split-layout>
    `;
  }

  async save() {
    const saved = await this.binder.submitTo(CrudEndpoint.save);
    if (saved) {
      this.people = this.people.map((p) => (p.id === saved.id ? saved : p));
    }
  }

  cancelEdit() {
    this.selected = undefined;
    this.binder.clear();
  }

  activeItemChanged(e: GridActiveItemChangedEvent<Person>) {
    this.selected = e.detail.value;
    if (this.selected) {
      this.binder.read(this.selected);
    }
  }
}
