import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        Single Row Selection
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/selection/selection-single.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <div style='float:left;width:75%'>
        <div class="info">
          <p>This demonstrates a simple single selection table with the 3rd row selected by default.</p>
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
          :rowIdentity="rowIdentity"
          :selectionType="'single'"
          tree-from-relation="parentID"
          tree-to-relation="name"
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
export default class SingleSelectionComponent extends Vue {

  // rows = [];
  items = [];

  selected = [];

  columns: any[] = [
    { prop: 'name'} , 
    { name: 'Company' }, 
    { name: 'Gender' }
  ];

  created() {
    let id = 0;
    this.fetch((data) => {
      // this.rows = data;
      // this.selected = [data[2]];
      data.forEach(r => {
        id++;
        r.id = id;
        this.items.push({ id, attributes: { ...r } });
      });
      this.selected = [this.items[2]];
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  rowIdentity(row): number {
    return row.id;
  }

  async onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log('Select Event', selected, this.selected);
    await this.updateRow(selected[0]);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  async updateRow(row: any): Promise<any> {
    let resolveFunc = null;
    const promise = new Promise((resolve) => {
      resolveFunc = resolve;
    });
    setTimeout(() => {
      let newValue = null;
      this.fetch((data) => {
        newValue = data.find(r => r.name === row.name);
        if (newValue) {
          newValue = { id: row.id, attributes: { id: row.id, ...newValue } };
        }
        newValue.attributes.company += '+';
        const item = this.items.find(r => r.id === row.id);
        Object.keys(newValue).forEach(key => {
          if (item[key] && typeof item[key] === 'object') {
            Vue.set(item, key, newValue[key]);
            // Object.assign(item[key], newValue[key]);
          } else {
            item[key] = newValue[key];
          }
        });
        resolveFunc();
      });
    }, 500);
    return promise;
  }

  get rows() {
    const rows = this.items.map(value => value.attributes);
    return rows;
  }

}
