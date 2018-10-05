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
        Client-side Sorting
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/sorting/sorting-default.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :rows="rows"
        :columnMode="'force'"
        :headerHeight="50"
        :footerHeight="50"
        :rowHeight="50"
        :scrollbarV="true"
        :sorts="[{prop: 'name', dir: 'desc'}]">

        <ngx-datatable-column name="Company">
          <!-- <template slot-scope="scope" v-if="scope.row">
            {{ scope.row.company }}
          </template> -->
        </ngx-datatable-column>

        <ngx-datatable-column name="Name" :sortable="true">
        </ngx-datatable-column>

        <ngx-datatable-column name="Gender">
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export default class DefaultSortingComponent extends Vue {

  rows = [];

  created() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };

    req.send();
  }

}
