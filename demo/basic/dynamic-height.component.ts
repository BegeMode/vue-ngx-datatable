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
        Dynamic Height w/ Virtual Scrolling
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/dynamic-height.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class='material'
        :rows='rows'
        :columnMode="'force'"
        :headerHeight="50"
        :footerHeight="50"
        :rowHeight="getRowHeight"
        :scrollbarV="true">
        <ngx-datatable-column name="Name"></ngx-datatable-column>
        <ngx-datatable-column name="Gender"></ngx-datatable-column>
        <ngx-datatable-column name="Row Height" prop="height"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export default class DynamicHeightComponent extends Vue {

  rows: Array<Record<string, unknown>> = [];
  expanded = {};
  timeout: any;

  created() {
    this.fetch((data: Array<Record<string, unknown>>) => {
      this.rows = data;
    });
  }

  fetch(cb: (data: Array<Record<string, unknown>>) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      const rows = JSON.parse(req.response).splice(0, 100);

      for(const row of rows) {
        row.height = Math.floor(Math.random() * 80) + 50;
      }

      cb(rows);
    };

    req.send();
  }

  getRowHeight(row: Record<string, unknown>) {
    if(!row) return 50;
    if(row.height === undefined) return 50;
    return row.height;
  }

}
