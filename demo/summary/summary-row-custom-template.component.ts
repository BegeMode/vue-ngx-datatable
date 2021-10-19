import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';
import './summary-row-inline-html.component.scss';
import { TableColumn } from 'types/table-column.type';

@Component({
  name: 'summary-row-custom-template-demo',
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  template: `
    <div>
      <h3>Summary Row with Custom Template
        <small>
        <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/summary/summary-row-custom-template.component.ts">
          Source
        </a>
        </small>
      </h3>
     <ngx-datatable
        class="material"
        :summaryRow="true"
        summaryHeight="auto"
        :columns="columns"
        columnMode="force"
        :headerHeight="50"
        rowHeight="auto"
        :rows="rows">
      </ngx-datatable>
      <ng-template #nameSummaryCell let-row="row" let-value="value">
        <div class="name-container">
          <div class="chip" *ngFor="let name of getNames()">
            <span class="chip-content">{{ name }}</span>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: [ './summary-row-custom-template.component.scss' ]
})

export default class SummaryRowCustomTemplateComponent extends Vue {
  rows: Array<Record<string, unknown>> = [];

  // @ViewChild('nameSummaryCell')
  nameSummaryCell: any;

  columns: Array<TableColumn> = [];

  created() {
    this.fetch((data: Array<Record<string, unknown>>) => {
      this.rows = data.splice(0, 5);
    });
  }

  mounted() {
    this.columns = [
      { prop: 'name', summaryFunc: () => null, summaryTemplate: this.nameSummaryCell },
      { name: 'Gender', summaryFunc: (cells: Array<string>) => this.summaryForGender(cells) },
      { prop: 'age', summaryFunc: (cells: Array<number>) => this.avgAge(cells) },
    ];
  }

  fetch(cb: (data: Array<Record<string, unknown>>) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  getNames(): string[] {
    return this.rows
      .map(row => row['name'])
      .map(fullName => (fullName as string).split(' ')[1]);
  }

  private summaryForGender(cells: string[]) {
    const males = cells.filter(cell => cell === 'male').length;
    const females = cells.filter(cell => cell === 'female').length;

    return `males: ${males}, females: ${females}`;
  }

  private avgAge(cells: number[]): string {
    const filteredCells = cells.filter(cell => !!cell);
    return String(filteredCells.reduce((sum, cell) => sum += cell, 0) / filteredCells.length);
  }
}
