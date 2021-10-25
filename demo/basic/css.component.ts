import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';

@Component({
  name: 'row-css-demo',
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  template: `
    <div>
      <h3>
        Row/Header/Cell CSS Class Demo
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/css.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class='material'
        :rows='rows'
        columnMode="force"
        :headerHeight="50"
        :rowHeight="50"
        :rowClass="getRowClass"
        :scrollbarV="true">
        <ngx-datatable-column name="Name"></ngx-datatable-column>
        <ngx-datatable-column name="Gender" headerClass="is-gender" :cellClass="getCellClass"></ngx-datatable-column>
        <ngx-datatable-column name="Age"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export default class RowCssComponent extends Vue {

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
      const rows = JSON.parse(req.response);
      cb(rows.splice(0, 50));
    };

    req.send();
  }

  getRowClass(row: { age: number }) {
    return {
      'age-is-ten': (row.age % 10) === 0
    };
  }

  getCellClass({ row, column, value }: { row: Record<string, unknown>; column: unknown; value: string }): Record<string, unknown> {
    return {
      'is-female': value === 'female'
    };
  }

}
