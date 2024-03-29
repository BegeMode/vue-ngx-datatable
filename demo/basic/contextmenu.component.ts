import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        Context Menu Event
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/contextmenu.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <div class="info">
        <p><strong>Note:</strong> ngx-datatable does not provide a context menu feature.
        This demonstrates how you would access the <code>contextmenu</code> event
        to display your own custom context menu.</p>
        <p v-if="rawEvent"><strong>Mouse position:</strong> <code>(x: {{rawEvent.x}}, y: {{rawEvent.y}})</code></p>
        <p v-if="contextmenuRow"><strong>Row:</strong> {{contextmenuRow.name}}</p>
        <p v-if="contextmenuColumn"><strong>Header:</strong>
          name: {{contextmenuColumn.name}}
          prop: {{contextmenuColumn.prop}}
        </p>
      </div>
      <ngx-datatable
        class="material"
        :rows="rows"
        :columns="columns"
        :columnMode="'force'"
        :headerHeight="50"
        :footerHeight="50"
        :rowHeight="'auto'"
        @tableContextmenu="onTableContextMenu($event)">
      </ngx-datatable>
    </div>
  `
})
export default class ContextMenuDemoComponent extends Vue {

  rows: Array<Record<string, unknown>> = [];

  columns = [
    { prop: 'name', visible: true },
    { name: 'Gender', visible: true },
    { name: 'Company', visible: true }
  ];

  rawEvent: Event = null;
  contextmenuRow: Record<string, unknown> = null;
  contextmenuColumn: unknown = null;

  created() {
    this.fetch((data: Array<Record<string, unknown>>) => {
      this.rows = data;
    });
  }

  onTableContextMenu(contextMenuEvent: { event: Event; type: string; content: Record<string, unknown> }) {
    console.log(contextMenuEvent);

    this.rawEvent = contextMenuEvent.event;
    if (contextMenuEvent.type === 'body') {
      this.contextmenuRow = contextMenuEvent.content;
      this.contextmenuColumn = undefined;
    } else {
      this.contextmenuColumn = contextMenuEvent.content;
      this.contextmenuRow = undefined;
    }

    contextMenuEvent.event.preventDefault();
    contextMenuEvent.event.stopPropagation();
  }

  fetch(cb: (data: Array<Record<string, unknown>>) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
