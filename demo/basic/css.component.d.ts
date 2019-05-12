import { Vue } from 'vue-property-decorator';
export default class RowCssComponent extends Vue {
    rows: any[];
    expanded: {};
    timeout: any;
    created(): void;
    fetch(cb: any): void;
    getRowClass(row: any): {
        'age-is-ten': boolean;
    };
    getCellClass({ row, column, value }: {
        row: any;
        column: any;
        value: any;
    }): any;
}
