import { Vue } from 'vue-property-decorator';
export default class InlineTemplatesComponent extends Vue {
    rows: any[];
    joke: string;
    created(): void;
    fetch(cb: any): void;
}
