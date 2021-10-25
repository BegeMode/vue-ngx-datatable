import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  template: `
    <div>
      <h3>
        Custom Checkbox Selection
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/selection/selection-chkbox-template.component.ts" target="_blank">
            Source
          </a>
        </small>
        <small>
          <a href="javascript:void(0)" @click="add()">Add</a> |
          <a href="javascript:void(0)" @click="update()">Update</a> |
          <a href="javascript:void(0)" @click="remove()">Remove</a> 
        </small>
      </h3>
      <div style='float:left;width:75%'>
        <ngx-datatable
          style="width: 90%"
          class="material"
          :rows="rows"
          :columnMode="'force'"
          :headerHeight="50"
          :footerHeight="50"
          :rowHeight="'auto'"
          :limit="5"
          :selected="selected"
          :selectionType="'checkbox'"
          @activate="onActivate($event)"
          @select='onSelect($event)'>
          <ngx-datatable-column :width="30" 
                :sortable="false" 
                :canAutoResize="false" :draggable="false" :resizeable="false">
              <template slot="header">
                <input id="chb" type="checkbox" :checked="allSelected" @change="selectAll"/>
              </template>
              <template slot-scope="scope" v-if="scope.row">
                <input type="checkbox" :checked="isSelected(scope.row)" @change="onCheckboxChange($event, scope.row)"/>
              </template>
          </ngx-datatable-column>
          <ngx-datatable-column name="Name"></ngx-datatable-column>
          <ngx-datatable-column name="Gender"></ngx-datatable-column>
          <ngx-datatable-column name="Company"></ngx-datatable-column>
        </ngx-datatable>
      </div>

      <div class='selected-column'>
        <h4>Selections <small>({{ selected ? selected.length : 0 }})</small></h4>
        <ul>
          <li v-for='sel of selected'>
            {{sel.name}}
          </li>
          <li v-if="!selected || !selected.length">No Selections</li>
        </ul>
      </div>
    </div>
  `
})
export default class CustomCheckboxSelectionComponent extends Vue {

  rows: Array<Record<string, unknown>> = [];
  selected: Array<Record<string, unknown>> = [];
  allSelected = false;

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

  selectAll() {
    this.allSelected = !this.allSelected;
    this.allSelected ? this.selected = [...this.rows] : this.selected = [];
  }

  isSelected(row: Record<string, unknown>) {
    return this.selected.find(r => r === row);
  }

  onCheckboxChange(event: unknown, row: Record<string, unknown>) {
    const found = this.isSelected(row);
    if (!found) {
      this.selected.push(row);
    } else {
      const i = this.selected.findIndex(r => r === row);
      this.selected.splice(i, 1);
    }
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
  }

}
