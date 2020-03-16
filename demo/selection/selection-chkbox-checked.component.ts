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
        Checkbox Selection with "check is no select" mode
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/selection/selection-chkbox.component.ts" target="_blank">
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
          columnMode="force"
          :headerHeight="50"
          :footerHeight="50"
          rowHeight="auto"
          :limit="5"
          :selected="selected"
          :checked="checked"
          selectionType="single"
          checkMode="checkNoSelect"
          :selectAllRowsOnPage="true"
          :displayCheck="displayCheck"
          @activate="onActivate($event)"
          @select='onSelect($event)'
          @check='onCheck($event)'>
          <ngx-datatable-column
            :width="30"
            :sortable="false"
            :canAutoResize="false"
            :draggable="false"
            :resizeable="false"
            :headerCheckboxable="true"
            :checkboxable="true">
          </ngx-datatable-column>
          <ngx-datatable-column name="Name"></ngx-datatable-column>
          <ngx-datatable-column name="Gender"></ngx-datatable-column>
          <ngx-datatable-column name="Company"></ngx-datatable-column>
        </ngx-datatable>
      </div>

      <div class='selected-column'>
        <h4>Selections <small>({{ selected ? selected.length: 0 }})</small></h4>
        <ul>
          <li v-for='sel of selected'>
            {{sel.name}}
          </li>
          <li v-if="!selected || !selected.length">No Selections</li>
        </ul>
      </div>
      <div class='selected-column'>
        <h4>Checked rows <small>({{ checked ? checked.length: 0 }})</small></h4>
        <ul>
          <li v-for='check of checked'>
            {{check.name}}
          </li>
          <li v-if="!checked || !checked.length">No checked rows</li>
        </ul>
      </div>
    </div>
  `
})
export default class CheckNoSelectionComponent extends Vue {

  rows = [];
  selected = [];
  checked = [];

  created() {
    this.fetch((data) => {
      this.rows = data;
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

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onCheck({ checked }) {
    console.log('Check Event', checked, this.checked);

    this.checked.splice(0, this.checked.length);
    this.checked.push(...checked);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [ this.rows[1], this.rows[3] ];
  }

  remove() {
    this.selected = [];
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }
}
