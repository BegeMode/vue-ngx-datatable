import { Vue } from 'vue-property-decorator';
export default class TemplateRefTemplatesComponent extends Vue {
    rows: any[];
    columns: any[];
    created(): void;
    fetch(cb: any): void;
    get column(): {
        name: string;
    };
    get scope(): {
        value: string;
    };
}
