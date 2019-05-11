import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import '../src/themes/material.scss';
import '../src/themes/dark.scss';
import '../src/themes/bootstrap.scss';
import { FullScreenComponent } from './basic/fullscreen.component';
import BasicAutoComponent from './basic/basic-auto.component';
import BasicFixedComponent from './basic/basic-fixed.component';
import ClientPagingComponent from './paging/paging-client.component';
import VirtualPagingComponent from './paging/paging-virtual.component';
import VirtualScrollComponent from './basic/virtual.component';
import FilterBarComponent from './basic/filter.component';
import SingleSelectionComponent from './selection/selection-single.component';
import MultiSelectionComponent from './selection/selection-multi.component';
import MultiClickSelectionComponent from './selection/selection-multi-click.component';
import DynamicHeightComponent from './basic/dynamic-height.component';
import DefaultSortingComponent from './sorting/sorting-default.component';
import ClientSortingComponent from './sorting/sorting-client.component';
import SortingComparatorComponent from './sorting/sorting-comparator.component';
import ServerSortingComponent from './sorting/sorting-server.component';
import HorzVertScrolling from './basic/scrolling.component';
import ClientTreeComponent from './tree/client-tree.component';
import FullScreenTreeComponent from './tree/fullscreen.component';
import CheckboxSelectionComponent from './selection/selection-chkbox.component';
import MultiDisableSelectionComponent from './selection/selection-disabled.component';
import CustomCheckboxSelectionComponent from './selection/selection-chkbox-template.component';
import CellSelectionComponent from './selection/selection-cell.component';
import ColumnReorderComponent from './columns/column-reorder.component';
import ContextMenuDemoComponent from './basic/contextmenu.component';
import ColumnToggleComponent from './columns/column-toggle.component';
import ColumnStandardComponent from './columns/column-standard.component';
import ColumnForceComponent from './columns/column-force.component';
import ColumnFlexComponent from './columns/column-flex.component';
import ColumnPinningComponent from './columns/pinning.component';
import SummaryRowSimpleComponent from './summary/summary-row-simple.component';
import RowGroupingComponent from './basic/row-grouping.component';
import RowDetailsComponent from './basic/row-detail.component';
import MultipleTablesComponent from './basic/multiple.component';
import TabsDemoComponent from './basic/tabs.component';
import LiveDataComponent from './basic/live.component';
import InlineEditComponent from './basic/inline.component';
import RowCssComponent from './basic/css.component';
import FooterDemoComponent from './basic/footer.component';
import ResponsiveComponent from './basic/responsive.component.vue';
import ServerScrollingComponent from './paging/scrolling-server.component.vue';
import ServerPagingComponent from './paging/paging-server.component';
import PagingScrollingNoVirtualizationComponent from './paging/paging-scrolling-novirtualization.component';

@Component({
  components: {
    'basic-auto-demo': BasicAutoComponent,
    'full-screen-demo': FullScreenComponent,
    'basic-fixed-demo': BasicFixedComponent,
    'client-paging-demo': ClientPagingComponent,
    'virtual-paging-demo': VirtualPagingComponent,
    'virtual-scroll-demo': VirtualScrollComponent,
    'filter-demo': FilterBarComponent,
    'single-selection-demo': SingleSelectionComponent,
    'multi-selection-demo': MultiSelectionComponent,
    'multi-click-selection-demo': MultiClickSelectionComponent,
    'dynamic-height-demo': DynamicHeightComponent,
    'default-sorting-demo': DefaultSortingComponent,
    'client-sorting-demo': ClientSortingComponent,
    'comparator-sorting-demo': SortingComparatorComponent,
    'server-sorting-demo': ServerSortingComponent,
    'horz-vert-scrolling-demo': HorzVertScrolling,
    'client-side-tree-demo': ClientTreeComponent,
    'full-screen-tree-demo': FullScreenTreeComponent,
    'chkbox-selection-demo': CheckboxSelectionComponent,
    'multidisable-selection-demo': MultiDisableSelectionComponent,
    'chkbox-selection-template-demo': CustomCheckboxSelectionComponent,
    'cell-selection-demo': CellSelectionComponent,
    'column-reorder-demo': ColumnReorderComponent,
    'contextmenu-demo': ContextMenuDemoComponent,
    'column-toggle-demo': ColumnToggleComponent,
    'column-standard-demo': ColumnStandardComponent,
    'column-force-demo': ColumnForceComponent,
    'column-flex-demo': ColumnFlexComponent,
    'column-pinning-demo': ColumnPinningComponent,
    'summary-row-simple-demo': SummaryRowSimpleComponent,
    'row-grouping-demo': RowGroupingComponent,
    'row-details-demo': RowDetailsComponent,
    'multiple-tables-demo': MultipleTablesComponent,
    'tabs-demo': TabsDemoComponent,
    'live-data-demo': LiveDataComponent,
    'inline-edit-demo': InlineEditComponent,
    'row-css-demo': RowCssComponent,
    'footer-demo': FooterDemoComponent,
    'responsive-demo': ResponsiveComponent,
    'server-scrolling-demo': ServerScrollingComponent,
    'server-paging-demo': ServerPagingComponent,
    'paging-scrolling-novirtualization-demo': PagingScrollingNoVirtualizationComponent,
  },
  template: `
    <div :class="classObject" style="height:100%;">
      <nav style="height:100%;overflow-y:auto;">
        <h3>vue-ngx-datatable <small>({{version}})</small></h3>
        <ul class="main-ul">
          <li>
            <h4>Documentation</h4>
            <ul>
              <li>
                <a href="https://swimlane.gitbooks.io/ngx-datatable/content/" target="_black">Online</a>
              </li>
              <li>
                <a href="https://www.gitbook.com/download/pdf/book/swimlane/ngx-datatable" target="_black">PDF</a>
              </li>
            </ul>
          </li>
          <li>
            <h4>Basic</h4>
            <ul>
              <li><a href="#virtual-scroll" @click="state='virtual-scroll'">10k Rows</a></li>
              <li><a href="#full-screen" @click="state='full-screen'">Full Screen</a></li>
              <li><a href="#inline-edit" @click="state='inline-edit'">Inline Editing</a></li>
              <li><a href="#horz-vert-scrolling" @click="state='horz-vert-scrolling'">Horz/Vert Scrolling</a></li>
              <li><a href="#multiple-tables" @click="state='multiple-tables'">Multiple Tables</a></li>
              <li><a href="#filter" @click="state='filter'">Filtering</a></li>
              <li><a href="#hidden" @click="state='hidden'">Hidden On Load</a></li>
              <li><a href="#live" @click="state='live'">Live Data</a></li>
              <!-- <li><a href="#rx" @click="state='rx'">RxJS</a></li> -->
              <li><a href="#contextmenu" @click="state='contextmenu'">Context Menu</a></li>
              <li><a href="#css" @click="state='css'">CSS Classes</a></li>
              <li><a href="#footer" @click="state='footer'">Footer Template</a></li>
            </ul>
          </li>
          <li>
            <h4>Themes</h4>
            <ul>
              <li><a href="#dark" @click="state='dark'">Dark theme</a></li>
              <li><a href="#bootstrap" @click="state='bootstrap'">Bootstrap theme</a></li>
            </ul>
          </li>
          <li>
            <h4>Tree</h4>
            <ul>
              <li><a href="#fullscreen-tree" @click="state='fullscreen-tree'">Full screen Tree</a></li>
              <li><a href="#client-tree" @click="state='client-tree'">Client Side Tree</a></li>
            </ul>
          </li>
          <li>
            <h4>Rows</h4>
            <ul>
              <li><a href="#row-grouping" @click="state='row-grouping'">Row Grouping</a></li>
              <li><a href="#" @click="state=''">Fluid Row Height</a></li>
              <li><a href="#basic-fixed" @click="state='basic-fixed'">Fixed Row Height</a></li>
              <li><a href="#dynamic" @click="state='dynamic'">Dynamic Row Height</a></li>
              <li><a href="#row-details" @click="state='row-details'">Row Detail</a></li>
              <li><a href="#responsive" @click="state='responsive'">Responsive</a></li>
            </ul>
          </li>
          <li>
            <h4>Paging</h4>
            <ul>
              <li><a href="#client-paging" @click="state='client-paging'">Client-side</a></li>
              <li><a href="#server-paging" @click="state='server-paging'">Server-side</a></li>
              <li><a href="#paging-scrolling-novirtualization" @click="state='paging-scrolling-novirtualization'">Scrolling no virtual</a></li>
              <li><a href="#server-scrolling" @click="state='server-scrolling'">Scrolling server-side</a></li>
              <li><a href="#virtual-paging" @click="state='virtual-paging'">Virtual server-side</a></li>
            </ul>
          </li>
          <li>
            <h4>Sorting</h4>
            <ul>
              <li><a href="#client-sorting" @click="state='client-sorting'">Client-side</a></li>
              <li><a href="#default-sorting" @click="state='default-sorting'">Default sort</a></li>
              <li><a href="#server-sorting" @click="state='server-sorting'">Server-side</a></li>
              <li><a href="#comparator-sorting" @click="state='comparator-sorting'">Comparator</a></li>
            </ul>
          </li>
          <li>
            <h4>Selection</h4>
            <ul>
              <li><a href="#cell-selection" @click="state='cell-selection'">Cell</a></li>
              <li><a href="#single-selection" @click="state='single-selection'">Single Row</a></li>
              <li><a href="#multi-selection" @click="state='multi-selection'">Multi Row</a></li>
              <li><a href="#multi-click-selection" @click="state='multi-click-selection'">Multi Click Row</a></li>
              <li><a href="#multidisable-selection" @click="state='multidisable-selection'">Disable Callback</a></li>
              <li><a href="#chkbox-selection" @click="state='chkbox-selection'">Checkbox</a></li>
              <li><a href="#chkbox-selection-template" @click="state='chkbox-selection-template'">Custom Checkbox</a></li>
            </ul>
          </li>
          <li>
            <h4>Templates</h4>
            <ul>
              <li><a href="#inline" @click="state='inline'">Inline</a></li>
              <li><a href="#templateref" @click="state='templateref'">TemplateRef</a></li>
            </ul>
          </li>
          <li>
            <h4>Column</h4>
            <ul>
              <li><a href="#flex" @click="state='flex'">Flex</a></li>
              <li><a href="#toggle" @click="state='toggle'">Toggling</a></li>
              <li><a href="#fixed" @click="state='fixed'">Fixed</a></li>
              <li><a href="#force" @click="state='force'">Force</a></li>
              <li><a href="#pinning" @click="state='pinning'">Pinning</a></li>
              <li><a href="#reorder" @click="state='reorder'">Reorder</a></li>
            </ul>
          </li>
          <li>
            <h4>Summary Row</h4>
            <ul>
              <li><a href="#simple-summary" @click="state='simple-summary'">Simple</a></li>
              <li><a href="#custom-template-summary" @click="state='custom-template-summary'">Custom Template</a></li>
              <li><a href="#paging-summary" @click="state='paging-summary'">Server-side paging</a></li>
              <li><a href="#inline-html-summary" @click="state='inline-html-summary'">Inline HTML</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <content>
        <!-- Basic -->
        <basic-auto-demo v-if="!state"></basic-auto-demo>
        <full-screen-demo v-if="state === 'full-screen'"></full-screen-demo>
        <basic-fixed-demo v-if="state === 'basic-fixed'"></basic-fixed-demo>
        <virtual-scroll-demo v-if="state === 'virtual-scroll'"></virtual-scroll-demo>
        <filter-demo v-if="state === 'filter'"></filter-demo>
        <dynamic-height-demo v-if="state === 'dynamic'"></dynamic-height-demo>
        <horz-vert-scrolling-demo v-if="state === 'horz-vert-scrolling'"></horz-vert-scrolling-demo>
        <contextmenu-demo v-if="state === 'contextmenu'"></contextmenu-demo>

        <row-details-demo v-if="state === 'row-details'"></row-details-demo>
        <multiple-tables-demo v-if="state === 'multiple-tables'"></multiple-tables-demo>
        <tabs-demo v-if="state === 'hidden'"></tabs-demo>
        <live-data-demo v-if="state === 'live'"></live-data-demo>
        <inline-edit-demo v-if="state === 'inline-edit'"></inline-edit-demo>
        <row-css-demo v-if="state === 'css'"></row-css-demo>
        <footer-demo v-if="state === 'footer'"></footer-demo>
        <responsive-demo v-if="state === 'responsive'"></responsive-demo>
        <!-- 
        <rx-demo v-if="state === 'rx'"></rx-demo>
         -->

        <!-- Themes -->
        <!-- <basic-dark-theme-demo v-if="state === 'dark'"></basic-dark-theme-demo>
        <basic-bootstrap-theme-demo  v-if="state === 'bootstrap'"></basic-bootstrap-theme-demo>  -->

        <!-- Tree -->
        <full-screen-tree-demo v-if="state === 'fullscreen-tree'"></full-screen-tree-demo>
        <client-side-tree-demo v-if="state === 'client-tree'"></client-side-tree-demo>

        <!-- Paging -->
        <client-paging-demo v-if="state === 'client-paging'"></client-paging-demo>
        <virtual-paging-demo v-if="state === 'virtual-paging'"></virtual-paging-demo>
        <row-grouping-demo v-if="state === 'row-grouping'"></row-grouping-demo>
        <server-scrolling-demo v-if="state === 'server-scrolling'"></server-scrolling-demo>
        <server-paging-demo v-if="state === 'server-paging'"></server-paging-demo>
        <paging-scrolling-novirtualization-demo v-if="state === 'paging-scrolling-novirtualization'">
        </paging-scrolling-novirtualization-demo>

        <!-- Sorting -->
        <default-sorting-demo v-if="state === 'default-sorting'"></default-sorting-demo>
        <client-sorting-demo v-if="state === 'client-sorting'"></client-sorting-demo>
        <comparator-sorting-demo v-if="state === 'comparator-sorting'"></comparator-sorting-demo>
        <server-sorting-demo v-if="state === 'server-sorting'"></server-sorting-demo>

        <!-- Selection -->
        <single-selection-demo v-if="state === 'single-selection'"></single-selection-demo>
        <multi-selection-demo v-if="state === 'multi-selection'"></multi-selection-demo>
        <multi-click-selection-demo v-if="state === 'multi-click-selection'"></multi-click-selection-demo>
        <chkbox-selection-demo v-if="state === 'chkbox-selection'"></chkbox-selection-demo>
        <multidisable-selection-demo v-if="state === 'multidisable-selection'"></multidisable-selection-demo>
        <chkbox-selection-template-demo v-if="state === 'chkbox-selection-template'"></chkbox-selection-template-demo> 
        <cell-selection-demo v-if="state === 'cell-selection'"></cell-selection-demo>

        <!-- Templates -->
        <!-- <template-ref-demo v-if="state === 'templateref'"></template-ref-demo>
        <inline-templates-demo v-if="state === 'inline'"></inline-templates-demo> -->

        <!-- Columns -->
        <column-reorder-demo v-if="state === 'reorder'"></column-reorder-demo>
        <column-toggle-demo v-if="state === 'toggle'"></column-toggle-demo>
        <column-flex-demo v-if="state === 'flex'"></column-flex-demo>
        <column-standard-demo v-if="state === 'fixed'"></column-standard-demo>
        <column-force-demo v-if="state === 'force'"></column-force-demo>
        <column-pinning-demo v-if="state === 'pinning'"></column-pinning-demo>

        <!-- Summary row -->
        <summary-row-simple-demo v-if="state === 'simple-summary'"></summary-row-simple-demo>
        <!-- <summary-row-custom-template-demo v-if="state === 'custom-template-summary'">
        </summary-row-custom-template-demo>
        <summary-row-server-paging-demo v-if="state === 'paging-summary'">
        </summary-row-server-paging-demo>
        <summary-row-inline-html v-if="state === 'inline-html-summary'"></summary-row-inline-html> -->
      </content>
    </div>
  `
})
export class AppComponent extends Vue {
  state: string = '';

  get classObject() {
    return {
      dark: this.state === 'dark',
    };
  }

  version: string = APP_VERSION;
}
