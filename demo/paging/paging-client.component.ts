import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        Client-side Paging
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/paging/paging-client.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <div style="height:100%;">
      <ngx-datatable
        class="material ngx-flex"
        :rows="rows"
        :columns="[{name:'Name'},{name:'Gender'},{name:'Company'}]"
        columnMode="force"
        :headerHeight="50"
        :footerHeight="50"
        rowHeight="auto"
        :limit="30">
      </ngx-datatable>
      </div>
    </div>
  `
})
export default class ClientPagingComponent extends Vue {

  rows: Array<Record<string, unknown>> = [];
  page = 2;

  created() {
    this.fetch((data: Array<Record<string, unknown>>) => {
      this.rows = data;
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

}
