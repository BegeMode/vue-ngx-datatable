import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import { TableColumn } from '../../src/types';
import DataTableColumnComponent from '../../src/components/columns/column.component';

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
        :columnMode="'force'"
        :headerHeight="50"
        :footerHeight="0"
        :rowHeight="50"
        :scrollbarV="true"
        :scrollbarH="true"
        :rows="rows"
        @rendered="onRendered">
        <vue-datatable-column name="Id" :width="80"></vue-datatable-column>
        <vue-datatable-column name="Name" :width="300">
          <span slot="header"><strong>FullName</strong></span>
          <!-- <template slot-scope="scope" v-if="scope.row">
            <span style="margin-left: 10px"><i>{{ scope.row.name }}</i></span>
          </template> -->
        </vue-datatable-column>
        <vue-datatable-column name="Gender"></vue-datatable-column>
        <vue-datatable-column name="Age"></vue-datatable-column>
        <vue-datatable-column name="City" :width="300" prop="address.city"></vue-datatable-column>
        <vue-datatable-column name="State" :width="300" prop="address.state"></vue-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class FullScreenComponent extends Vue {
  rows = [];
  columns: TableColumn[] = [
    {
      name: 'Id',
      width: 80,
    },
    {
      name: 'Name',
      width: 300,
    },
    {
      name: 'Gender',
      // width: 150,
    },
    {
      name: 'Age',
      width: 150,
    },
    {
      name: 'City',
      width: 300,
      prop: 'address.city',
    },
    {
      name: 'State',
      width: 300,
      prop: 'address.state',
    },
  ];
  created() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onRendered() {
    //
  }

}
