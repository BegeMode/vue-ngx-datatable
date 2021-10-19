import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';
import './summary-row-simple.component.scss';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  template: `
    <div>
      <h3>Simple Summary Row
        <small>
        <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/summary/summary-row-simple.component.ts">
          Source
        </a>
        </small>
      </h3>
      <div class="controls">
        <div>
          <input
            id="enable-summary"
            type="checkbox"
            :checked="enableSummary"
            @change="enableSummary = !enableSummary">
          <label for="enable-summary">Enable Summary Row</label>
        </div>
        <div>
          <label for="position-select">Position</label>
          <select id="position-select" @change="summaryPosition = $event.target.value">
            <option :value="'top'">Top</option>
            <option :value="'bottom'">Bottom</option>
          </select>
        </div>
      </div>
      <ngx-datatable
        class="material"
        :summaryRow="enableSummary"
        :summaryPosition="summaryPosition"
        :summaryHeight="'auto'"
        :columns="columns"
        :columnMode="'force'"
        :headerHeight="50"
        :rowHeight="'auto'"
        :rows="rows">
      </ngx-datatable>
    </div>
  `,
})

export default class SummaryRowSimpleComponent extends Vue {
  rows: Array<Record<string, unknown>> = [];

  columns = [
    { prop: 'name', summaryFunc: null, },
    { name: 'Gender', summaryFunc: (cells: Array<string>) => this.summaryForGender(cells) },
    { prop: 'age', summaryFunc: (cells: Array<number>) => this.avgAge(cells) },
  ];

  enableSummary = true;
  summaryPosition = 'top';

  created() {
    this.fetch((data: Array<Record<string, unknown>>) => {
      this.rows = data.splice(0, 5);
    });
  }

  fetch(cb: (data: Array<Record<string, unknown>>) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onSummaryStateChange(a: unknown) {
    console.log(a);
  }

  private summaryForGender(cells: string[]) {
    const males = cells.filter(cell => cell === 'male').length;
    const females = cells.filter(cell => cell === 'female').length;

    return `males: ${males}, females: ${females}`;
  }

  private avgAge(cells: number[]): number {
    const filteredCells = cells.filter(cell => !!cell);
    return filteredCells.reduce((sum, cell) => sum += cell, 0) / filteredCells.length;
  }
}
