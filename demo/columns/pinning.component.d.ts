import { Vue } from 'vue-property-decorator';
export default class ColumnPinningComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    isVisibleFrozen: boolean;
    isNameFrozen: boolean;
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
}
