import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';

@Component({
  name: 'footer-demo',
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        Custom Footer
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/footer.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :rows="rows"
        :columns="columns"
        columnMode="force"
        :footerHeight="100"
        :headerHeight="50"
        rowHeight="auto">
        <!-- Footer Template -->
        <template v-slot:footer="scope">
          <div style="padding: 5px 10px">
            <div>
              <strong>Summary</strong>: Gender: Female
            </div>
            <hr style="width:100%" />
            <div>
              Rows: {{scope.rowCount}} |
              Size: {{scope.pageSize}} |
              Current: {{scope.curPage}} |
              Offset: {{scope.offset}}
            </div>
          </div>
        </template>
      </ngx-datatable>
    </div>
  `
})
export default class FooterDemoComponent extends Vue {

  rows = [];

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  created() {
    this.fetch((data) => {
      this.rows = data.splice(0, 5);
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
