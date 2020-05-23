import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        Cell Selection
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/selection/selection-cell.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material selection-cell"
        :rows="rows"
        columnMode="force"
        :columns="columns"
        :headerHeight="50"
        :footerHeight="50"
        :rowHeight="50"
        :selected="selected"
        :scrollbarV="true"
        selectionType="cell"
        @select="onSelect($event)"
        @activate="onActivate($event)">
      </ngx-datatable>
    </div>
  `
})
export default class CellSelectionComponent extends Vue {

  rows: any[] = [];
  selected: any[] = [];
  columns: any[] = [
    { prop: 'name'} , 
    { name: 'Company' }, 
    { name: 'Gender' }
  ];

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

  onFocus(event) {
    console.log('foooccuuuss', event);
  }

  onSelect(event) {
    console.log('Event: select', event, this.selected);
  }

  onActivate(event) {
    console.log('Event: activate', event);
  }

}
