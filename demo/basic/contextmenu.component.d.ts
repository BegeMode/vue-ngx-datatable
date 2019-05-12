import { Vue } from 'vue-property-decorator';
export default class ContextMenuDemoComponent extends Vue {
    rows: any[];
    columns: ({
        prop: string;
        visible: boolean;
        name?: undefined;
    } | {
        name: string;
        visible: boolean;
        prop?: undefined;
    })[];
    rawEvent: any;
    contextmenuRow: any;
    contextmenuColumn: any;
    created(): void;
    onTableContextMenu(contextMenuEvent: any): void;
    fetch(cb: any): void;
}
