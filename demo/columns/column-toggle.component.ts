import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
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
        Column Toggling
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/columns/column-toggle.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <div style='float:left;width:75%'>
        <ngx-datatable
          class='material'
          :rows='rows'
          :columnMode="'force'"
          :headerHeight="50"
          :footerHeight="50"
          :rowHeight="'auto'">
          <ngx-datatable-column v-for="col of columns" :key="col.name" :name="col.name" :visible="col.visible">
          </ngx-datatable-column>
        </ngx-datatable>
      </div>
      <div class='selected-column'>
        <h4>Available Columns</h4>
        <ul>
          <li v-for='col of allColumns' :key="col.name">
            <input
              type='checkbox'
              :id="col.name"
              @click='toggle(col)'
              :checked='isChecked(col)'
            />
            <label :attr.for="col.name">{{col.name}}</label>
          </li>
        </ul>
      </div>
    </div>
  `
})
export default class ColumnToggleComponent extends Vue {

  rows = [
    {
      name: 'Claudine Neal',
      gender: 'female',
      company: 'Sealoud'
    },
    {
      name: 'Beryl Rice',
      gender: 'female',
      company: 'Velity'
    }
  ];

  // columns = [
  //   { name: 'Name' },
  //   { name: 'Gender' },
  //   { name: 'Company' }
  // ];

  allColumns = [
    { name: 'Name', visible: true },
    { name: 'Gender', visible: true },
    { name: 'Company', visible: false }
  ];

  get columns() {
    return this.allColumns; // .filter(c => c.visible);
  }

  toggle(col) {
    col.visible = !col.visible;
    // this.columns = this.allColumns.filter(c => c.visible);
    // this.$nextTick(() => this.columns = this.allColumns.filter(c => c.visible));
    // const isChecked = this.isChecked(col);

    // if(isChecked) {
    //   this.columns = this.columns.filter(c => { 
    //     return c.name !== col.name; 
    //   });
    // } else {
    //   this.columns = [...this.columns, col];
    // }
  }

  isChecked(col) {
    return col.visible;
    // return this.columns.find(c => {
    //   return c.name === col.name;
    // });
  }

}
