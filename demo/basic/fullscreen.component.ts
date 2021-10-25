import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';
import { TableColumn } from 'types/table-column.type';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
    'vue-datatable-column': DataTableColumnComponent,
  },
  template: `
    <div>
      <h3>
        Full Screen
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/fullscreen.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material fullscreen"
        style="top: 52px"
        :columns="columns"
        columnMode="standard"
        :headerHeight="50"
        :footerHeight="50"
        :rowHeight="50"
        :rowIdentity="rowIdentity"
        :scrollbarV="true"
        :scrollbarH="true"
        :rows="rows"
        @rendered="onRendered"
        >
        <!-- <vue-datatable-column name="Id" :width="80"></vue-datatable-column>
        <vue-datatable-column name="Name" :width="300">
          <span slot="header"><strong>FullName</strong></span> -->
          <!-- <template slot-scope="scope" v-if="scope.row">
            <span style="margin-left: 10px"><i>{{ scope.row.name }}</i></span>
          </template> -->
        <!-- </vue-datatable-column>
        <vue-datatable-column name="Gender"></vue-datatable-column>
        <vue-datatable-column name="Age"></vue-datatable-column>
        <vue-datatable-column name="City" :width="300" prop="address.city"></vue-datatable-column>
        <vue-datatable-column name="State" :width="300" prop="address.state"></vue-datatable-column> -->
      </ngx-datatable>
    </div>
  `
})
export class FullScreenComponent extends Vue {
  rows: Array<Record<string, unknown>> = [];
  columns: TableColumn[] = [];
  //   {
  //     name: 'Id',
  //     width: 80,
  //   },
  //   {
  //     name: 'Name',
  //     width: 300,
  //   },
  //   {
  //     name: 'Gender',
  //     // width: 150,
  //   },
  //   {
  //     name: 'Age',
  //     width: 150,
  //   },
  //   {
  //     name: 'City',
  //     width: 300,
  //     prop: 'address.city',
  //   },
  //   {
  //     name: 'State',
  //     width: 300,
  //     prop: 'address.state',
  //   },
  // ];
  created() {
    this.fetch((data: { cols: Array<string>, data: Array<Record<string, unknown>> }) => {
      data.cols.forEach(col => {
        this.columns.push({ name: col, prop: col });
      });
      this.rows = data.data;
    });
  }

  fetch(cb: (data: { cols: Array<string>, data: Array<Record<string, unknown>> }) => void) {
    const req = new XMLHttpRequest();
    // req.open('GET', `assets/data/100k.json`);
    req.open('GET', `assets/data/columns20.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onRendered() {
    //
  }

  rowIdentity(row: { Id: string | number }): number | string {
    if (!row) {
      return null;
    }
    return row.Id;
  }
}
