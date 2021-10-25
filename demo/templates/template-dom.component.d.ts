import { Vue } from 'vue-property-decorator';
export default class InlineTemplatesComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    joke: string;
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
}
