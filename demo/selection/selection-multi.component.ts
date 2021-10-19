import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        Multi Select
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/selection/selection-multi.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <div style='float:left;width:75%'>
        <div class="info">
          <p>This demonstrates multi selection table, use CTRL or SHIFT click to select multiple items.</p>
        </div>

        <ngx-datatable
          class="material"
          :rows="rows"
          :columnMode="'force'"
          :columns="columns"
          :headerHeight="50"
          :footerHeight="50"
          :rowHeight="'auto'"
          :limit="5"
          :selected="selected"
          :selectionType="'multi'"
          @activate="onActivate($event)"
          @select='onSelect($event)'>
        </ngx-datatable>
      </div>

      <div class='selected-column'>
        <h4>Selections</h4>
        <ul>
          <li v-for='sel of selected'>
            {{sel.name}}
          </li>
          <li v-if="!selected.length">No Selections</li>
        </ul>
      </div>
    </div>
  `
})
export default class MultiSelectionComponent extends Vue {

  rows: Array<Record<string, unknown>> = [];

  selected: Array<Record<string, unknown>> = [];

  columns: any[] = [
    { prop: 'name'} , 
    { name: 'Company' }, 
    { name: 'Gender' }
  ];

  created() {
    this.fetch((data: Array<Record<string, unknown>>) => {
      this.rows = data;
    });
  }

  fetch(cb: (data: Array<Record<string, unknown>>) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onSelect({ selected }: { selected: Array<Record<string, unknown>> }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event: Record<string, unknown>) {
    console.log('Activate Event', event);
  }

}
