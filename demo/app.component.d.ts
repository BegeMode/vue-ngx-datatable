import { Vue } from 'vue-property-decorator';
import '../src/themes/material.scss';
import '../src/themes/dark.scss';
import '../src/themes/bootstrap.scss';
export declare class AppComponent extends Vue {
    state: string;
    readonly classObject: {
        dark: boolean;
    };
    version: string;
}
