import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';

@Component({
  name: 'template-ref-demo',
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        TemplateRef via Column Property
         <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/templates/template-obj.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :rows="rows"
        :columns="columns"
        columnMode="force"
        :headerHeight="50"
        :footerHeight="50"
        rowHeight="auto">
      </ngx-datatable>

      <slot name="hdrTpl" v-bind:column="column">
        <strong>Fancy</strong>: {{column.name}} !!
      </slot>

      <slot name="editTmpl">
        <img
          v-if="scope.value === 'male'"
          width="150"
          src="https://media.giphy.com/media/I8nepxWwlEuqI/giphy.gif"
        />
        <img
          v-if="scope.value === 'female'"
          width="150"
          src="https://media.giphy.com/media/sxSVG3XHf7yww/giphy.gif"
        />
      </slot>
    </div>
  `
})
export default class TemplateRefTemplatesComponent extends Vue {

  rows = [];
  columns = [];

  created() {
    this.columns = [{
      cellTemplate: this.$slots.editTmpl,
      headerTemplate: this.$slots.hdrTpl,
      name: 'Gender'
    }];
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

  get column() {
    return { name: 'columnName' };
  }

  get scope() {
    return { value: 'male' };
  }
}
