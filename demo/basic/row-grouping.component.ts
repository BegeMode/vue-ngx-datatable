import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';

interface IRow {
  exppayyes: number;
  exppayno: number;
  exppaypending: number;
  source: string;
  name: string;
  gender: string;
  company: string;
  age: number;
  comment: string;
  groupcomment: string;
  startdate: string;
  enddate: string;
  groupstatus: string;
  dt: string;
}

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  name: 'row-grouping-demo',
  template: `
    <div>
      <h3>
        Row Grouping
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/row-grouping.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>

      <div style="margin-left: 50%;">
        <button @click="onExpandAll">Expand all</button>
        <button @click="onCollapseAll">Collapse all</button>
      </div>

      <ngx-datatable
        ref="table"
        class="material expandable"
        :rows="rows"
        :groupRowsBy="groupRowsBy"
        columnMode="force"
        :scrollbarH="true"
        :headerHeight="50"
        :footerHeight="50"
        :rowHeight="40"
        limit="10"
        :groupExpansionDefault="true"
        :groupRowHeight="40"
        @rendered="onRendered"
        @group-toggle="onDetailToggle($event)">

        <!-- Group Header Template -->
        <!-- <template v-slot:groupHeader="scope">
          <b>{{groupTitle(scope.group, scope.groupBy)}}</b>
        </template> -->

        <!-- Row Column Template -->
        <ngx-datatable-column name="Exp. Pay." prop="" :editable="true" :frozenLeft="true">
          <template slot-scope="scope" v-if="scope.row">
            <input 
              type="checkbox" 
              :id="'ep1' + scope.rowIndex" 
              :name="scope.rowIndex" 
              value="0" 
              class="expectedpayment" 
              @change="checkGroup($event, scope.row, scope.rowIndex, scope.group)" 
              :checked="scope.row.exppayyes === 1">
            <label :for="'ep1' + scope.rowIndex"></label>
            <input 
              type="checkbox" 
              :id="'ep2' + scope.rowIndex" 
              :name="scope.rowIndex" 
              value="1" 
              class="expectedpayment2" 
              @change="checkGroup($event, scope.row, scope.rowIndex, scope.group)" 
              :checked="scope.row.exppayno === 1">
            <label :for="'ep2' + scope.rowIndex"></label>
            <input 
              type="checkbox" 
              :id="'ep3' + scope.rowIndex" 
              :name="scope.rowIndex" 
              value="2" 
              class="expectedpayment3" 
              @change="checkGroup($event, scope.row, scope.rowIndex, scope.group)" 
              :checked="scope.row.exppaypending===1">
            <label :for="'ep3' + scope.rowIndex"></label>
          </template>                    
        </ngx-datatable-column>

        <ngx-datatable-column name="Source" prop="source" :editable="false" :sortable="true" :frozenLeft="true">
        </ngx-datatable-column>
        <ngx-datatable-column name="Name" prop="name" :editable="true" :sortable="true"></ngx-datatable-column>
        <ngx-datatable-column name="Gender" prop="gender" :sortable="true"></ngx-datatable-column>
        <ngx-datatable-column name="Age" prop="age" :sortable="true"></ngx-datatable-column>
        <ngx-datatable-column name="Date" prop="dt" :sortable="true"></ngx-datatable-column>
        <ngx-datatable-column name="Comment" prop="comment" :sortable="true">
          <template slot-scope="scope" v-if="scope.row">           
            <input autofocus
              @blur="updateValue($event, 'comment', scope.rowIndex)"
              type="text" 
              name="comment" 
              :value="scope.row.comment"/>
          </template>                
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export default class RowGroupingComponent  extends Vue {

  // funder = [];
  // calculated = [];
  // pending = [];
  // groups = [];
  
  editing = {};  
  rows: Array<IRow> = [];
  groupRowsBy = ['age', [{ title: 'Gender', prop: 'gender' }, { title: 'Firm', prop: 'company' }, { title: 'Date', prop: 'dt', valueGetter: (dt: string) => new Date(dt).getFullYear() }]];
  
  created() {
    this.fetch((data) => {
      data.forEach(row => {
        row.dt = new Date().toISOString();
      });
      this.rows = data;
    });
  }

  fetch(cb: ( data: Array<IRow>) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/forRowGrouping.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  getGroupRowHeight(group: Array<unknown>, rowHeight: unknown) {
    let style = {};

    style = {
      height: (group.length * 40) + 'px',
      width: '100%'
    };

    return style;
  }

  checkGroup(event: { target: { checked: boolean; value: string }}, row: Record<string, unknown>, rowIndex: unknown, group: { rows: Array<IRow> }) {
    let groupStatus: string = 'Pending';
    let expectedPaymentDealtWith: boolean = true;

    row.exppayyes = 0;
    row.exppayno = 0;
    row.exppaypending = 0;
      
    if (event.target.checked)
      if (event.target.value === '0') { // expected payment yes selected
        row.exppayyes = 1;
      } else if (event.target.value === '1') { // expected payment yes selected
        row.exppayno = 1;
      } else if (event.target.value === '2') { // expected payment yes selected
        row.exppaypending = 1;
      }
    const gr = group.rows;
    if (gr.length === 2) { // There are only 2 lines in a group
      if (['Calculated', 'Funder'].indexOf(gr[0].source) > -1 && ['Calculated', 'Funder'].indexOf(gr[1].source) > -1) { // Sources are funder and calculated
        if (gr[0].startdate === gr[1].startdate && gr[0].enddate === gr[1].enddate) { // Start dates and end dates match
          for (let index = 0; index < gr.length; index++) {
            if (gr[index].source !== row.source) {
              if (event.target.value === '0') { // expected payment yes selected
                gr[index].exppayyes = 0;
                gr[index].exppaypending = 0;
                gr[index].exppayno = 1;
              }
            }

            if (gr[index].exppayyes === 0 && gr[index].exppayno === 0 && gr[index].exppaypending === 0) {
              expectedPaymentDealtWith = false;
            }
            console.log('expectedPaymentDealtWith', expectedPaymentDealtWith);
          }
        }
      }
    } else {
      for (let index = 0; index < gr.length; index++) {
        if (gr[index].exppayyes === 0 && gr[index].exppayno === 0 && gr[index].exppaypending === 0) {
          expectedPaymentDealtWith = false;
        }
        console.log('expectedPaymentDealtWith', expectedPaymentDealtWith);
      }      
    }

    // check if there is a pending selected payment or a row that does not have any expected payment selected
    if (gr.filter(rowFilter => rowFilter.exppaypending === 1).length === 0 
      && gr.filter(rowFilter => rowFilter.exppaypending === 0 
                      && rowFilter.exppayyes === 0 
                      && rowFilter.exppayno === 0).length === 0) {
      console.log('expected payment dealt with');
      
      // check if can set the group status
      const numberOfExpPayYes = gr.filter(rowFilter => rowFilter.exppayyes === 1).length;
      const numberOfSourceFunder = gr.filter(
          rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Funder').length;
      const numberOfSourceCalculated = gr.filter(
          rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Calculated').length;
      const numberOfSourceManual = gr.filter(
          rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Manual').length;

      console.log('numberOfExpPayYes', numberOfExpPayYes);
      console.log('numberOfSourceFunder', numberOfSourceFunder);
      console.log('numberOfSourceCalculated', numberOfSourceCalculated);
      console.log('numberOfSourceManual', numberOfSourceManual);

      if (numberOfExpPayYes > 0) {
        if (numberOfExpPayYes === numberOfSourceFunder) {
          groupStatus = 'Funder Selected';
        } else if (numberOfExpPayYes === numberOfSourceCalculated) {
          groupStatus = 'Calculated Selected';
        } else if (numberOfExpPayYes === numberOfSourceManual) {
          groupStatus = 'Manual Selected';
        } else {
          groupStatus = 'Hybrid Selected';
        }
      }
        
    }

    gr[0].groupstatus = groupStatus;    
  }

  updateValue(event: { target: { checked: boolean; value: any }}, cell: string, rowIndex: number) {
    this.editing[rowIndex + '-' + cell] = false;
    const row = this.rows[rowIndex];
    row[cell] = event.target.value;
  }

  onDetailToggle(event: unknown) {
    console.log('Detail Toggled', event);
  }

  groupTitle(group: {
    key: string, level: number, value: any[],
    keys: Array<{ title: string, prop: string, value: string }>
  }) {
    let result = '';
    group.keys.forEach(gr => {
      result += `${gr.title} - ${gr.value}; `;
    });
    return result ? result : 'Age - empty';
  }

  onRendered() {
    //
  }

  onExpandAll() {
    const table = this.$refs.table;
    if (!table) {
      return;
    }
    (table as unknown as { expandAllGroups: () => void }).expandAllGroups();
  }

  onCollapseAll() {
    const table = this.$refs.table;
    if (!table) {
      return;
    }
    (table as unknown as { collapseAllGroups: () => void }).collapseAllGroups();
  }
}
