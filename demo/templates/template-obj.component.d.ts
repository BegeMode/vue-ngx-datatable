import { Vue } from 'vue-property-decorator';
export default class TemplateRefTemplatesComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    columns: Array<Record<string, unknown>>;
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    get column(): {
        name: string;
    };
    get scope(): {
        value: string;
    };
}
