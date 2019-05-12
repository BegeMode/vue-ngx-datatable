import { Vue } from 'vue-property-decorator';
export default class MultipleTablesComponent extends Vue {
    columns1: ({
        prop: string;
        name?: undefined;
    } | {
        name: string;
        prop?: undefined;
    })[];
    columns2: ({
        prop: string;
        name: string;
    } | {
        name: string;
        prop?: undefined;
    })[];
    rows1: {
        name: string;
        gender: string;
        company: string;
    }[];
    rows2: {
        name: string;
        gender: string;
    }[];
}
