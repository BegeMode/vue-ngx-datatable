import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';

@Component({
  name: 'multiple-tables-demo',
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        Multiple Tables
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/multiple.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :rows="rows1"
        :columns="columns1"
        columnMode="force"
        :headerHeight="50"
        :footerHeight="0"
        :rowHeight="100">
      </ngx-datatable>
      <br />
      <ngx-datatable
        class="material"
        :rows="rows2"
        :columns="columns2"
        :headerHeight="50"
        :footerHeight="50"
        rowHeight="auto">
      </ngx-datatable>
    </div>
  `
})
export default class MultipleTablesComponent extends Vue {

  columns1 = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  columns2 = [
    { prop: 'name', name: 'Name' },
    { name: 'Gender' }
  ];

  rows1 = [
    { name: 'Larry', gender: 'Male', company: 'Cisco' },
    { name: 'Lauren', gender: 'Female', company: 'HP' }
  ];

  rows2 = [
    { name: 'Callie', gender: 'Female' },
    { name: 'Maggie', gender: 'Female' }
  ];

}
