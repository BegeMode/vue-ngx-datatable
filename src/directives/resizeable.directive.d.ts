import { VNode } from 'vue';
declare class ResizeableDirectiveController {
    resizeEnabled: boolean;
    minWidth: number;
    maxWidth: number;
    resizing: boolean;
    element: HTMLElement;
    handleUp: (event: MouseEvent) => void;
    handleDown: (event: MouseEvent) => void;
    handleMove: (event: MouseEvent) => void;
    vnode: VNode;
    id: number;
    constructor(id: number, vNode: VNode, el: HTMLElement);
    private onMouseUp;
    private onMouseDown;
    private move;
    private emit;
}
export interface IHasResizeableDirectiveController extends HTMLElement {
    __resizeable__: ResizeableDirectiveController;
}
declare const _default: import("vue").DirectiveOptions;
export default _default;
