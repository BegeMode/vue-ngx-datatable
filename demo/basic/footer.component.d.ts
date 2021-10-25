import { Vue } from 'vue-property-decorator';
export default class FooterDemoComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    columns: ({
        prop: string;
        name?: undefined;
    } | {
        name: string;
        prop?: undefined;
    })[];
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
}
