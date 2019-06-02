import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';

@Component({
  name: 'inline-edit-demo',
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  template: `
    <div>
      <h3>
        Inline Editing
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/inline.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :headerHeight="50"
        :limit="5"
        columnMode="force"
        :footerHeight="50"
        rowHeight="auto"
        :rows="rows">
        <ngx-datatable-column name="Name">
          <template v-slot:default="scope">
            <span
              title="Double click to edit"
              @dblclick="dblclick(true, scope.rowIndex, 'name', scope.updateCell)"
              v-if="scope.row && !editing[scope.rowIndex + '-name']">
              {{scope.row.name}}
            </span>
            <input v-else-if="editing[scope.rowIndex+ '-name']"
              autofocus
              @blur="updateValue($event, 'name', scope.rowIndex)"
              type="text"
              :value="scope.row.name"
            />
          </template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender">
          <template v-slot:default="scope">
             <span
              title="Double click to edit"
              @dblclick="dblclick(true, scope.rowIndex, 'gender', scope.updateCell)"
              v-if="scope.row && !editing[scope.rowIndex + '-gender']">
              {{scope.row.gender}}
            </span>
            <select
              v-if="editing[scope.rowIndex + '-gender']"
              @blur="editing[scope.rowIndex + '-gender'] = false"
              @change="updateValue($event, 'gender', scope.rowIndex)"
              :value="scope.row.gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age">
          <template v-slot:default="scope">
            <span v-if="scope.row">{{scope.row.age}}</span>
          </template>
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export default class InlineEditComponent extends Vue {

  editing = {};
  rows = [];

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

  dblclick(edit, rowIndex, prop, update) {
    // this.editing[`${rowIndex}-${prop}`] = edit;
    this.$set(this.editing, `${rowIndex}-${prop}`, edit);
    update();
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

}
