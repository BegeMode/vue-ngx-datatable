import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        Selection Callback to Disable Selections
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/selection/selection-disabled.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <div style='float:left;width:75%'>
        <ngx-datatable
          class="material"
          :rows="rows"
          :columnMode="'force'"
          :columns="columns"
          :headerHeight="50"
          :footerHeight="50"
          :rowHeight="'auto'"
          :limit="5"
          :selectCheck="checkSelectable"
          :selected="selected"
          :selectionType="'multi'"
          @activate="onActivate($event)"
          @select='onSelect($event)'>
        </ngx-datatable>
      </div>

      <div class='selected-column'>
        <h4>Selections</h4>
        <ul>
          <li v-for='sel of selected'>
            {{sel.name}}
          </li>
          <li v-if="!selected.length">No Selections</li>
        </ul>
      </div>
    </div>
  `
})
export default class MultiDisableSelectionComponent extends Vue {

  rows = [];

  selected = [];

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

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  checkSelectable(event) {
    console.log('Checking if selectable', event);
    return event.name !== 'Ethel Price';
  }

}
