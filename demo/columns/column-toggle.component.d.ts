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
    get columns(): {
        name: string;
        visible: boolean;
    }[];
    toggle(col: {
        visible: boolean;
    }): void;
    isChecked(col: {
        visible: boolean;
    }): boolean;
}
