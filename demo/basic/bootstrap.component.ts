import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';

@Component({
  name: 'basic-bootstrap-theme-demo',
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        Bootstrap Theme
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/bootstrap.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="bootstrap"
        :rows="rows"
        :loadingIndicator="loadingIndicator"
        :columns="columns"
        columnMode="force"
        :headerHeight="50"
        :summaryRow="true"
        summaryPosition="bottom"
        :footerHeight="40"
        :limit="10"
        rowHeight="auto"
        :reorderable="reorderable">
      </ngx-datatable>
    </div>
  `
})
export default class BootstrapThemeComponent extends Vue {

  rows: Array<Record<string, unknown>> = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  columns = [
    { prop: 'name', summaryFunc: (): string => null },
    { name: 'Gender', summaryFunc: (cells: string[]) => this.summaryForGender(cells) },
    { name: 'Company', summaryFunc: (): string => null }
  ];

  created() {
    this.fetch((data: Array<Record<string, unknown>>) => {
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
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

  private summaryForGender(cells: string[]): string {
    const males = cells.filter(cell => cell === 'male').length;
    const females = cells.filter(cell => cell === 'female').length;

    return `males: ${males}, females: ${females}`;
  }

}
