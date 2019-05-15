import { Vue } from 'vue-property-decorator';
export default class DataTableBodyRowDetailComponent extends Vue {
    rowHeight: (number | ((group?: any, index?: number) => number));
    row: any;
    expanded: boolean;
    rowDetailSlot: any;
    created(): void;
    beforeUpdate(): void;
    toggleExpandGroup(): void;
}
