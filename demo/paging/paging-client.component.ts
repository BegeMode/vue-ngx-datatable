import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
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
      <ngx-datatable
        class="material"
        :rows="rows"
        :columns="[{name:'Name'},{name:'Gender'},{name:'Company'}]"
        :columnMode="'force'"
        :headerHeight="50"
        :footerHeight="50"
        :pagination="true"
        :rowHeight="'auto'"
        :limit="10">
      </ngx-datatable>
    </div>
  `
})
export default class ClientPagingComponent extends Vue {

  rows = [];

  created() {
    this.fetch((data) => {
      this.rows = data;
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
