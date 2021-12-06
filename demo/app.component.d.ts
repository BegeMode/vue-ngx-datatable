import { Vue } from 'vue-property-decorator';
import '../src/themes/material.scss';
import '../src/themes/dark.scss';
import '../src/themes/bootstrap.scss';
export declare class AppComponent extends Vue {
    state: string;
    selectedElement: Element;
    onStateChanged(): void;
    mounted(): void;
    get classObject(): {
        dark: boolean;
    };
    version: string;
}
