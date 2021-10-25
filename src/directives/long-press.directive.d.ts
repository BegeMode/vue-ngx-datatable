import { TableColumn } from 'types/table-column.type';
import { VNode } from 'vue';
declare class LongPressController {
    id: number;
    pressEnabled: boolean;
    pressModel: TableColumn;
    duration: number;
    _pressing: boolean;
    _isLongPressing: boolean;
    timeout: number;
    mouseX: number;
    mouseY: number;
    vnode: VNode;
    element: HTMLElement;
    handleUp: (event: MouseEvent) => void;
    handleDown: (event: MouseEvent) => void;
    handleMove: (event: MouseEvent) => void;
    constructor(id: number, vNode: VNode, el: HTMLElement);
    unsubscribe(): void;
    set pressing(value: boolean);
    get pressing(): boolean;
    set isLongPressing(value: boolean);
    get isLongPressing(): boolean;
    private onMouseDown;
    private onMouseUp;
    private onMouseMove;
    private loop;
    private endPress;
    private emit;
}
export interface IHasLongPressController extends HTMLElement {
    __longpress__: LongPressController;
}
declare const _default: import("vue").DirectiveOptions;
export default _default;
