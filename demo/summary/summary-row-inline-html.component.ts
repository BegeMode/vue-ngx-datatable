import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';
import './summary-row-inline-html.component.scss';

@Component({
  name: 'summary-row-inline-html',
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  template: `
    <div>
      <h3>Inline HTML template
        <small>
        <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/summary/summary-row-inline-html.component.ts">
          Source
        </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :summaryRow="enableSummary"
        :summaryPosition="summaryPosition"
        summaryHeight="auto"
        columnMode="force"
        :headerHeight="50"
        rowHeight="auto"
        :rows="rows">
        <ngx-datatable-column prop="name">
          <template v-slot:summary="scope">
            <div class="name-container">
              <div class="chip" v-for="name of names">
                <span class="chip-content">{{ name }}</span>
              </div>
            </div>
          </template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender" :summaryFunc="summaryForGender"></ngx-datatable-column>
        <ngx-datatable-column prop="age" :summaryFunc="avgAge"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `,
})

export default class SummaryRowInlineHtmlComponent extends Vue {
  rows = [];

  enableSummary = true;
  summaryPosition = 'top';

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

  get names(): string[] {
    return this.rows
      .map(row => row['name'])
      .map(fullName => fullName.split(' ')[1]);
  }

  summaryForGender(cells: string[]) {
    const males = cells.filter(cell => cell === 'male').length;
    const females = cells.filter(cell => cell === 'female').length;

    return `males: ${males}, females: ${females}`;
  }

  avgAge(cells: number[]): number {
    const filteredCells = cells.filter(cell => !!cell);
    return filteredCells.reduce((sum, cell) => sum += cell, 0) / filteredCells.length;
  }
}
