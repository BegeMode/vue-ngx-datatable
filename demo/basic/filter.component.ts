import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div style="height:100%;display:flex;flex-direction:column;">
      <h3>
        Client-side Search and Filtering
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/filter.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <input
          type='text'
          style='padding:8px;margin:15px auto;width:30%;'
          placeholder='Type to filter the name column...'
          @keyup='updateFilter($event)'
        />
      <ngx-datatable
          ref="table"
          class="material ngx-flex"
          :columns="columns"
          :columnMode="'force'"
          :headerHeight="50"
          :footerHeight="50"
          :rowHeight="'auto'"
          :limit="10"
          :rows="rows">
      </ngx-datatable>
    </div>
  `
})
export default class FilterBarComponent extends Vue {

  rows: Array<Record<string, string>> = [];

  temp: Array<Record<string, string>> = [];

  columns = [
    { prop: 'name' },
    { name: 'Company' },
    { name: 'Gender' }
  ];
  table: any; // DatatableComponent;

  created() {
    this.fetch((data: Array<Record<string, string>>) => {
      // cache our list
      this.temp = [...data];

      // push our inital complete list
      this.rows = data;
    });
  }

  mounted() {
    this.table = this.$refs.table;
  }

  fetch(cb: (data: Array<Record<string, string>>) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event: KeyboardEvent) {
    const val = (event.target as unknown as { value: string }).value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
