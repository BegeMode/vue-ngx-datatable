import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        Fluid Row Heights 
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/basic-auto.component.ts" target="_blank">
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
        :resizeable="true"
        :reorderable="reorderable">
      </ngx-datatable>
    </div>
  `
})
export default class BasicAutoComponent extends Vue {

  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = false;

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
