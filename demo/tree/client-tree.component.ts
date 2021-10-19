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
        treeFromRelation="manager"
        treeToRelation="name"
        :rows="rows"
        @tree-action="onTreeAction($event)">
        <ngx-datatable-column name="Name" :flexGrow="3" :isTreeColumn="true" :sortable="true">
          <template slot-scope="scope" v-if="scope.row">
            {{scope.row.name}}
          </template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender" :flexGrow="1">
        </ngx-datatable-column>
        <ngx-datatable-column name="Age" :flexGrow="1">
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `,
  styles: [
    '.icon {height: 10px; width: 10px; }',
    '.disabled {opacity: 0.5; }'
  ],

})
export default class ClientTreeComponent extends Vue {

  rows: Array<Record<string, unknown>> = [];

  created() {
    this.fetch((data: Array<Record<string, unknown>>) => {
      this.rows = data;
    });
  }

  fetch(cb: (data: Array<Record<string, unknown>>) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company_tree.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onTreeAction(event: any) {
    const index = event.rowIndex;
    const row = event.row;
    if (row.treeStatus === 'collapsed') {
      row.treeStatus = 'expanded';
    } else {
      row.treeStatus = 'collapsed';
    }
    this.rows = [...this.rows];
  }

}
