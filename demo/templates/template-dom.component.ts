import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';

@Component({
  name: 'inline-templates-demo',
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  template: `
    <div>
      <h3>
        Expressive Templates
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/templates/template-dom.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :rows="rows"
        columnMode="force"
        :headerHeight="50"
        :footerHeight="50"
        :limit="5"
        rowHeight="auto"
      >
        <ngx-datatable-column name="Name">
          <template v-slot:header="scope">
            <span>Holla! {{scope.column.name}}</span>
          </template>
          <template v-slot:headerAppend="scope">
            <button>+</button>
          </template>
          <template v-slot:default="scope">
            <span v-if="scope.row">Hi: <strong>{{scope.row.name}}</strong></span>
          </template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender">
          <template v-slot:header="scope">
            <span>{{scope.column.name}}</span>
          </template>
          <template v-slot:default="scope">
            <div v-if="scope.row">My name is: <i v-html="scope.row.name"></i> and <i>{{scope.row.gender}}</i>
              <br>
              <div>{{joke}}</div>
            </div>
          </template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age">
          <template v-slot:default="scope">
            <div v-if="scope.row" style="width:100%;height:40px;border:solid 1px #ddd;margin:5px;padding:3px">
              <div style="background:#999;height:10px" :style="{'width': scope.row.age + '%'}"></div>
              <span>{{scope.row.age}}</span>
            </div>
          </template>
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export default class InlineTemplatesComponent extends Vue {

  rows: Array<Record<string, unknown>> = [];
  joke = 'knock knock';

  created() {
    this.fetch((data: Array<Record<string, unknown>>) => {
      this.rows = data.splice(0, 30);
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
