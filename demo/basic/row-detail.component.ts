import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  name: 'row-details-demo',
  template: `
    <div>
      <h3>
        Row Detail Demo
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/row-detail.component.ts" target="_blank">
            Source
          </a>
        </small>
        <small>
          <a href="javascript:void(0)" @click="expandAllRows">Expand All</a> | 
          <a href="javascript:void(0)" @click="collapseAllRows">Collapse All</a>
        </small>
      </h3>
      <ngx-datatable
        ref="table"
        class="material expandable"
        columnMode="force"
        :headerHeight="50"
        :footerHeight="50"
        :rowHeight="50"
        :scrollbarV="true"
        :rows="rows"
        rowDetailHeight="100"
        @page="onPage($event)"
        @detail-toggle="onDetailToggle($event)">

        <!-- Row Detail Template -->
        <template slot="rowDetail" slot-scope="scope" v-if="scope.row">
          <div style="padding-left:35px;">
            <div><strong>Address</strong></div>
            <div>{{scope.row.address.city}}, {{scope.row.address.state}}</div>
          </div>
        </template>

        <!-- Column Templates -->
         <ngx-datatable-column
          :width="50"
          :resizeable="false"
          :sortable="false"
          :draggable="false"
          :canAutoResize="false">
          <template slot-scope="scope" v-if="scope.row">
            <a
              href="javascript:void(0)"
              :class="{'datatable-icon-right': !scope.expanded, 'datatable-icon-down': scope.expanded}"
              title="Expand/Collapse Row"
              @click="toggleExpandRow(scope.row)">
            </a>
          </template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Index" width="80">
          <template slot-scope="scope" v-if="scope.row">
            <strong>{{scope.rowIndex}}</strong>
          </template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Expanded" width="80">
          <template slot-scope="scope" v-if="scope.row">
            <strong>{{scope.expanded}}</strong>
          </template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Name" width="200">
          <template slot-scope="scope" v-if="scope.row">
            <strong>{{scope.row.name}}</strong>
          </template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender" width="300">
          <template slot-scope="scope" v-if="scope.row">
            <i v-html="scope.row['name']"></i>&nbsp;and&nbsp;<i>{{scope.row.gender}}</i>
          </template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age" ></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `,
})
export default class RowDetailsComponent extends Vue {

  rows: Array<Record<string, unknown>> = [];
  timeout: any;

  created() {
    this.fetch((data: Array<Record<string, unknown>>) => {
      this.rows = data;
    });
  }

  onPage(event: Record<string, unknown>) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb: (data: Array<Record<string, unknown>>) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row: Record<string, unknown>) {
    console.log('Toggled Expand Row!', row);
    (this.$refs.table as any).toggleExpandDetail(row);
  }

  onDetailToggle(event: Record<string, unknown>) {
    console.log('Detail Toggled', event);
  }

  expandAllRows() {
    (this.$refs.table as any).expandAllDetails();
  }

  collapseAllRows() {
    (this.$refs.table as any).collapseAllDetails();
  }

}
