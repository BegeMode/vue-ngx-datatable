import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        Custom Sorting Comparator
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/sorting/sorting-comparator.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :rows="rows"
        :columns="columns"
        :columnMode="'force'"
        :headerHeight="50"
        :footerHeight="50"
        :rowHeight="'auto'">
      </ngx-datatable>
    </div>
  `
})
export default class SortingComparatorComponent extends Vue {

  rows: Array<Record<string, unknown>> = [];

  columns = [
    { name: 'Company', comparator: this.companyComparator.bind(this) },
    { name: 'Name', sortable: false },
    { name: 'Gender', sortable: false }
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
      cb(data.splice(0, 20));
    };

    req.send();
  }

  companyComparator(propA: string, propB: string) {
    console.log('Sorting Comparator', propA, propB);

    // Just a simple sort function comparisoins
    if (propA.toLowerCase() < propB.toLowerCase()) return -1;
    if (propA.toLowerCase() > propB.toLowerCase()) return 1;
  }

}
