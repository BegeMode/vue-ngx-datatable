import { Vue } from 'vue-property-decorator';
export default class ColumnForceComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
}