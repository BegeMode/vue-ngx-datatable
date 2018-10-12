import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  template: `
    <div>
      <h3>
        Horizontal and Vertical Scrolling
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/scrolling.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :rows="rows"
        columnMode="force"
        :headerHeight="50"
        :footerHeight="0"
        :rowHeight="50"
        :scrollbarV="true"
        :scrollbarH="true">
        <ngx-datatable-column name="Name" :width="300"></ngx-datatable-column>
        <ngx-datatable-column name="Gender"></ngx-datatable-column>
        <ngx-datatable-column name="Age"></ngx-datatable-column>
        <ngx-datatable-column name="City" :width="300" prop="address.city"></ngx-datatable-column>
        <ngx-datatable-column name="State" :width="300" prop="address.state"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export default class HorzVertScrolling extends Vue {

  rows = [];

  created() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
