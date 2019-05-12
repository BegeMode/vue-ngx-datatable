import { Vue } from 'vue-property-decorator';
export default class ColumnStandardComponent extends Vue {
    rows: any[];
    created(): void;
    fetch(cb: any): void;
}
