import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <!-- <style>
    .icon {
      position:absolute;
    }
    .datatable-icon-down {
      top: 0px;
    }
    .datatable-icon-up {
      top: 40px;
    }
    .dragFromLeft .icon {
      left:-13px;
    }
    </style> -->
    <div>
      <h3>
        Reorder Column
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/columns/column-reorder.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :rows="rows"
        :loadingIndicator="loadingIndicator"
        :columns="columns"
        :columnMode="'force'"
        :headerHeight="50"
        :footerHeight="50"
        :rowHeight="'auto'"
        :reorderable="reorderable"
        :swapColumns="swapColumns">
      </ngx-datatable>
      <!-- <ng-template #targetMarkerTemplate let-class="class">
        <div [ngClass]="class">
          <div class="icon datatable-icon-down"></div>
          <div class="icon datatable-icon-up"></div>
        </div>
      </ng-template> -->
    </div>
  `
})
export default class ColumnReorderComponent extends Vue {

  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  swapColumns: boolean = false;

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company', sortable: false }
  ];

  created() {
    this.fetch((data) => {
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
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
