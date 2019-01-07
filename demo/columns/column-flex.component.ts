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
        Flex Column Width Distribution
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/columns/column-flex.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :columnMode="'flex'"
        :headerHeight="50"
        :footerHeight="50"
        :rowHeight="'auto'"
        :rows="rows">
        <ngx-datatable-column name="Name" :flexGrow="3">
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender" :flexGrow="1">
        </ngx-datatable-column>
        <ngx-datatable-column name="Age" :flexGrow="1">
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export default class ColumnFlexComponent extends Vue {

  rows = [];

  created() {
    this.fetch((data) => {
      this.rows = data.splice(0, 5);
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

}
