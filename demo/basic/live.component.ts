import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';

@Component({
  name: 'live-data-demo',
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  template: `
    <div>
      <h3>
        Live Data Demo
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/live.component.ts" target="_blank">
            Source
          </a>
        </small>
        <small>
          <a href="javascript:void(0)" @click="start">Start</a> |
          <a href="javascript:void(0)" @click="stop">Stop</a> | 
          <a href="javascript:void(0)" @click="add">Add</a> |
          <a href="javascript:void(0)" @click="remove">Remove</a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :headerHeight="50"
        :limit="5"
        columnMode="force"
        :footerHeight="50"
        rowHeight="auto"
        trackByProp="updated"
        :rows="rows">
        <ngx-datatable-column name="Name"></ngx-datatable-column>
        <ngx-datatable-column name="Gender"></ngx-datatable-column>
        <ngx-datatable-column name="Company"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export default class LiveDataComponent extends Vue {

  count: number = 50;
  rows: any[] = [];
  temp: any[] = [];
  cols: any = [
    'name', 'gender', 'company'
  ];
  id: any;

  created() {
    this.fetch((data) => {
      this.rows = data.map(d => {
        d.updated = Date.now().toString();
        return d;
      });

      this.temp = [...this.rows];
    });

    this.start();
  }

  randomNum(start: number, end: number): number {
    return Math.floor(Math.random() * end) + start;
  }

  start(): void {
    if(this.id) return;

    this.id = setInterval(this.updateRandom.bind(this), 50);
  }

  stop(): void {
    clearInterval(this.id);
    this.id = null;
  }

  add() {
    this.rows.splice(0, 0, this.temp[this.count++]);
  }

  remove() {
    this.rows.splice(0, this.rows.length);
  }

  updateRandom() {
    if (this.rows.length <= 2) {
      return;
    }
    const rowNum = this.randomNum(0, Math.min(5, this.rows.length - 1));
    const cellNum = this.randomNum(0, 3);
    const newRow = this.randomNum(0, this.rows.length - 1);
    const prop = this.cols[cellNum];
    const rows = this.rows;

    if(rows.length && rows[newRow]) {
      const row = rows[rowNum];
      row[prop] = rows[newRow][prop];
      row.updated = Date.now().toString();
    }
    this.rows = [...this.rows];
  }

  fetch(cb: any): void {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
