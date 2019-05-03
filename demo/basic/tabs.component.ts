import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';

@Component({
  name: 'tabs-demo',
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  template: `
    <div>
      <h3>
        Hidden By Default
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/tabs.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>

      <div style="width:75%;margin:0 auto">
        <div>
          <button type="button" @click="tab1=true;tab2=false;tab3=false;">Nothing</button>
          <button type="button" @click="tab2=true;tab1=false;tab3=false;">Hidden</button>
          <button type="button" @click="tab3=true;tab1=false;tab2=false;">v-if</button>
        </div>

        <div v-show="tab1">
          <p>Click a button to toggle table visibilities</p>
        </div>

        <div v-show="tab2">
          <h4>hidden Table</h4>
          <ngx-datatable
            class='material'
            :rows='rows'
            columnMode="force"
            :headerHeight="50"
            :footerHeight="50"
            :rowHeight="50"
            :scrollbarV="true">
            <ngx-datatable-column name="Name" width="200"></ngx-datatable-column>
            <ngx-datatable-column name="Gender" width="300"></ngx-datatable-column>
            <ngx-datatable-column name="Age" width="80"></ngx-datatable-column>
          </ngx-datatable>
        </div>

        <div v-if="tab3">
          <h4>v-if Table</h4>
          <ngx-datatable
            class='material'
            :rows="rows"
            columnMode="force"
            :headerHeight="50"
            :footerHeight="50"
            :rowHeight="50"
            :scrollbarV="true">
            <ngx-datatable-column name="Name" width="200"></ngx-datatable-column>
            <ngx-datatable-column name="Gender" width="300"></ngx-datatable-column>
            <ngx-datatable-column name="Age" width="80"></ngx-datatable-column>
          </ngx-datatable>
        </div>
      </div>

    </div>
  `
})
export default class TabsDemoComponent extends Vue {

  rows = [];

  tab1 = true;
  tab2 = false;
  tab3 = false;

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
