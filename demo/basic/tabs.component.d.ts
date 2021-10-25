import { Vue } from 'vue-property-decorator';
export default class TabsDemoComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    tab1: boolean;
    tab2: boolean;
    tab3: boolean;
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
}
