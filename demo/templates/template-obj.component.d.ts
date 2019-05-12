import { Vue } from 'vue-property-decorator';
export default class TemplateRefTemplatesComponent extends Vue {
    rows: any[];
    columns: any[];
    created(): void;
    fetch(cb: any): void;
    readonly column: {
        name: string;
    };
    readonly scope: {
        value: string;
    };
}
