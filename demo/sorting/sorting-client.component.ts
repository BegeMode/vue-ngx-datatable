import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        Client-side Sorting
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/sorting/sorting-client.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :rows="rows"
        :columns="columns"
        :sortType="'multi'"
        :columnMode="'force'"
        :headerHeight="50"
        :footerHeight="50"
        :rowHeight="50"
        :scrollbarV="true"
        :goToFirstAfterSort="false">
      </ngx-datatable>
    </div>
  `
})
export default class ClientSortingComponent extends Vue {

  rows: Array<Record<string, unknown>> = [];

  columns = [
    { name: 'Company' },
    { name: 'Name' },
    { name: 'Gender' }
  ];

  created() {
    this.fetch((data: Array<Record<string, unknown>>) => {
      this.rows = data;
    });
  }

  fetch(cb: (data: Array<Record<string, unknown>>) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };

    req.send();
  }

}
