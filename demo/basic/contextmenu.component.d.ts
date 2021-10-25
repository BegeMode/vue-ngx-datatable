import { Vue } from 'vue-property-decorator';
export default class ContextMenuDemoComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    columns: ({
        prop: string;
        visible: boolean;
        name?: undefined;
    } | {
        name: string;
        visible: boolean;
        prop?: undefined;
    })[];
    rawEvent: Event;
    contextmenuRow: Record<string, unknown>;
    contextmenuColumn: unknown;
    created(): void;
    onTableContextMenu(contextMenuEvent: {
        event: Event;
        type: string;
        content: Record<string, unknown>;
    }): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
}
