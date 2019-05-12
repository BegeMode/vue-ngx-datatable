import { Vue } from 'vue-property-decorator';
export default class ColumnToggleComponent extends Vue {
    rows: {
        name: string;
        gender: string;
        company: string;
    }[];
    allColumns: {
        name: string;
        visible: boolean;
    }[];
    readonly columns: {
        name: string;
        visible: boolean;
    }[];
    toggle(col: any): void;
    isChecked(col: any): any;
}
