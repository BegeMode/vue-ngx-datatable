import { Vue } from 'vue-property-decorator';
export default class FooterDemoComponent extends Vue {
    rows: any[];
    columns: ({
        prop: string;
        name?: undefined;
    } | {
        name: string;
        prop?: undefined;
    })[];
    created(): void;
    fetch(cb: any): void;
}
