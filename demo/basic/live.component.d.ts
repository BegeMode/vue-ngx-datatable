import { Vue } from 'vue-property-decorator';
export default class LiveDataComponent extends Vue {
    count: number;
    rows: any[];
    temp: any[];
    cols: any;
    id: any;
    created(): void;
    randomNum(start: number, end: number): number;
    start(): void;
    stop(): void;
    add(): void;
    remove(): void;
    updateRandom(): void;
    fetch(cb: any): void;
}
