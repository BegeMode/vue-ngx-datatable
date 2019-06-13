<template>
    <div>
      <h3>
        Responsive Demo
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/responsive.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        ref="table"
        class="material expandable"
        columnMode="force"
        :headerHeight="50"
        :footerHeight="50"
        :rowHeight="50"
        :scrollbarV="true"
        :rows='rows'
        @page="onPage($event)">

        <!-- Row Detail Template -->
        <template v-slot:rowDetail="scope">
          <div style="padding-left:60px; font-size:14px">
            <div>{{scope.row.gender}}, {{scope.row.age}}</div>
          </div>
        </template>

        <!-- Column Templates -->
         <ngx-datatable-column
          :width="50"
          :resizeable="false"
          :sortable="false"
          :draggable="false"
          :canAutoResize="false">

          <template slot-scope="scope" v-if="scope.row">
            <a
              href="#"
              class="desktop-hidden"
              :class="{'datatable-icon-right': !scope.expanded, 'datatable-icon-down': scope.expanded}"
              title="Expand/Collapse Row"
              @click="toggleExpandRow(scope.row)">
            </a>
          </template>
        </ngx-datatable-column>

        <ngx-datatable-column name="Name" :flexGrow="3" :minWidth="200">
          <template slot-scope="scope" v-if="scope.row">
            {{scope.row.name}}
          </template>
        </ngx-datatable-column>

        <ngx-datatable-column name="Gender" :flexGrow="1">
          <template v-slot:header="scope">
            <span class="mobile-hidden">{{scope.column.name}}</span>
          </template>

          <template v-slot:default="scope">
            <span v-if="scope.row" class="mobile-hidden">{{scope.row.gender}}</span>
          </template>
        </ngx-datatable-column>

        <ngx-datatable-column name="Age" :flexGrow="1">
          <template v-slot:header="scope">
            <span class="mobile-hidden"><b>{{scope.column.name}}</b></span>
          </template>

          <template v-slot:default="scope">
            <span v-if="scope.row" class="mobile-hidden">{{scope.row.age}}</span>
          </template>
        </ngx-datatable-column>

      </ngx-datatable>
      <div style="margin: 50px;">
        This demo combines the features used in the <i>Row Detail</i> Rows demo, <i>Flex</i> Column demo, and the <i>Inline</i> 
        Templates demo. When your browser is at 800px, the gender and age columns will be hidden and will appear in the row detail view.
      </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';

@Component({
  name: 'responsive-demo',
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  template: `
  `,
})
export default class ResponsiveComponent extends Vue {

  rows: any[] = [];
  expanded: any = {};
  timeout: any;

  created() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    (this.$refs.table as any).toggleExpandDetail(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 800px) {
  .desktop-hidden {
    display: initial;
  }
  .mobile-hidden {
    display: none;
  }
}
@media screen and (min-width: 800px) {
  .desktop-hidden {
    display: none;
  }
  .mobile-hidden {
    display: initial;
  }
}
</style>
