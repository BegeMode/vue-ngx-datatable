/**
 * vue-data-table v"1.1.7" (https://github.com/begemode/vue-ngx-data-table)
 * Copyright 2018
 * Licensed under MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue-property-decorator"));
	else if(typeof define === 'function' && define.amd)
		define("vueNgxDatatable", ["vue-property-decorator"], factory);
	else if(typeof exports === 'object')
		exports["vueNgxDatatable"] = factory(require("vue-property-decorator"));
	else
		root["vueNgxDatatable"] = factory(root["vue-property-decorator"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_vue_property_decorator__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/datatable.component.vue");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js?!./src/components/datatable.component.scss?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-oneOf-1-2!./src/components/datatable.component.scss?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".ngx-datatable {\n  display: block;\n  overflow: hidden;\n  justify-content: center;\n  position: relative;\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n  /**\r\n   * Vertical Scrolling Adjustments\r\n   */\n  /**\r\n   * Horizontal Scrolling Adjustments\r\n   */\n  /**\r\n   * Fixed Header Height Adjustments\r\n   */\n  /**\r\n   * Fixed row height adjustments\r\n   */\n  /**\r\n   * Shared Styles\r\n   */\n  /**\r\n   * Header Styles\r\n   */\n  /**\r\n   * Body Styles\r\n   */\n  /**\r\n   * Footer Styles\r\n   */\n}\n.ngx-datatable.ngx-flex {\n    display: flex;\n    flex-flow: column;\n    justify-content: flex-start;\n    height: 100%;\n}\n.ngx-datatable.ngx-flex .datatable-body {\n      overflow-y: auto;\n      flex: 1 1 auto;\n}\n.ngx-datatable.ngx-flex .datatable-header, .ngx-datatable.ngx-flex .datatable-footer {\n      flex: none;\n}\n.ngx-datatable.ngx-nowrap-text .datatable-body .datatable-body-row .datatable-body-cell .datatable-body-cell-label {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n.ngx-datatable [hidden] {\n    display: none !important;\n}\n.ngx-datatable .hidden-columns {\n    visibility: hidden;\n    position: absolute;\n    z-index: -1;\n}\n.ngx-datatable *, .ngx-datatable *:before, .ngx-datatable *:after {\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n.ngx-datatable.scroll-vertical .datatable-body {\n    overflow-y: auto;\n}\n.ngx-datatable.scroll-vertical.virtualized .datatable-body .datatable-row-wrapper {\n    position: absolute;\n}\n.ngx-datatable.scroll-horz .datatable-body {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n}\n.ngx-datatable.fixed-header .datatable-header .datatable-header-inner {\n    white-space: nowrap;\n}\n.ngx-datatable.fixed-header .datatable-header .datatable-header-inner .datatable-header-cell {\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n}\n.ngx-datatable.fixed-row .datatable-scroll {\n    white-space: nowrap;\n}\n.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row {\n      white-space: nowrap;\n}\n.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-cell {\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n}\n.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-group-cell {\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n}\n.ngx-datatable .datatable-body-row,\n  .ngx-datatable .datatable-row-center,\n  .ngx-datatable .datatable-header-inner {\n    display: -webkit-box;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    flex-direction: row;\n    -webkit-flex-flow: row;\n    -moz-flex-flow: row;\n    -ms-flex-flow: row;\n    -o-flex-flow: row;\n    flex-flow: row;\n}\n.ngx-datatable .datatable-body-cell,\n  .ngx-datatable .datatable-header-cell {\n    overflow-x: hidden;\n    vertical-align: top;\n    display: inline-block;\n    line-height: 1.625;\n}\n.ngx-datatable .datatable-body-cell:focus,\n    .ngx-datatable .datatable-header-cell:focus {\n      outline: none;\n}\n.ngx-datatable .datatable-body-cell .datatable-body-cell-label,\n    .ngx-datatable .datatable-header-cell .datatable-body-cell-label {\n      width: 100%;\n}\n.ngx-datatable .datatable-body-cell-bold,\n    .ngx-datatable .datatable-header-cell-bold {\n      font-weight: bold;\n}\n.ngx-datatable .datatable-row-left,\n  .ngx-datatable .datatable-row-right {\n    z-index: 9;\n}\n.ngx-datatable .datatable-row-left,\n  .ngx-datatable .datatable-row-center,\n  .ngx-datatable .datatable-row-group,\n  .ngx-datatable .datatable-row-right {\n    position: relative;\n}\n.ngx-datatable .datatable-header {\n    overflow: hidden;\n}\n.ngx-datatable .datatable-header .datatable-header-inner {\n      align-items: stretch;\n      -webkit-align-items: stretch;\n}\n.ngx-datatable .datatable-header .datatable-header-cell {\n      position: relative;\n      display: inline-block;\n      user-select: none;\n}\n.ngx-datatable .datatable-header .datatable-header-cell.sortable .datatable-header-cell-wrapper {\n        cursor: pointer;\n}\n.ngx-datatable .datatable-header .datatable-header-cell.longpress .datatable-header-cell-wrapper {\n        cursor: move;\n}\n.ngx-datatable .datatable-header .datatable-header-cell .sort-btn::before {\n        line-height: 100%;\n        vertical-align: middle;\n        display: inline-block;\n        cursor: pointer;\n        font-size: 1.25rem;\n        margin-right: -7px;\n}\n.ngx-datatable .datatable-header .datatable-header-cell .resize-handle, .ngx-datatable .datatable-header .datatable-header-cell .resize-handle--not-resizable {\n        display: inline-block;\n        position: absolute;\n        right: 0;\n        top: 0;\n        bottom: 0;\n        width: 5px;\n        padding: 0 4px;\n        visibility: hidden;\n}\n.ngx-datatable .datatable-header .datatable-header-cell .resize-handle {\n        cursor: ew-resize;\n}\n.ngx-datatable .datatable-header .datatable-header-cell.resizeable:hover .resize-handle {\n        visibility: visible;\n}\n.ngx-datatable .datatable-header .datatable-header-cell:hover .resize-handle--not-resizable {\n        visibility: visible;\n}\n.ngx-datatable .datatable-header .datatable-header-cell .targetMarker {\n        position: absolute;\n        top: 0;\n        bottom: 0;\n}\n.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromLeft {\n          right: -13px;\n}\n.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromRight {\n          left: 0;\n}\n.ngx-datatable .datatable-header .datatable-header-cell .targetMarker .icon {\n          position: absolute;\n}\n.ngx-datatable .datatable-header .datatable-header-cell .targetMarker .datatable-icon-down {\n          top: 0px;\n}\n.ngx-datatable .datatable-header .datatable-header-cell .targetMarker .datatable-icon-up {\n          top: 35px;\n}\n.ngx-datatable .datatable-header .datatable-header-cell .datatable-header-cell-template-wrap {\n        height: inherit;\n}\n.ngx-datatable .datatable-body {\n    position: relative;\n    z-index: 10;\n    display: block;\n}\n.ngx-datatable .datatable-body .datatable-scroll {\n      display: inline-block;\n}\n.ngx-datatable .datatable-body .datatable-row-detail {\n      overflow-y: hidden;\n}\n.ngx-datatable .datatable-body .datatable-row-wrapper {\n      display: -webkit-box;\n      display: -moz-box;\n      display: -ms-flexbox;\n      display: -webkit-flex;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -webkit-flex-direction: column;\n      -moz-box-orient: vertical;\n      -moz-box-direction: normal;\n      -ms-flex-direction: column;\n      flex-direction: column;\n}\n.ngx-datatable .datatable-body .datatable-body-row {\n      outline: none;\n}\n.ngx-datatable .datatable-body .datatable-body-row > div {\n        display: -webkit-box;\n        display: -moz-box;\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n}\n.ngx-datatable .datatable-footer {\n    display: block;\n    width: 100%;\n    margin-top: auto;\n}\n.ngx-datatable .datatable-footer .datatable-footer-inner {\n      display: flex;\n      align-items: center;\n      width: 100%;\n}\n.ngx-datatable .datatable-footer .selected-count .page-count {\n      flex: 1 1 40%;\n}\n.ngx-datatable .datatable-footer .selected-count .datatable-pager {\n      flex: 1 1 60%;\n}\n.ngx-datatable .datatable-footer .page-count {\n      flex: 1 1 20%;\n}\n.ngx-datatable .datatable-footer .datatable-pager {\n      flex: 1 1 80%;\n      text-align: right;\n}\n.ngx-datatable .datatable-footer .datatable-pager .pager,\n      .ngx-datatable .datatable-footer .datatable-pager .pager li {\n        padding: 0;\n        margin: 0;\n        display: inline-block;\n        list-style: none;\n}\n.ngx-datatable .datatable-footer .datatable-pager .pager li, .ngx-datatable .datatable-footer .datatable-pager .pager li a {\n        outline: none;\n}\n.ngx-datatable .datatable-footer .datatable-pager .pager li a {\n        cursor: pointer;\n        display: inline-block;\n}\n.ngx-datatable .datatable-footer .datatable-pager .pager li.disabled a {\n        cursor: not-allowed;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/ts-loader/index.js?!./node_modules/tslint-loader/index.js!./src/components/body/body-cell.component.ts?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--4!./node_modules/tslint-loader!./src/components/body/body-cell.component.ts?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
// import { Keys } from '../../utils';
// import { SortDirection } from '../../types';
// import { TableColumn } from '../../types/table-column.type';
var utils_1 = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
var DataTableBodyCellComponent = /** @class */ (function (_super) {
    __extends(DataTableBodyCellComponent, _super);
    function DataTableBodyCellComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sanitizedValue = null;
        _this.value = null;
        // sortDir: SortDirection = null;
        _this.isFocused = false;
        return _this;
    }
    // activateFn = this.activate.emit.bind(this.activate); todo
    DataTableBodyCellComponent.prototype.onRowChanged = function () {
        this.checkValueUpdates();
    };
    DataTableBodyCellComponent.prototype.created = function () {
        var _a, _b;
        if (this.cellSlot) {
            this.$slots.default = this.cellSlot({
                row: (_b = (_a = this.rowContext) === null || _a === void 0 ? void 0 : _a.row) !== null && _b !== void 0 ? _b : {},
                column: this.column,
                rowIndex: this.rowContext.rowIndex,
                group: this.rowContext.group,
                expanded: this.rowContext.expanded,
                value: this.value,
                updateCell: this.$forceUpdate.bind(this),
            });
        }
        if (this.renderTracking) {
            this.$emit('cell-created', this.column);
        }
    };
    DataTableBodyCellComponent.prototype.beforeUpdate = function () {
        var _a, _b;
        if (this.cellSlot) {
            this.$slots.default = this.cellSlot({
                row: (_b = (_a = this.rowContext) === null || _a === void 0 ? void 0 : _a.row) !== null && _b !== void 0 ? _b : {},
                column: this.column,
                rowIndex: this.rowContext.rowIndex,
                group: this.rowContext.group,
                expanded: this.rowContext.expanded,
                value: this.value,
            });
        }
        if (this.renderTracking) {
            this.$emit('cell-updated', this.column);
        }
    };
    DataTableBodyCellComponent.prototype.checkValueUpdates = function () {
        var value = '';
        if (!this.rowContext || !this.column) {
            value = '';
        }
        else {
            // todo: make transform by vue filters
            // const val = this.column.$$valueGetter(this.row, this.column.prop);
            // const userPipe: PipeTransform = this.column.pipe;
            // if (userPipe) {
            //   value = userPipe.transform(val);
            // } else if (value !== undefined) {
            //   value = val;
            // }
            value = this.column.$$valueGetter(this.rowContext.row, this.column.prop);
        }
        if (this.value !== value) {
            this.value = value;
            this.sanitizedValue = value !== null && value !== undefined ? this.stripHtml(value) : value;
        }
    };
    DataTableBodyCellComponent.prototype.stripHtml = function (html) {
        if (!html.replace)
            return html;
        return html.replace(/<\/?[^>]+(>|$)/g, '');
    };
    DataTableBodyCellComponent.prototype.onFocus = function () {
        this.isFocused = true;
    };
    DataTableBodyCellComponent.prototype.onBlur = function () {
        this.isFocused = false;
    };
    DataTableBodyCellComponent.prototype.onClick = function (event) {
        // props.context.isFocused = true;
        // props.context.abcd = true;
        this.$emit('activate', {
            type: 'click',
            event: event,
            row: this.rowContext.row,
            group: this.rowContext.group,
            rowHeight: this.rowContext.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this.$el,
        });
    };
    DataTableBodyCellComponent.prototype.onDblClick = function (event) {
        this.$emit('activate', {
            type: 'dblclick',
            event: event,
            row: this.rowContext.row,
            group: this.rowContext.group,
            rowHeight: this.rowContext.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this.$el,
        });
    };
    DataTableBodyCellComponent.prototype.onKeyDown = function (event) {
        console.log('cell onKeyDown=================');
        var keyCode = event.keyCode;
        var isTargetCell = event.target === this.$el;
        var isAction = keyCode === utils_1.Keys.return ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.left ||
            keyCode === utils_1.Keys.right ||
            keyCode === utils_1.Keys.pageUp ||
            keyCode === utils_1.Keys.pageDown;
        if (isAction && isTargetCell) {
            event.preventDefault();
            event.stopPropagation();
            this.$emit('activate', {
                type: 'keydown',
                event: event,
                row: this.rowContext.row,
                rowIndex: this.rowContext.rowIndex,
                group: this.rowContext.group,
                rowHeight: this.rowContext.rowHeight,
                column: this.column,
                value: this.value,
                cellElement: this.$el,
            });
        }
    };
    DataTableBodyCellComponent.prototype.onCheckboxChange = function (event) {
        this.$emit('activate', {
            type: 'checkbox',
            event: event,
            row: this.rowContext.row,
            group: this.rowContext.group,
            rowHeight: this.rowContext.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this.$el,
            treeStatus: this.rowContext.treeStatus,
        });
    };
    DataTableBodyCellComponent.prototype.onTreeAction = function (event) {
        this.$emit('tree-action', { event: event, row: this.rowContext.row });
    };
    DataTableBodyCellComponent.prototype.onMouseEnter = function (event) {
        this.$emit('mouseenter', { event: event, row: this.rowContext.row });
    };
    Object.defineProperty(DataTableBodyCellComponent.prototype, "cssClasses", {
        get: function () {
            var _a, _b, _c;
            if (!this.rowContext) {
                return null;
            }
            var result = {};
            var func = null;
            if (this.column.cellClass) {
                if (typeof this.column.cellClass === 'string') {
                    result[this.column.cellClass] = true;
                }
                else if (Array.isArray(this.column.cellClass)) {
                    this.column.cellClass.forEach(function (value) {
                        if (typeof value === 'function') {
                            func = value;
                        }
                        else {
                            result[value] = true;
                        }
                    });
                }
                else if (typeof this.column.cellClass === 'function') {
                    func = this.column.cellClass;
                }
                if (func) {
                    var res = func({
                        row: (_a = this.rowContext) === null || _a === void 0 ? void 0 : _a.row,
                        group: (_b = this.rowContext) === null || _b === void 0 ? void 0 : _b.group,
                        column: this.column,
                        value: this.value,
                        rowHeight: (_c = this.rowContext) === null || _c === void 0 ? void 0 : _c.rowHeight,
                    });
                    if (typeof res === 'string') {
                        result[res] = true;
                    }
                    else if (typeof res === 'object') {
                        var keys = Object.keys(res);
                        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                            var k = keys_1[_i];
                            if (res[k] === true) {
                                result[" " + k] = true;
                            }
                        }
                    }
                }
            }
            // result['sort-active'] = !this.sortDir;
            result['active'] = this.isFocused;
            // result['sort-asc'] = this.sortDir === SortDirection.asc;
            // result['sort-desc'] = this.sortDir === SortDirection.desc;
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "styles", {
        get: function () {
            if (!this.rowContext) {
                return {};
            }
            return {
                width: this.column.width + 'px',
                minWidth: this.column.minWidth + 'px',
                maxWidth: this.column.maxWidth + 'px',
                height: this.rowContext.rowHeight + 'px',
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "marginCellStyle", {
        get: function () {
            if (!this.rowContext) {
                return {};
            }
            return {
                'margin-left': this.calcLeftMargin(this.column, this.rowContext.row) + 'px',
            };
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyCellComponent.prototype.cellHeight = function (rowHeight) {
        var height = rowHeight;
        if (isNaN(height))
            return height;
        return height + 'px';
    };
    DataTableBodyCellComponent.prototype.calcLeftMargin = function (column, row) {
        var levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
        return column.isTreeColumn ? row.level * levelIndent : 0;
    };
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyCellComponent.prototype, "column", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyCellComponent.prototype, "rowContext", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableBodyCellComponent.prototype, "tabIndex", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyCellComponent.prototype, "cellSlot", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableBodyCellComponent.prototype, "renderTracking", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Function)
    ], DataTableBodyCellComponent.prototype, "displayCheck", void 0);
    __decorate([
        vue_property_decorator_1.Watch('rowContext.row', { deep: true, immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableBodyCellComponent.prototype, "onRowChanged", null);
    DataTableBodyCellComponent = __decorate([
        vue_property_decorator_1.Component
    ], DataTableBodyCellComponent);
    return DataTableBodyCellComponent;
}(vue_property_decorator_1.Vue));
exports.default = DataTableBodyCellComponent;
/*@Component
export default class DataTableBodyCellComponent extends Vue {
  @Prop() displayCheck: (row: any, column?: TableColumn, value?: any) => boolean;
  @Prop() group: any;
  @Prop() rowHeight: number;
  @Prop() isSelected: boolean;
  @Prop() expanded: boolean;
  @Prop() rowIndex: number;
  @Prop() column: TableColumn;
  @Prop() row: any;
  @Prop() sorts: any[];
  @Prop() treeStatus: TreeStatus;

  sanitizedValue: any = null;
  value: any = null;
  sortDir: SortDirection = null;
  isFocused: boolean = false;
  // activateFn = this.activate.emit.bind(this.activate); todo

  cellContext: any = {
    onCheckboxChangeFn: this.onCheckboxChange,
    // activateFn: this.activateFn,  todo
    row: this.row,
    group: this.group,
    value: this.value,
    column: this.column,
    rowHeight: this.rowHeight,
    isSelected: this.isSelected,
    rowIndex: this.rowIndex,
    treeStatus: this.treeStatus,
    onTreeAction: this.onTreeAction.bind(this),
  };

  private _treeStatus: TreeStatus = 'collapsed';

  @Watch('group') onGroupChanged() {
    this.cellContext.group = this.group;
    this.checkValueUpdates();
  }

  @Watch('rowHeight') onRowHeightChanged() {
    this.cellContext.rowHeight = this.rowHeight;
    this.checkValueUpdates();
  }

  @Watch('isSelected') onIsSelectedChanged() {
    this.cellContext.isSelected = this.isSelected;
  }

  @Watch('expanded') onExpandedChanged() {
    this.cellContext.expanded = this.expanded;
  }

  @Watch('rowIndex') onRowIndexChanged() {
    this.cellContext.rowIndex = this.rowIndex;
    this.checkValueUpdates();
  }

  @Watch('column', { immediate: true }) onColumnChanged() {
    this.cellContext.column = this.column;
    if (this.column.cellTemplate) {
      this.$slots.default = this.column.cellTemplate({ row: this.row });
    }
    this.checkValueUpdates();
  }

  @Watch('row') onRowChanged() {
    this.cellContext.row = this.row;
    this.checkValueUpdates();
  }

  @Watch('sorts') onSortsChanged() {
    this.calcSortDir = this.calcSortDir(this.sorts);
  }

  @Watch('treeStatus') onTreeStatusChanged(status: TreeStatus) {
    if (status !== 'collapsed' &&
        status !== 'expanded' &&
        status !== 'loading' &&
        status !== 'disabled') {
      this._treeStatus = 'collapsed';
    } else {
      this._treeStatus = status;
    }
    this.cellContext.treeStatus = this._treeStatus;
    this.checkValueUpdates();
  }

  // @Output() activate: EventEmitter<any> = new EventEmitter();
  // @Output() treeAction: EventEmitter<any> = new EventEmitter();

  // @ViewChild('cellTemplate', { read: ViewContainerRef }) cellTemplate: ViewContainerRef;

  created() {
    this.cellContext.group = this.group;
    this.cellContext.rowHeight = this.rowHeight;
    this.cellContext.isSelected = this.isSelected;
    this.cellContext.expanded = this.expanded;
    this.cellContext.rowIndex = this.rowIndex;
    this.cellContext.column = this.column;
    this.cellContext.row = this.row;
    this.cellContext.treeStatus = this._treeStatus;
  }

  get columnCssClasses(): any {
    const result = {
      'datatable-body-cell': true,
    };
    // let cls = 'datatable-body-cell';
    if (this.column.cellClass) {
      if (typeof this.column.cellClass === 'string') {
        // cls += ' ' + this.column.cellClass;
        result[this.column.cellClass] = true;
      } else if(typeof this.column.cellClass === 'function') {
        const res = this.column.cellClass({
          row: this.row,
          group: this.group,
          column: this.column,
          value: this.value ,
          rowHeight: this.rowHeight
        });

        if (typeof res === 'string') {
          // cls += res;
          result[res] = true;
        } else if (typeof res === 'object') {
          const keys = Object.keys(res);
          for (const k of keys) {
            if (res[k] === true) {
              // cls += ` ${k}`;
              result[` ${k}`] = true;
            }
          }
        }
      }
    }
    result['sort-active'] = !this.sortDir;
    result['active'] = !this.isFocused;
    result['sort-asc'] = this.sortDir === SortDirection.asc;
    result['sort-desc'] = this.sortDir === SortDirection.desc;
    // if (!this.sortDir) cls += ' sort-active';
    // if (this.isFocused) cls += ' active';
    // if (this.sortDir === SortDirection.asc) cls += ' sort-asc';
    // if (this.sortDir === SortDirection.desc) cls += ' sort-desc';
    // return cls;
    return result;
  }

  get styleObject() {
    return {
      width: this.column.width + 'px',
      minWidth: this.column.minWidth + 'px',
      maxWidth: this.column.maxWidth + 'px',
      height: this.height,
      'margin-left': this.calcLeftMargin(this.column, this.row) + 'px',
    };
  }

  get height(): string | number {
    const height = this.rowHeight;
    if (isNaN(height)) return height;
    return height + 'px';
  }

  destroyed(): void {
    // todo
    // if (this.cellTemplate) {
    //   this.cellTemplate.clear();
    // }
  }

  checkValueUpdates(): void {
    let value = '';

    if (!this.row || !this.column) {
      value = '';
    } else {
      // todo: make transform by vue filters
      // const val = this.column.$$valueGetter(this.row, this.column.prop);
      // const userPipe: PipeTransform = this.column.pipe;

      // if (userPipe) {
      //   value = userPipe.transform(val);
      // } else if (value !== undefined) {
      //   value = val;
      // }
      value = this.column.$$valueGetter(this.row, this.column.prop);
    }

    if(this.value !== value) {
      this.value = value;
      this.cellContext.value = value;
      this.sanitizedValue = value !== null && value !== undefined ? this.stripHtml(value) : value;
    }
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }

  onClick(event: MouseEvent): void {
    this.$emit('activate', {
      type: 'click',
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this.$el
    });
  }

  onDblClick(event: MouseEvent): void {
    this.$emit('activate', {
      type: 'dblclick',
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this.$el
    });
  }

  onKeyDown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isTargetCell = event.target === this.$el;

    const isAction =
      keyCode === Keys.return ||
      keyCode === Keys.down ||
      keyCode === Keys.up ||
      keyCode === Keys.left ||
      keyCode === Keys.right;

    if (isAction && isTargetCell) {
      event.preventDefault();
      event.stopPropagation();

      this.$emit('activate', {
        type: 'keydown',
        event,
        row: this.row,
        group: this.group,
        rowHeight: this.rowHeight,
        column: this.column,
        value: this.value,
        cellElement: this.$el
      });
    }
  }

  onCheckboxChange(event: any): void {
    this.$emit('activate', {
      type: 'checkbox',
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this.$el,
      treeStatus: 'collapsed'
    });
  }

  calcSortDir(sorts: any[]): any {
    if (!sorts) return;

    const sort = sorts.find((s: any) => {
      return s.prop === this.column.prop;
    });

    if (sort) return sort.dir;
  }

  stripHtml(html: string): string {
    if(!html.replace) return html;
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  }

  onTreeAction(row: any) {
    this.$emit('treeAction', row);
  }

  calcLeftMargin(column: any, row: any) {
    const levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
    return column.isTreeColumn ? row.level * levelIndent : 0;
  }

}
*/


/***/ }),

/***/ "./node_modules/ts-loader/index.js?!./node_modules/tslint-loader/index.js!./src/components/body/body-row-wrapper.component.ts?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--4!./node_modules/tslint-loader!./src/components/body/body-row-wrapper.component.ts?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var body_group_header_component_1 = __webpack_require__(/*! ./body-group-header.component */ "./src/components/body/body-group-header.component.ts");
var body_row_detail_component_1 = __webpack_require__(/*! ./body-row-detail.component */ "./src/components/body/body-row-detail.component.ts");
var body_row_component_vue_1 = __webpack_require__(/*! ./body-row.component.vue */ "./src/components/body/body-row.component.vue");
var DataTableRowWrapperComponent = /** @class */ (function (_super) {
    __extends(DataTableRowWrapperComponent, _super);
    function DataTableRowWrapperComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataTableRowWrapperComponent.prototype.mounted = function () {
        this.$emit('set-row-element', this.$el);
    };
    DataTableRowWrapperComponent.prototype.updated = function () {
        this.$emit('set-row-element', this.$el);
    };
    DataTableRowWrapperComponent.prototype.onContextmenu = function ($event) {
        this.$emit('rowContextmenu', { event: $event, row: this.row });
    };
    Object.defineProperty(DataTableRowWrapperComponent.prototype, "groupHeaderStyles", {
        get: function () {
            var styles = {};
            styles['transform'] = 'translate3d(' + this.offsetX + 'px, 0px, 0px)';
            styles['backface-visibility'] = 'hidden';
            styles['width'] = this.innerWidth;
            styles['height'] = this.groupRowHeight ? this.groupRowHeight + 'px' : 'auto';
            return styles;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableRowWrapperComponent.prototype, "innerWidth", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableRowWrapperComponent.prototype, "rowDetail", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableRowWrapperComponent.prototype, "groupHeader", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableRowWrapperComponent.prototype, "groupLevel", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableRowWrapperComponent.prototype, "offsetX", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableRowWrapperComponent.prototype, "rowDetailHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableRowWrapperComponent.prototype, "groupRowHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "row", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DataTableRowWrapperComponent.prototype, "groupRowsBy", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableRowWrapperComponent.prototype, "rowIndex", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableRowWrapperComponent.prototype, "expanded", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "styleObject", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "groupHeaderSlot", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "rowDetailSlot", void 0);
    DataTableRowWrapperComponent = __decorate([
        vue_property_decorator_1.Component({
            name: 'datatable-row-wrapper',
            components: {
                'datatable-group-header': body_group_header_component_1.default,
                'datatable-row-detail': body_row_detail_component_1.default,
                'datatable-body-row': body_row_component_vue_1.default,
            },
        })
    ], DataTableRowWrapperComponent);
    return DataTableRowWrapperComponent;
}(vue_property_decorator_1.Vue));
exports.default = DataTableRowWrapperComponent;


/***/ }),

/***/ "./node_modules/ts-loader/index.js?!./node_modules/tslint-loader/index.js!./src/components/body/body-row.component.ts?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--4!./node_modules/tslint-loader!./src/components/body/body-row.component.ts?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var keys_1 = __webpack_require__(/*! ../../utils/keys */ "./src/utils/keys.ts");
var body_cell_component_vue_1 = __webpack_require__(/*! ./body-cell.component.vue */ "./src/components/body/body-cell.component.vue");
var DataTableBodyRowComponent = /** @class */ (function (_super) {
    __extends(DataTableBodyRowComponent, _super);
    function DataTableBodyRowComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.counter = 0; // it's need to update cells after row's changing
        _this.isFocused = false;
        return _this;
    }
    DataTableBodyRowComponent.prototype.created = function () {
        if (this.renderTracking) {
            this.$emit('row-created', this.row);
        }
    };
    DataTableBodyRowComponent.prototype.updated = function () {
        if (this.renderTracking) {
            this.$emit('row-updated', this.row);
        }
        if (this.isFocused) {
            this.$el.focus();
        }
    };
    // @Watch('row', { deep: true }) onRowChanged(newVal, oldVal) {
    //   if (newVal === oldVal) {
    //     // there was only row's properties changed - it's need to update cells
    //     this.counter++;
    //   }
    // }
    DataTableBodyRowComponent.prototype.onCellRendered = function (column) {
        this.$emit('row-updated', this.row);
    };
    DataTableBodyRowComponent.prototype.onFocus = function () {
        this.isFocused = true;
    };
    DataTableBodyRowComponent.prototype.onBlur = function () {
        this.isFocused = false;
    };
    DataTableBodyRowComponent.prototype.onActivate = function (event, index) {
        event.cellIndex = index;
        event.rowElement = this.$el;
        this.$emit('activate', event);
    };
    DataTableBodyRowComponent.prototype.onKeyDown = function (event) {
        var keyCode = event.keyCode;
        var isTargetRow = event.target === this.$el;
        var isAction = keyCode === keys_1.Keys.return ||
            keyCode === keys_1.Keys.down ||
            keyCode === keys_1.Keys.up ||
            keyCode === keys_1.Keys.pageUp ||
            keyCode === keys_1.Keys.pageDown;
        if (isAction && isTargetRow) {
            event.preventDefault();
            event.stopPropagation();
            this.$emit('activate', {
                type: 'keydown',
                event: event,
                row: this.row,
                rowIndex: this.rowContext.rowIndex,
                rowElement: this.$el
            });
        }
    };
    DataTableBodyRowComponent.prototype.onMouseenter = function (event) {
        this.$emit('activate', {
            type: 'mouseenter',
            event: event,
            row: this.row,
            rowElement: this.$el
        });
    };
    DataTableBodyRowComponent.prototype.onTreeAction = function (event) {
        this.$emit('tree-action', event);
    };
    Object.defineProperty(DataTableBodyRowComponent.prototype, "styles", {
        get: function () {
            if (this.rowContext) {
                return {
                    width: this.columnGroupWidths.total + 'px',
                    height: this.rowContext.rowHeight + 'px',
                };
            }
            return {
                width: this.columnGroupWidths.total + 'px',
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyRowComponent.prototype, "row", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyRowComponent.prototype, "rowContext", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DataTableBodyRowComponent.prototype, "group", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DataTableBodyRowComponent.prototype, "columnsByPin", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyRowComponent.prototype, "columnGroupWidths", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyRowComponent.prototype, "groupStyles", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableBodyRowComponent.prototype, "groupClass", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyRowComponent.prototype, "displayCheck", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyRowComponent.prototype, "slots", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableBodyRowComponent.prototype, "renderTracking", void 0);
    DataTableBodyRowComponent = __decorate([
        vue_property_decorator_1.Component({
            components: {
                'datatable-body-cell': body_cell_component_vue_1.default,
            }
        })
    ], DataTableBodyRowComponent);
    return DataTableBodyRowComponent;
}(vue_property_decorator_1.Vue));
exports.default = DataTableBodyRowComponent;


/***/ }),

/***/ "./node_modules/ts-loader/index.js?!./node_modules/tslint-loader/index.js!./src/components/body/body.component.ts?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--4!./node_modules/tslint-loader!./src/components/body/body.component.ts?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var utils_1 = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
var types_1 = __webpack_require__(/*! ../../types */ "./src/types/index.ts");
var scroller_component_1 = __webpack_require__(/*! ./scroller.component */ "./src/components/body/scroller.component.ts");
var selection_component_1 = __webpack_require__(/*! ./selection.component */ "./src/components/body/selection.component.ts");
var progress_bar_component_1 = __webpack_require__(/*! ./progress-bar.component */ "./src/components/body/progress-bar.component.ts");
// import DataTableRowWrapperComponent from './body-row-wrapper.component.vue';
// import DataTableBodyRowComponent from './body-row.component.vue';
var summary_row_component_1 = __webpack_require__(/*! ./summary/summary-row.component */ "./src/components/body/summary/summary-row.component.ts");
var scrollbar_helper_service_1 = __webpack_require__(/*! ../../services/scrollbar-helper.service */ "./src/services/scrollbar-helper.service.ts");
var body_group_header_component_1 = __webpack_require__(/*! ./body-group-header.component */ "./src/components/body/body-group-header.component.ts");
var body_row_detail_component_1 = __webpack_require__(/*! ./body-row-detail.component */ "./src/components/body/body-row-detail.component.ts");
var body_row_wrapper_component_vue_1 = __webpack_require__(/*! ./body-row-wrapper.component.vue */ "./src/components/body/body-row-wrapper.component.vue");
var body_row_component_vue_1 = __webpack_require__(/*! ./body-row.component.vue */ "./src/components/body/body-row.component.vue");
var check_type_1 = __webpack_require__(/*! ../../types/check.type */ "./src/types/check.type.ts");
var DataTableBodyComponent = /** @class */ (function (_super) {
    __extends(DataTableBodyComponent, _super);
    function DataTableBodyComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scroller = null; // ScrollerComponent
        _this.selector = null; // DataTableSelectionComponent;
        _this.rowHeightsCache = new utils_1.RowHeightCache();
        _this.offsetY = 0;
        _this.myOffset = 0;
        _this.myOffsetX = 0;
        _this.indexes = {};
        _this.columnGroupWidths = null;
        _this.columnGroupWidthsWithoutGroup = null;
        _this.rowIndexes = new Map();
        _this.rowExpansions = new Map();
        _this.myBodyHeight = null;
        _this.columnsByPin = null;
        _this.groupStyles = {
            left: {},
            center: {},
            right: {}
        };
        _this.onBodyScrollHandler = utils_1.throttle(_this.onBodyScroll.bind(_this), 10, { trailing: true });
        _this.rowContexts = [];
        _this.scrollbarHelper = new scrollbar_helper_service_1.ScrollbarHelper();
        _this.renderCounter = 0;
        _this.renderId = null;
        /**
         * Get the height of the detail row.
         */
        _this.getDetailRowHeight = function (row, index) {
            if (!_this.rowDetail) {
                return 0;
            }
            var rowHeight = _this.rowDetailHeight || _this.getRowHeight(row) || 50;
            return typeof rowHeight === 'function' ? rowHeight(row, index) : Number(rowHeight);
        };
        return _this;
    }
    // ready = false;
    // startIndex = 0;
    // endIndex = 0;
    // length = 0;
    // oldScrollTop = null;
    // oldScrollBottom = null;
    // offsetTop = 0;
    // height = 0;
    // @Output() scroll: EventEmitter<any> = new EventEmitter();
    // @Output() page: EventEmitter<any> = new EventEmitter();
    // @Output() activate: EventEmitter<any> = new EventEmitter();
    // @Output() select: EventEmitter<any> = new EventEmitter();
    // @Output() detailToggle: EventEmitter<any> = new EventEmitter();
    // @Output() rowContextmenu = new EventEmitter<{ event: MouseEvent, row: any }>(false);
    // @Output() treeAction: EventEmitter<any> = new EventEmitter();
    /**
     * Creates an instance of DataTableBodyComponent.
     */
    DataTableBodyComponent.prototype.created = function () {
        var _this = this;
        // declare fn here so we can get access to the `this` property
        this.rowTrackingFn = function (row) {
            var idx = _this.getRowIndex(row);
            if (_this.trackByProp) {
                return idx + "-" + _this.trackByProp;
            }
            else {
                return idx;
            }
        };
    };
    DataTableBodyComponent.prototype.mounted = function () {
        this.selector = this.$refs.selector;
        this.scroller = this.$refs.scroller;
    };
    DataTableBodyComponent.prototype.onPageSize = function () {
        this.recalcLayout();
    };
    DataTableBodyComponent.prototype.onRowsChanged = function () {
        var _this = this;
        var _a;
        // this.updateVisibleItems(true);
        this.rowsChanged = true;
        this.rowExpansions.clear();
        var updateOffset = ((_a = this.rows) === null || _a === void 0 ? void 0 : _a.length) && this.offset && this.offsetY === 0;
        this.recalcLayout(updateOffset);
        this.$nextTick(function () {
            _this.scroller = _this.$refs.scroller;
        });
    };
    // @Watch('groupedRows') onGroupedRowsChanged() {
    //   this.onRowsChanged();
    // }
    DataTableBodyComponent.prototype.onSelectedChanged = function () {
        // this.mySelected = [...this.selected];
        this.mySelected = this.selected;
    };
    DataTableBodyComponent.prototype.onColumnsChanged = function (newVal, oldVal) {
        this.recalculateColumns();
        this.buildStylesByGroup();
    };
    DataTableBodyComponent.prototype.onOffsetChanged = function () {
        this.myOffset = this.offset;
    };
    DataTableBodyComponent.prototype.onOffsetXChanged = function () {
        this.myOffsetX = this.offsetX;
    };
    DataTableBodyComponent.prototype.onMyOffsetXChanged = function () {
        this.buildStylesByGroup();
    };
    DataTableBodyComponent.prototype.onInnerWidthChanged = function () {
        this.recalculateColumns();
        this.buildStylesByGroup();
    };
    DataTableBodyComponent.prototype.onMyOffsetChanged = function () {
        this.recalcLayout();
    };
    DataTableBodyComponent.prototype.onRowCountChanged = function () {
        this.recalcLayout();
    };
    DataTableBodyComponent.prototype.onBodyHeightChanged = function () {
        this.myBodyHeight = this.bodyHeight;
        if (this.myBodyHeight === -1) {
            this.myBodyHeight = '0px';
            return;
        }
        else {
            if (this.scrollbarV) {
                this.myBodyHeight += 'px';
            }
            else {
                this.myBodyHeight = 'auto';
            }
            this.recalcLayout();
        }
    };
    Object.defineProperty(DataTableBodyComponent.prototype, "bodyWidth", {
        get: function () {
            if (this.scrollbarH) {
                return this.innerWidth + 'px';
            }
            else {
                return '100%';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "styleObject", {
        get: function () {
            return {
                width: this.bodyWidth ? this.bodyWidth : 'auto',
                height: this.myBodyHeight ? this.myBodyHeight : 'auto',
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "selectEnabled", {
        /**
         * Returns if selection is enabled.
         */
        get: function () {
            return !!this.selectionType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "checkEnabled", {
        get: function () {
            return this.checkMode === check_type_1.CheckMode.checkNoSelect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "fixedRowHeight", {
        get: function () {
            if (this.rowHeight && typeof this.rowHeight === 'number') {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "scrollHeight", {
        /**
         * Property that would calculate the height of scroll bar
         * based on the row heights cache for virtual scroll and virtualization. Other scenarios
         * calculate scroll height automatically (as height will be undefined).
         */
        get: function () {
            if (this.scrollbarV && this.virtualization && this.rowCount) {
                if (this.fixedRowHeight) {
                    var height = this.rowHeight;
                    return height * this.rowCount;
                }
                return this.rowHeightsCache.query(this.rowCount - 1);
            }
            // avoid TS7030: Not all code paths return a value.
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "scrollWidth", {
        get: function () {
            return this.columnGroupWidths ? this.columnGroupWidths.total : 'auto';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called once, before the instance is destroyed.
     */
    DataTableBodyComponent.prototype.destroyed = function () {
        // todo
        // if (this.rowDetail) this.listener.unsubscribe();
        // if (this.groupHeader) this.listener.unsubscribe();
    };
    DataTableBodyComponent.prototype.reset = function () {
        this.offsetX = 0;
        this.offsetY = 0;
    };
    DataTableBodyComponent.prototype.onSelect = function (event) {
        this.$emit('select', event);
    };
    DataTableBodyComponent.prototype.recalculateColumns = function (val) {
        if (val === void 0) { val = this.columns; }
        var colsByPin = utils_1.columnsByPin(this.columns);
        this.columnsByPin = utils_1.columnsByPinArr(this.columns);
        var width = this.innerWidth;
        if (this.scrollbarV) {
            width = width - this.scrollbarHelper.width;
        }
        this.columnGroupWidths = utils_1.columnGroupWidths(colsByPin, this.columns, width);
    };
    /**
     * Updates the Y offset given a new offset.
     */
    DataTableBodyComponent.prototype.updateOffsetY = function (offset, fromPager) {
        if (fromPager === void 0) { fromPager = false; }
        // scroller is missing on empty table
        if (!this.scroller)
            return;
        var offsetY = 0;
        if (this.scrollbarV && this.virtualization && offset) {
            // First get the row Index that we need to move to.
            var rowIndex = this.pageSize * offset;
            offsetY = this.rowHeightsCache.query(rowIndex - 1);
        }
        else if (this.scrollbarV && !this.virtualization) {
            offsetY = 0;
        }
        if (offset && !offsetY) {
            return 0;
        }
        this.scroller.setOffset(offsetY || 0, fromPager);
        return offsetY || 0;
    };
    DataTableBodyComponent.prototype.onScrollSetup = function (event) {
        this.offsetX = event.scrollXPos;
        this.offsetY = event.scrollYPos;
    };
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     */
    DataTableBodyComponent.prototype.onBodyScroll = function (event) {
        var _this = this;
        var scrollYPos = event.scrollYPos;
        var scrollXPos = event.scrollXPos;
        // if scroll change, trigger update
        // this is mainly used for header cell positions
        if (this.offsetY !== scrollYPos || this.myOffsetX !== scrollXPos) { // Math.abs(scrollYPos - this.offsetY) > 50
            this.$emit('scroll', {
                offsetY: scrollYPos,
                offsetX: scrollXPos
            });
        }
        this.offsetY = scrollYPos;
        this.myOffsetX = scrollXPos;
        this.$nextTick(function () {
            _this.updateIndexes(event.direction);
            _this.updatePage(event.direction, event.fromPager);
            _this.updateRows();
        });
    };
    /**
     * Updates the page given a direction.
     */
    DataTableBodyComponent.prototype.updatePage = function (direction, fromPager) {
        var offset = this.indexes.first / this.pageSize;
        if (fromPager) {
            offset = Math.ceil(offset);
        }
        else {
            if (direction === 'up') {
                offset = Math.ceil(offset);
            }
            else if (direction === 'down') {
                offset = Math.floor(offset);
            }
        }
        if (!fromPager && ['up', 'down'].includes(direction) && !isNaN(offset)) {
            this.$emit('page', { offset: offset });
        }
    };
    /**
     * Updates the rows in the view port
     */
    DataTableBodyComponent.prototype.updateRows = function (force) {
        if (force === void 0) { force = false; }
        var _a = this.indexes, first = _a.first, last = _a.last;
        if (!force && !this.rowsChanged && this.lastFirst === first && this.lastLast === last) {
            // console.log('this.lastFirst === first');
            return;
        }
        this.rowsChanged = false;
        this.lastFirst = first;
        this.lastLast = last;
        this.lastRowCount = this.rowCount;
        // if (!this.pagination) {
        //   first = Math.max(0, first - 20);
        //   last = Math.min(this.rowCount, last + 10);
        // }
        var rowIndex = first;
        var idx = 0;
        this.rowIndexes.clear();
        // if grouprowsby has been specified treat row paging
        // parameters as group paging parameters ie if limit 10 has been
        // specified treat it as 10 groups rather than 10 rows
        // if (this.groupedRows) {
        //   let maxRowsPerGroup = 3;
        //   // if there is only one group set the maximum number of
        //   // rows per group the same as the total number of rows
        //   if (this.groupedRows.length === 1) {
        //     maxRowsPerGroup = this.groupedRows[0].value.length;
        //   }
        //   let index = 0; 
        //   while (rowIndex < last && rowIndex < this.groupedRows.length) {
        //     // Add the groups into this page
        //     const group = this.groupedRows[rowIndex];
        //     group.value.forEach(row => this.rowIndexes.set(row, ++index));
        //     temp[idx] = group;
        //     idx++;
        //     // Group index in this context
        //     rowIndex++;
        //   }
        // } else {
        var temp = [];
        var rowContext;
        while (rowIndex < last && rowIndex < this.rowCount) {
            var row = this.rows[rowIndex];
            if (row) {
                this.rowIndexes.set(row, rowIndex);
                rowContext = this.rowContexts[idx];
                if (!rowContext) {
                    rowContext = {};
                }
                rowContext.row = row;
                rowContext.rowIndex = rowIndex;
                rowContext.rowHeight = this.getRowHeight(row);
                rowContext.isSelected = this.isSelect(row);
                rowContext.isChecked = this.isChecked(row);
                rowContext.expanded = this.getRowExpanded(row);
                rowContext.treeStatus = this.treeStatus(row);
                temp[idx] = rowContext;
                // temp[idx] = {
                //   row,
                //   rowIndex,
                //   rowHeight: this.getRowHeight(row),
                //   isSelected: this.isSelect(row),
                //   isChecked: this.isChecked(row),
                //   expanded: this.getRowExpanded(row),
                //   treeStatus: this.treeStatus(row)
                // };
                idx++;
            }
            rowIndex++;
        }
        // }
        this.rowContexts = temp;
        // console.log('updateRows first = ', first);
    };
    /**
     * Get the row height
     */
    DataTableBodyComponent.prototype.getRowHeight = function (row) {
        // if its a function return it
        if (typeof this.rowHeight === 'function') {
            return this.rowHeight(row);
        }
        return this.rowHeight;
    };
    /**
     * @param group the group with all rows
     */
    DataTableBodyComponent.prototype.getGroupHeight = function (group) {
        var rowHeight = 0;
        if (group.value) {
            for (var index = 0; index < group.value.length; index++) {
                rowHeight += this.getRowAndDetailHeight(group.value[index]);
            }
        }
        return rowHeight;
    };
    /**
     * Calculate row height based on the expanded state of the row.
     */
    DataTableBodyComponent.prototype.getRowAndDetailHeight = function (row) {
        var rowHeight = this.getRowHeight(row);
        var expanded = this.rowExpansions.get(row);
        // Adding detail row height if its expanded.
        if (expanded === 1) {
            rowHeight += this.getDetailRowHeight(row);
        }
        return rowHeight;
    };
    /**
     * Calculates the styles for the row so that the rows can be moved in 2D space
     * during virtual scroll inside the DOM.   In the below case the Y position is
     * manipulated.   As an example, if the height of row 0 is 30 px and row 1 is
     * 100 px then following styles are generated:
     *
     * transform: translate3d(0px, 0px, 0px);    ->  row0
     * transform: translate3d(0px, 30px, 0px);   ->  row1
     * transform: translate3d(0px, 130px, 0px);  ->  row2
     *
     * Row heights have to be calculated based on the row heights cache as we wont
     * be able to determine which row is of what height before hand.  In the above
     * case the positionY of the translate3d for row2 would be the sum of all the
     * heights of the rows before it (i.e. row0 and row1).
     *
     * @param {*} row The row that needs to be placed in the 2D space.
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.getRowWrapperStyles = function (rowContext) {
        if (!rowContext) {
            return null;
        }
        var styles = {};
        // only add styles for the group if there is a group
        if (this.groupRowsBy) {
            styles['width'] = this.columnGroupWidths.total;
        }
        if (this.scrollbarV && this.virtualization) {
            var idx = 0;
            // let row = rows;
            // if (this.groupedRows) {
            //   // Get the latest row rowindex in a group
            //   row = rows[rows.length - 1];
            //   idx = row ? this.getRowIndex(row) : 0;
            // } else {
            idx = rowContext.rowIndex;
            // }
            // const pos = idx * rowHeight;
            // The position of this row would be the sum of all row heights
            // until the previous row position.
            var pos = 0;
            var height = 50;
            if (this.fixedRowHeight && !this.rowDetail) {
                height = this.rowHeight;
                pos = idx * height;
            }
            else {
                pos = this.rowHeightsCache.query(idx - 1);
            }
            utils_1.translateXY(styles, 0, pos);
        }
        return styles;
    };
    DataTableBodyComponent.prototype.getRowOffsetY = function (index) {
        var result = this.rowHeightsCache.queryWithHeight(index);
        if (!result) {
            result = { height: 0, offsetY: 0 };
        }
        return result;
    };
    /**
     * Calculate bottom summary row offset for scrollbar mode.
     * For more information about cache and offset calculation
     * see description for `getRowsStyles` method
     *
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.getBottomSummaryRowStyles = function () {
        if (!this.scrollbarV || !this.rows || !this.rows.length) {
            return null;
        }
        var styles = { position: 'absolute' };
        var pos = this.rowHeightsCache.query(this.rows.length - 1);
        utils_1.translateXY(styles, 0, pos);
        return styles;
    };
    /**
     * Hides the loading indicator
     */
    // hideIndicator(): void {
    //   setTimeout(() => this.loadingIndicator = false, 500);
    // }
    /**
     * Updates the index of the rows in the viewport
     */
    DataTableBodyComponent.prototype.updateIndexes = function (direction) {
        var first = 0;
        var last = 0;
        if (this.scrollbarV && !this.limit) {
            if (this.virtualization) {
                // Calculation of the first and last indexes will be based on where the
                // scrollY position would be at.  The last index would be the one
                // that shows up inside the view port the last.
                var height = parseInt(this.myBodyHeight, 0);
                first = this.rowHeightsCache.getRowIndex(this.offsetY, true);
                last = this.rowHeightsCache.getRowIndex(height + this.offsetY);
            }
            else {
                // If virtual rows are not needed
                // We render all in one go
                first = 0;
                last = this.rowCount;
            }
        }
        else {
            // The server is handling paging and will pass an array that begins with the
            // element at a specified offset.  first should always be 0 with external paging.
            if (!this.externalPaging) {
                first = Math.max(this.myOffset * this.pageSize, 0);
            }
            last = Math.min((first + this.pageSize), this.rowCount);
        }
        if (direction === 'down') {
            first = first === 0 ? 0 : first + 1;
        }
        this.indexes = { first: first, last: last };
    };
    /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     */
    DataTableBodyComponent.prototype.refreshRowHeightCache = function () {
        if (!this.scrollbarV || (this.scrollbarV && !this.virtualization))
            return;
        // clear the previous row height cache if already present.
        // this is useful during sorts, filters where the state of the
        // rows array is changed.
        this.rowHeightsCache.clearCache();
        // Initialize the tree only if there are rows inside the tree.
        if (this.rows && this.rows.length) {
            this.rowHeightsCache.initCache({
                rows: this.rows,
                rowHeight: this.rowHeight,
                rowDetailHeight: this.getDetailRowHeight,
                groupRowHeight: this.groupRowHeight,
                externalVirtual: this.scrollbarV && this.externalPaging,
                rowCount: this.rowCount,
                rowIndexes: this.rowIndexes,
                rowExpansions: this.rowExpansions
            });
        }
    };
    /**
     * Gets the index for the view port
     */
    DataTableBodyComponent.prototype.getAdjustedViewPortIndex = function () {
        // Capture the row index of the first row that is visible on the viewport.
        // If the scroll bar is just below the row which is highlighted then make that as the
        // first index.
        var viewPortFirstRowIndex = this.indexes.first;
        if (this.scrollbarV && this.virtualization) {
            var offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex - 1);
            return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
        }
        return viewPortFirstRowIndex;
    };
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     */
    DataTableBodyComponent.prototype.toggleRowExpansion = function (rowContext) {
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        var expanded = Number(rowContext.expanded);
        // If the rowDetailHeight is auto --> only in case of non-virtualized scroll
        if (this.scrollbarV && this.virtualization) {
            var rowDetailHeight = this.getDetailRowHeight(rowContext.row) * (expanded ? -1 : 1);
            this.rowHeightsCache.update(rowContext.rowIndex, rowDetailHeight);
        }
        // Update the toggled row and update thive nevere heights in the cache.
        expanded = expanded ^= 1;
        this.rowExpansions.set(rowContext.row, expanded);
        this.$emit('detail-toggle', {
            rows: [rowContext.row],
            currentIndex: viewPortFirstRowIndex
        });
        return Boolean(expanded);
    };
    /**
     * Expand/Collapse all the rows no matter what their state is.
     */
    DataTableBodyComponent.prototype.toggleAllRows = function (expanded) {
        // clear prev expansions
        this.rowExpansions.clear();
        var rowExpanded = expanded ? 1 : 0;
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            this.rowExpansions.set(row, rowExpanded);
        }
        if (this.scrollbarV) {
            // Refresh the full row heights cache since every row was affected.
            this.recalcLayout();
        }
        // Emit all rows that have been expanded.
        this.$emit('detail-toggle', {
            rows: this.rows,
            currentIndex: viewPortFirstRowIndex
        });
    };
    DataTableBodyComponent.prototype.onGroupToggle = function ($event) {
        this.$emit('group-toggle', $event);
        // if ($event.type === 'group') {
        //   this.toggleRowExpansion($event.value);
        // } else if ($event.type === 'all') {
        //   this.toggleAllRows($event.value);
        // }
        // this.updateIndexes();
        // this.updateRows(true);
    };
    /**
     * Recalculates the table
     */
    DataTableBodyComponent.prototype.recalcLayout = function (updateOffset) {
        var _this = this;
        if (updateOffset === void 0) { updateOffset = false; }
        this.refreshRowHeightCache();
        if (updateOffset) {
            this.offsetY = this.updateOffsetY(this.offset, true);
        }
        this.updateIndexes();
        this.$nextTick(function () {
            _this.updateRows();
            if (updateOffset) {
                _this.updateOffsetY(_this.offset, true);
            }
        });
    };
    /**
     * Tracks the column
     */
    DataTableBodyComponent.prototype.columnTrackingFn = function (index, column) {
        return column.$$id;
    };
    /**
     * Gets the row pinning group styles
     */
    // stylesByGroup(group: string) {
    //   const widths = this.columnGroupWidths;
    //   const offsetX = this.myOffsetX;
    //   const styles = {
    //     width: `${widths[group]}px`
    //   };
    //   if (group === 'left') {
    //     translateXY(styles, offsetX, 0);
    //   } else if (group === 'right') {
    //     const bodyWidth = parseInt(this.innerWidth + '', 0);
    //     const totalDiff = widths.total - bodyWidth;
    //     const offsetDiff = totalDiff - offsetX;
    //     const offset = offsetDiff * -1;
    //     translateXY(styles, offset, 0);
    //   }
    //   return styles;
    // }
    DataTableBodyComponent.prototype.initExpansions = function (group) {
        this.rowExpansions.set(group, 1);
        if (group.groups) {
            for (var _i = 0, _a = group.groups; _i < _a.length; _i++) {
                var gr = _a[_i];
                this.initExpansions(gr);
            }
        }
    };
    /**
     * Returns if the row was expanded and set default row expansion when row expansion is empty
     */
    DataTableBodyComponent.prototype.getRowExpanded = function (row) {
        // if (this.rowExpansions.size === 0 && this.groupExpansionDefault && this.groupedRows) {
        //   for (const group of this.groupedRows) {
        //     this.initExpansions(group);
        //   }
        // }
        if (!this.rowDetail) {
            return false;
        }
        var expanded = this.rowExpansions.get(row);
        return expanded === 1;
    };
    /**
     * Gets the row index given a row
     */
    DataTableBodyComponent.prototype.getRowIndex = function (row) {
        return row ? this.rowIndexes.get(row) || 0 : 0;
    };
    DataTableBodyComponent.prototype.onTreeAction = function (event) {
        this.$emit('tree-action', event);
    };
    DataTableBodyComponent.prototype.isSelect = function (row) {
        if (!this.selectEnabled) {
            return false;
        }
        return this.selector ? this.selector.getRowSelected(row) : false;
    };
    DataTableBodyComponent.prototype.isChecked = function (row) {
        if (!this.checkEnabled) {
            return false;
        }
        return this.selector ? this.selector.getRowChecked(row) : false;
    };
    DataTableBodyComponent.prototype.onActivate = function (event, index) {
        this.selector && this.selector.onActivate(event, this.indexes.first + index);
    };
    DataTableBodyComponent.prototype.onRowRendered = function (row) {
        var _this = this;
        if (this.renderCounter === 0) {
            console.time('render');
        }
        this.renderCounter++;
        var counter = this.renderCounter;
        clearTimeout(this.renderId);
        this.renderId = setTimeout(function () { return _this.checkRenderFinish(counter); }, 100);
    };
    DataTableBodyComponent.prototype.checkRenderFinish = function (counter) {
        var _this = this;
        if (counter === this.renderCounter) {
            console.timeEnd('render');
            this.renderCounter = 0;
            this.$emit('rendered');
        }
        else {
            counter = this.renderCounter;
            clearTimeout(this.renderId);
            this.renderId = setTimeout(function () { return _this.checkRenderFinish(counter); }, 100);
        }
    };
    DataTableBodyComponent.prototype.buildStylesByGroup = function () {
        this.groupStyles['left'] = this.calcStylesByGroup('left');
        this.groupStyles['center'] = this.calcStylesByGroup('center');
        this.groupStyles['right'] = this.calcStylesByGroup('right');
    };
    DataTableBodyComponent.prototype.calcStylesByGroup = function (group) {
        var widths = this.columnGroupWidths;
        var offsetX = this.myOffsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            utils_1.translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            var bodyWidth = parseInt(this.innerWidth + '', 0);
            var totalDiff = widths.total - bodyWidth;
            var offsetDiff = totalDiff - offsetX;
            var offset = (offsetDiff + this.scrollbarHelper.width) * -1;
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    DataTableBodyComponent.prototype.getGroupStyles = function (colGroup) {
        if (colGroup && colGroup.type) {
            return __assign({ width: this.columnGroupWidths.total + 'px' }, this.groupStyles[colGroup.type]);
        }
        return {
            width: this.columnGroupWidths.total + 'px',
        };
    };
    DataTableBodyComponent.prototype.treeStatus = function (row) {
        if (!row) {
            return null;
        }
        return row.treeStatus;
    };
    DataTableBodyComponent.prototype.getGroupClass = function (row, rowIndex) {
        var cls = 'datatable-body-row';
        if (this.isSelect(row))
            cls += ' active';
        if (rowIndex % 2 !== 0) {
            cls += ' datatable-row-odd';
        }
        else {
            cls += ' datatable-row-even';
        }
        if (this.rowClass) {
            var res = this.rowClass(row, rowIndex);
            if (typeof res === 'string') {
                cls += " " + res;
            }
            else if (typeof res === 'object') {
                var keys = Object.keys(res);
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var k = keys_1[_i];
                    if (res[k] === true)
                        cls += " " + k;
                }
            }
        }
        return cls;
    };
    Object.defineProperty(DataTableBodyComponent.prototype, "cellSlots", {
        get: function () {
            var result = {};
            this.columns && this.columns.forEach(function (column) {
                if (column.cellTemplate) {
                    result[column.prop] = column.cellTemplate;
                }
            });
            return function () { return result; };
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyComponent.prototype.onCellFocus = function ($event) {
        console.log('onCellFocus($event)');
    };
    /**
     * Toggle the expansion of the row
     */
    DataTableBodyComponent.prototype.toggleExpandDetail = function (row) {
        var rowContext = this.rowContexts.find(function (c) { return c.row === row; });
        if (!rowContext) {
            throw new Error("row context is not found for row " + row);
        }
        rowContext.expanded = this.toggleRowExpansion(row);
        this.updateIndexes();
        this.updateRows(true);
        this.$emit('detail-toggle', {
            type: 'row',
            value: row
        });
    };
    /**
     * Expand all the rows.
     */
    DataTableBodyComponent.prototype.expandAllDetails = function () {
        this.toggleAllRows(true);
        this.$emit('detail-toggle', {
            type: 'all',
            value: true
        });
    };
    /**
     * Collapse all the rows.
     */
    DataTableBodyComponent.prototype.collapseAllDetails = function () {
        this.toggleAllRows(false);
        this.$emit('detail-toggle', {
            type: 'all',
            value: false
        });
    };
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "scrollbarV", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "scrollbarH", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "loadingIndicator", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "externalPaging", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "groupRowHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "offsetX", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "emptyMessage", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "selectionType", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "checkMode", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Array, default: function () { return []; } }),
        __metadata("design:type", Array)
    ], DataTableBodyComponent.prototype, "selected", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Array, default: function () { return []; } }),
        __metadata("design:type", Array)
    ], DataTableBodyComponent.prototype, "checked", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Function)
    ], DataTableBodyComponent.prototype, "rowIdentity", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "rowDetail", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowDetailHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "groupHeader", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "selectCheck", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "displayCheck", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "trackByProp", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowClass", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "groupExpansionDefault", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "innerWidth", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "groupRowsBy", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "virtualization", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "summaryRow", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "summaryPosition", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "summaryHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "pageSize", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "limit", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DataTableBodyComponent.prototype, "rows", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DataTableBodyComponent.prototype, "columns", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "offset", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "rowCount", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "bodyHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: [Number, String], default: null }),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "minItemHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: [String], default: 'height' }),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "heightField", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "groupHeaderSlot", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowDetailSlot", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "renderTracking", void 0);
    __decorate([
        vue_property_decorator_1.Watch('pageSize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableBodyComponent.prototype, "onPageSize", null);
    __decorate([
        vue_property_decorator_1.Watch('rows', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableBodyComponent.prototype, "onRowsChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('selected', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableBodyComponent.prototype, "onSelectedChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('columns', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], DataTableBodyComponent.prototype, "onColumnsChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('offset', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableBodyComponent.prototype, "onOffsetChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('offsetX', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableBodyComponent.prototype, "onOffsetXChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('myOffsetX'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableBodyComponent.prototype, "onMyOffsetXChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('innerWidth'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableBodyComponent.prototype, "onInnerWidthChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('myOffset'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableBodyComponent.prototype, "onMyOffsetChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('rowCount'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableBodyComponent.prototype, "onRowCountChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('bodyHeight', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableBodyComponent.prototype, "onBodyHeightChanged", null);
    DataTableBodyComponent = __decorate([
        vue_property_decorator_1.Component({
            components: {
                'datatable-selection': selection_component_1.default,
                'datatable-progress': progress_bar_component_1.default,
                'datatable-scroller': scroller_component_1.default,
                'datatable-summary-row': summary_row_component_1.default,
                'datatable-row-wrapper': body_row_wrapper_component_vue_1.default,
                'datatable-body-row': body_row_component_vue_1.default,
                'datatable-group-header': body_group_header_component_1.default,
                'datatable-row-detail': body_row_detail_component_1.default,
            }
        })
    ], DataTableBodyComponent);
    return DataTableBodyComponent;
}(vue_property_decorator_1.Vue));
exports.default = DataTableBodyComponent;


/***/ }),

/***/ "./node_modules/ts-loader/index.js?!./node_modules/tslint-loader/index.js!./src/components/datatable.component.ts?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--4!./node_modules/tslint-loader!./src/components/datatable.component.ts?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var utils_1 = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
var types_1 = __webpack_require__(/*! ../types */ "./src/types/index.ts");
var body_component_vue_1 = __webpack_require__(/*! ./body/body.component.vue */ "./src/components/body/body.component.vue");
// import { DatatableGroupHeaderDirective } from './body/body-group-header.directive';
// import { DataTableColumnDirective } from './columns';
// import { DatatableRowDetailDirective } from './row-detail';
// import { DatatableFooterDirective } from './footer';
var header_component_1 = __webpack_require__(/*! ./header/header.component */ "./src/components/header/header.component.ts");
var footer_component_1 = __webpack_require__(/*! ./footer/footer.component */ "./src/components/footer/footer.component.ts");
var scrollbar_helper_service_1 = __webpack_require__(/*! ../services/scrollbar-helper.service */ "./src/services/scrollbar-helper.service.ts");
var dimensions_helper_service_1 = __webpack_require__(/*! ../services/dimensions-helper.service */ "./src/services/dimensions-helper.service.ts");
var column_component_1 = __webpack_require__(/*! ./columns/column.component */ "./src/components/columns/column.component.ts");
var visibility_directive_1 = __webpack_require__(/*! ../directives/visibility.directive */ "./src/directives/visibility.directive.ts");
var equal_array_1 = __webpack_require__(/*! ../utils/equal.array */ "./src/utils/equal.array.ts");
var body_cell_component_vue_1 = __webpack_require__(/*! ./body/body-cell.component.vue */ "./src/components/body/body-cell.component.vue");
var check_type_1 = __webpack_require__(/*! ../types/check.type */ "./src/types/check.type.ts");
vue_property_decorator_1.Vue.component('datatable-column', column_component_1.default);
vue_property_decorator_1.Vue.component('datatable-body-cell', body_cell_component_vue_1.default);
var DatatableComponent = /** @class */ (function (_super) {
    __extends(DatatableComponent, _super);
    function DatatableComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.groupedRows = null;
        _this.innerWidth = 0;
        _this.pageSize = 0;
        _this.bodyHeight = 0;
        _this.rowCount = 0;
        _this.offsetX = 0;
        _this.internalRows = null;
        _this.initialRows = null;
        _this.internalColumns = null;
        _this.myColumnMode = types_1.ColumnMode.standard;
        _this.mySortType = types_1.SortType.single;
        _this.innerOffset = 0; // page number after scrolling
        _this.mySelected = [];
        _this.myChecked = [];
        _this.renderTracking = false;
        _this.isVisible = false;
        // non-reactive
        // mySorts: any[];
        // _columnTemplates: QueryList<DataTableColumnDirective>;
        // _subscriptions: Subscription[] = [];
        /**
         * Row Detail templates gathered from the ContentChild
         */
        // @ContentChild(DatatableRowDetailDirective)
        _this.rowDetail = false; // DatatableRowDetailDirective;
        /**
         * Group Header templates gathered from the ContentChild
         */
        // @ContentChild(DatatableGroupHeaderDirective)
        _this.groupHeader = false; // DatatableGroupHeaderDirective;
        _this.groupHeaderSlot = null;
        _this.rowDetailSlot = null;
        _this.footerSlot = null;
        _this.scrollbarHelper = new scrollbar_helper_service_1.ScrollbarHelper();
        _this.dimensionsHelper = new dimensions_helper_service_1.DimensionsHelper();
        return _this;
    }
    DatatableComponent.prototype.created = function () {
        this.groupHeader = Boolean(this.groupRowsBy);
        if (this.$listeners.rendered) {
            this.renderTracking = true;
        }
    };
    DatatableComponent.prototype.destroyed = function () {
        window.removeEventListener('resize', this.resizeHandler);
    };
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     */
    DatatableComponent.prototype.mounted = function () {
        var _this = this;
        this.bodyComponent = this.$refs.datatableBody; // as DataTableBodyComponent;
        this.headerComponent = this.$refs.datatableHeader; //  as DataTableHeaderComponent;
        this.groupHeaderSlot = this.$scopedSlots.groupHeader;
        this.rowDetailSlot = this.$scopedSlots.rowDetail;
        this.footerSlot = this.$scopedSlots.footer;
        this.rowDetail = Boolean(this.rowDetailSlot);
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.recalculate();
        if (!this.externalSorting) {
            this.sortInternalRows();
        }
        // this has to be done to prevent the change detection
        // tree from freaking out because we are readjusting
        if (typeof requestAnimationFrame === 'undefined') {
            return;
        }
        requestAnimationFrame(function () {
            _this.recalculate();
            // emit page for virtual server-side kickoff
            if (_this.externalPaging && _this.scrollbarV) {
                _this.$emit('page', {
                    count: _this.count,
                    pageSize: _this.pageSize,
                    limit: _this.limit,
                    offset: _this.innerOffset
                });
            }
            _this.resizeHandler = _this.onWindowResize.bind(_this);
            window.addEventListener('resize', _this.resizeHandler);
        });
    };
    /**
     * Body was scrolled typically in a `scrollbarV:true` scenario.
     */
    // @Output() scroll: EventEmitter<any> = new EventEmitter();
    /**
     * A cell or row was focused via keyboard or mouse click.
     */
    // @Output() activate: EventEmitter<any> = new EventEmitter();
    /**
     * A cell or row was selected.
     */
    // @Output() select: EventEmitter<any> = new EventEmitter();
    /**
     * Column sort was invoked.
     */
    // @Output() sort: EventEmitter<any> = new EventEmitter();
    /**
     * The table was paged either triggered by the pager or the body scroll.
     */
    // @Output() page: EventEmitter<any> = new EventEmitter();
    /**
     * Columns were re-ordered.
     */
    // @Output() reorder: EventEmitter<any> = new EventEmitter();
    /**
     * Column was resized.
     */
    // @Output() resize: EventEmitter<any> = new EventEmitter();
    /**
     * The context menu was invoked on the table.
     * type indicates whether the header or the body was clicked.
     * content contains either the column or the row that was clicked.
     */
    // @Output() tableContextmenu = new EventEmitter<{ event: MouseEvent, type: ContextmenuType, content: any }>(false);
    /**
     * A row was expanded ot collapsed for tree
     */
    // @Output() treeAction: EventEmitter<any> = new EventEmitter();
    DatatableComponent.prototype.onRowsChanged = function (val) {
        if (val) {
            this.internalRows = __spreadArrays(val);
        }
        var treeFrom = utils_1.optionalGetterForProp(this.treeFromRelation);
        var treeTo = utils_1.optionalGetterForProp(this.treeToRelation);
        if (treeFrom && treeTo) {
            this.initialRows = this.internalRows;
        }
        // auto sort on new updates
        if (!this.externalSorting) {
            this.sortInternalRows();
        }
        // auto group by parent on new update
        this.internalRows = utils_1.groupRowsByParents(this.internalRows, treeFrom, treeTo, this.lazyTree);
        this.groupedRows = null;
        if (this.rows && this.groupRowsBy) {
            // this.groupedRows = this.groupArrayBy(this.rows, this.groupRowsBy);
            this.groupedRows = this.groupArrayBy(this.rows, this.groupRowsBy, 0);
            this.internalRows = this.processGroupedRows(this.groupedRows);
        }
        // recalculate sizes/etc
        if (this.$el) {
            this.recalculate();
        }
    };
    DatatableComponent.prototype.addRow = function (group, rows) {
        var _this = this;
        // (group as any).__isGroup = true;
        // group.__expanded = true;
        rows.push(group);
        if (group.value && group.__expanded) {
            group.value.forEach(function (r) {
                rows.push(r);
            });
        }
        if (group.groups && group.__expanded) {
            group.groups.forEach(function (gr) {
                _this.addRow(gr, rows);
            });
        }
    };
    DatatableComponent.prototype.processGroupedRows = function (groupedRows) {
        var _this = this;
        var rows = [];
        if (groupedRows && groupedRows.length) {
            // creates a new array with the data grouped
            groupedRows.forEach(function (g) {
                _this.addRow(g, rows);
            });
        }
        return rows;
    };
    DatatableComponent.prototype.onGroupRowsByChanged = function (newVal, oldVal) {
        if (equal_array_1.isArrayEqual(newVal, oldVal)) {
            return;
        }
        this.groupHeader = Boolean(this.groupRowsBy);
        this.groupedRows = null;
        if (this.groupRowsBy) {
            this.groupedRows = this.groupArrayBy(this.rows, this.groupRowsBy, 0);
            this.internalRows = this.processGroupedRows(this.groupedRows);
        }
        else {
            this.internalRows = this.rows;
        }
        // auto sort on new updates
        if (!this.externalSorting) {
            this.sortInternalRows();
        }
        this.recalculate();
    };
    /**
     * Columns to be displayed.
     */
    DatatableComponent.prototype.onColumnsChanged = function (newVal) {
        var _this = this;
        if (newVal) {
            utils_1.setColumnsDefaults(newVal, this);
            this.internalColumns = __spreadArrays(newVal);
            this.$nextTick(function () { return _this.recalculateColumns(); });
        }
    };
    /**
     * The page size to be shown.
     * Default value: `undefined`
     */
    DatatableComponent.prototype.onLimitChanged = function () {
        // recalculate sizes/etc
        this.recalculate();
    };
    /**
     * The total count of all rows.
     * Default value: `0`
     */
    DatatableComponent.prototype.onCountChanged = function () {
        // recalculate sizes/etc
        this.recalculate();
    };
    DatatableComponent.prototype.onColumnModeChanged = function () {
        this.myColumnMode = types_1.ColumnMode[this.columnMode];
    };
    DatatableComponent.prototype.onSortTypeChanged = function () {
        if (types_1.SortType[this.sortType]) {
            this.mySortType = types_1.SortType[this.sortType];
        }
    };
    DatatableComponent.prototype.onOffsetChanged = function () {
        if (this.innerOffset !== this.offset) {
            this.innerOffset = this.offset;
            if ( /* this.externalPager && */this.innerOffset >= 0) {
                this.onFooterPage({ page: this.offset + 1 });
            }
        }
    };
    DatatableComponent.prototype.onSelectedChanged = function () {
        this.mySelected = this.selected;
    };
    DatatableComponent.prototype.onCheckedChanged = function () {
        this.myChecked = this.checked;
    };
    Object.defineProperty(DatatableComponent.prototype, "myOffset", {
        get: function () {
            if (this.rowCount) {
                return Math.max(Math.min(this.innerOffset, Math.ceil(this.rowCount / this.pageSize) - 1), 0);
            }
            return this.innerOffset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedHeader", {
        /**
         * CSS class applied if the header height if fixed height.
         */
        get: function () {
            var headerHeight = this.headerHeight;
            return (typeof headerHeight === 'string') ?
                headerHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedRow", {
        /**
         * CSS class applied to the root element if
         * the row heights are fixed heights.
         */
        get: function () {
            var rowHeight = this.rowHeight;
            return (typeof rowHeight === 'string') ?
                rowHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isVertScroll", {
        /**
         * CSS class applied to root element if
         * vertical scrolling is enabled.
         */
        get: function () {
            return this.scrollbarV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isVirtualized", {
        /**
         * CSS class applied to root element if
         * virtualization is enabled.
         */
        get: function () {
            return this.virtualization;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isHorScroll", {
        /**
         * CSS class applied to the root element
         * if the horziontal scrolling is enabled.
         */
        get: function () {
            return this.scrollbarH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSelectable", {
        /**
         * CSS class applied to root element is selectable.
         */
        get: function () {
            return this.selectionType !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isCheckboxSelection", {
        /**
         * CSS class applied to root is checkbox selection.
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.checkbox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isCellSelection", {
        /**
         * CSS class applied to root if cell selection.
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.cell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSingleSelection", {
        /**
         * CSS class applied to root if single select.
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.single;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSingleFocusSelection", {
        get: function () {
            return this.selectionType === types_1.SelectionType.singleFocus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isMultiSelection", {
        /**
         * CSS class added to root element if mulit select
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.multi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isMultiClickSelection", {
        /**
         * CSS class added to root element if mulit click select
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.multiClick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "classObject", {
        get: function () {
            return {
                'fixed-header': this.isFixedHeader,
                'fixed-row': this.isFixedRow,
                'scroll-vertical': this.isVertScroll,
                virtualized: this.isVirtualized,
                'scroll-horz': this.isHorScroll,
                selectable: this.isSelectable,
                'checkbox-selection': this.isCheckboxSelection,
                'cell-selection': this.isCellSelection,
                'single-selection': this.isSingleSelection,
                'multi-selection': this.isMultiSelection,
                'multi-click-selection': this.isMultiClickSelection,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "allRowsSelected", {
        get: function () {
            var arr = this.mySelected;
            if (this.checkMode === check_type_1.CheckMode.checkNoSelect) {
                arr = this.myChecked;
            }
            var allRowsSelected = (this.rows && arr && arr.length === this.rows.length);
            if (this.selectAllRowsOnPage && this.bodyComponent) {
                var indexes = this.bodyComponent.indexes;
                var rowsOnPage = this.rows.length;
                if (this.limit && !this.scrollbarV && !this.virtualization) {
                    rowsOnPage = indexes.last - indexes.first;
                }
                allRowsSelected = (arr.length === rowsOnPage);
            }
            return arr && this.rows &&
                this.rows.length !== 0 && allRowsSelected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "scrollbarWidth", {
        get: function () {
            return this.scrollbarHelper.width;
        },
        enumerable: true,
        configurable: true
    });
    DatatableComponent.prototype.reset = function () {
        var _a;
        (_a = this.bodyComponent) === null || _a === void 0 ? void 0 : _a.reset();
    };
    DatatableComponent.prototype.adjust = function () {
        var _this = this;
        this.bodyHeight = -1;
        setTimeout(function () {
            _this.recalculateDims();
        });
    };
    /**
     * Recalc's the sizes of the grid.
     *
     * Updated automatically on changes to:
     *
     *  - Columns
     *  - Rows
     *  - Paging related
     *
     * Also can be manually invoked or upon window resize.
     */
    DatatableComponent.prototype.recalculate = function () {
        this.recalculateDims();
        this.recalculateColumns();
    };
    /**
     * Window resize handler to update sizes.
     */
    DatatableComponent.prototype.onWindowResize = function () {
        this.recalculate();
    };
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     */
    DatatableComponent.prototype.recalculateColumns = function (columns, forceIdx, allowBleed) {
        if (columns === void 0) { columns = this.internalColumns; }
        if (forceIdx === void 0) { forceIdx = -1; }
        if (allowBleed === void 0) { allowBleed = this.scrollbarH; }
        if (!columns)
            return undefined;
        var width = this.innerWidth;
        if (this.scrollbarV) {
            width = width - this.scrollbarHelper.width;
        }
        if (this.myColumnMode === types_1.ColumnMode.force) {
            utils_1.forceFillColumnWidths(columns, width, forceIdx, allowBleed);
        }
        else if (this.myColumnMode === types_1.ColumnMode.flex) {
            utils_1.adjustColumnWidths(columns, width);
        }
        var hiddenColumns = columns.filter(function (col) { return col.hidden; });
        if (hiddenColumns.length) {
            this.bodyComponent && this.bodyComponent.onInnerWidthChanged();
        }
        return columns;
    };
    /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     */
    DatatableComponent.prototype.recalculateDims = function () {
        var dims = this.dimensionsHelper.getDimensions(this.$el);
        this.innerWidth = Math.floor(dims.width);
        if (this.scrollbarV) {
            var height = dims.height;
            if (this.headerHeight)
                height = height - this.headerHeight;
            if (this.footerHeight)
                height = height - this.footerHeight;
            this.bodyHeight = height;
        }
        this.recalculatePages();
    };
    /**
     * Recalculates the pages after a update.
     */
    DatatableComponent.prototype.recalculatePages = function () {
        this.pageSize = this.calcPageSize();
        this.rowCount = this.calcRowCount();
        this.$emit('row-count', this.rowCount);
    };
    /**
     * Body triggered a page event.
     */
    DatatableComponent.prototype.onBodyPage = function (_a) {
        var offset = _a.offset;
        // Avoid pagination caming from body events like scroll when the table 
        // has no virtualization and the external paging is enable. 
        // This means, let's the developer handle pagination by my him(her) self
        if (this.externalPaging && !this.virtualization) {
            return;
        }
        if (this.innerOffset === offset) {
            return;
        }
        this.innerOffset = offset;
        this.$emit('page', {
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.innerOffset,
        });
    };
    /**
     * The body triggered a scroll event.
     */
    DatatableComponent.prototype.onBodyScroll = function (event) {
        this.offsetX = event.offsetX;
        // this.$emit('offsetX', event.offsetX);
        this.$emit('scroll', event);
    };
    /**
     * The footer triggered a page event.
     */
    DatatableComponent.prototype.onFooterPage = function (event) {
        var _a;
        this.innerOffset = event.page - 1;
        (_a = this.bodyComponent) === null || _a === void 0 ? void 0 : _a.updateOffsetY(this.innerOffset, true);
        this.$emit('page', {
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.innerOffset
        });
        if (this.selectAllRowsOnPage && !this.scrollbarV && this.limit) {
            this.mySelected = [];
            this.$emit('select', {
                selected: this.mySelected
            });
        }
    };
    DatatableComponent.prototype.onVisible = function (visible) {
        if (this.isVisible !== visible) {
            this.isVisible = visible;
            if (this.isVisible) {
                this.recalculate();
            }
        }
    };
    /**
     * Recalculates the sizes of the page
     */
    DatatableComponent.prototype.calcPageSize = function (val) {
        if (val === void 0) { val = this.rows; }
        // Keep the page size constant even if the row has been expanded.
        // This is because an expanded row is still considered to be a child of
        // the original row.  Hence calculation would use rowHeight only.
        if (this.scrollbarV && this.virtualization) {
            var rowHeight = 30;
            if (typeof this.rowHeight === 'number') {
                rowHeight = this.rowHeight;
            }
            var size = Math.ceil(this.bodyHeight / rowHeight);
            return Math.max(size, 0);
        }
        // if limit is passed, we are paging
        if (this.limit !== undefined) {
            return Number(this.limit);
        }
        // otherwise use row length
        if (val) {
            return val.length;
        }
        // other empty :(
        return 0;
    };
    /**
     * Calculates the row count.
     */
    DatatableComponent.prototype.calcRowCount = function (val) {
        if (val === void 0) { val = this.rows; }
        if (!this.externalPaging) {
            if (!val)
                return 0;
            if (this.groupRowsBy) {
                return this.internalRows.length;
            }
            else if (this.treeFromRelation != null && this.treeToRelation != null) {
                return this.internalRows.length;
            }
            else {
                return val.length;
            }
        }
        return this.count;
    };
    /**
     * The header triggered a contextmenu event.
     */
    DatatableComponent.prototype.onColumnContextmenu = function (_a) {
        var event = _a.event, column = _a.column;
        this.$emit('tableContextmenu', { event: event, type: types_1.ContextmenuType.header, content: column });
    };
    /**
     * The body triggered a contextmenu event.
     */
    DatatableComponent.prototype.onRowContextmenu = function (_a) {
        var event = _a.event, row = _a.row;
        this.$emit('tableContextmenu', { event: event, type: types_1.ContextmenuType.body, content: row });
    };
    /**
     * The header triggered a column resize event.
     */
    DatatableComponent.prototype.onColumnResize = function (_a) {
        var column = _a.column, newValue = _a.newValue;
        /* Safari/iOS 10.2 workaround */
        if (column === undefined) {
            return;
        }
        var idx;
        this.internalColumns.map(function (c, i) {
            if (c.$$id === column.$$id) {
                idx = i;
                c.width = newValue;
                c.canAutoResize = false;
                // set this so we can force the column
                // width distribution to be to this value
                c.$$oldWidth = newValue;
            }
            return c;
        });
        this.recalculateColumns(this.internalColumns, idx);
        this.$emit('resize', {
            column: column,
            newValue: newValue
        });
    };
    /**
     * The header triggered a column re-order event.
     */
    DatatableComponent.prototype.onColumnReorder = function (_a) {
        var column = _a.column, newValue = _a.newValue, prevValue = _a.prevValue;
        var cols = __spreadArrays(this.internalColumns);
        if (this.swapColumns) {
            var prevCol = cols[newValue];
            if (column.$$id === prevCol.$$id) {
                return;
            }
            cols[newValue] = column;
            cols[prevValue] = prevCol;
        }
        else {
            if (newValue > prevValue) {
                var movedCol = cols[prevValue];
                for (var i = prevValue; i < newValue; i++) {
                    cols[i] = cols[i + 1];
                }
                cols[newValue] = movedCol;
            }
            else {
                var movedCol = cols[prevValue];
                for (var i = prevValue; i > newValue; i--) {
                    cols[i] = cols[i - 1];
                }
                cols[newValue] = movedCol;
            }
        }
        this.internalColumns = cols;
        this.$emit('reorder', {
            column: column,
            newValue: newValue,
            prevValue: prevValue
        });
    };
    /**
     * The header triggered a column sort event.
     */
    DatatableComponent.prototype.onColumnSort = function (event) {
        var _this = this;
        var _a;
        // clean selected rows
        if (this.selectAllRowsOnPage) {
            this.mySelected = [];
            this.$emit('select', {
                selected: this.mySelected
            });
        }
        // this.mySorts = event.sorts;
        if (Array.isArray(this.sorts) && Array.isArray(event.sorts)) {
            this.sorts.length = 0;
            event.sorts.forEach(function (item) { return _this.sorts.push(item); });
            if (this.sorts.length === 0) {
                this.sorts.push({ dir: null, prop: null });
            }
        }
        // let rows = this.internalRows;
        var treeFrom = utils_1.optionalGetterForProp(this.treeFromRelation);
        var treeTo = utils_1.optionalGetterForProp(this.treeToRelation);
        if (treeFrom && treeTo) {
            this.internalRows = this.initialRows;
        }
        // this could be optimized better since it will resort
        // the rows again on the 'push' detection...
        if (this.externalSorting === false) {
            // don't use normal setter so we don't resort
            this.sortInternalRows();
        }
        // auto group by parent on new update
        this.internalRows = utils_1.groupRowsByParents(this.internalRows, treeFrom, treeTo, this.lazyTree);
        // Go to first page when sorting to see the newly sorted data
        if (this.goToFirstAfterSort) {
            this.innerOffset = 0;
        }
        this.bodyComponent.updateOffsetY(this.myOffset, true);
        this.$emit('sort', __assign(__assign({}, event), { sorts: (_a = event === null || event === void 0 ? void 0 : event.sorts) === null || _a === void 0 ? void 0 : _a.filter(function (s) { return s.prop; }) }));
    };
    /**
     * Toggle all row selection
     */
    DatatableComponent.prototype.onHeaderSelect = function (isChecked) {
        var _a, _b, _c, _d;
        var evName = 'select';
        if (this.selectAllRowsOnPage) {
            // before we splice, chk if we currently have all selected
            var first = this.bodyComponent.indexes.first;
            var last = this.bodyComponent.indexes.last;
            if (this.checkMode === check_type_1.CheckMode.checkIsSelect) {
                var allSelected = this.mySelected.length === (last - first);
                // remove all existing either way
                this.mySelected = [];
                // do the opposite here
                if (!allSelected) {
                    (_a = this.mySelected).push.apply(_a, this.internalRows.slice(first, last));
                }
            }
            else {
                evName = 'check';
                var allChecked = this.myChecked.length === (last - first);
                if (this.scrollbarV && this.virtualization && !this.limit) {
                    allChecked = this.myChecked.length === this.internalRows.length;
                }
                // remove all existing either way
                this.myChecked = [];
                // do the opposite here
                if (isChecked && !allChecked) {
                    if (this.scrollbarV && this.virtualization) {
                        (_b = this.myChecked).push.apply(_b, this.internalRows);
                    }
                    else {
                        (_c = this.myChecked).push.apply(_c, this.internalRows.slice(first, last));
                    }
                }
            }
        }
        else {
            // before we splice, chk if we currently have all selected
            var allSelected = this.mySelected.length === this.rows.length;
            // remove all existing either way
            this.mySelected = [];
            // do the opposite here
            if (!allSelected) {
                (_d = this.mySelected).push.apply(_d, this.rows);
            }
        }
        this.$emit(evName, {
            selected: this.mySelected,
            checked: this.myChecked
        });
    };
    /**
     * A row was selected from body
     */
    DatatableComponent.prototype.onBodySelect = function (event) {
        this.$emit('select', event);
    };
    /**
     * A row was checked from body
     */
    DatatableComponent.prototype.onBodyCheck = function (event) {
        this.$emit('check', event);
    };
    DatatableComponent.prototype.onGroupToggle = function (event) {
        event.value.__expanded = !event.value.__expanded;
        this.internalRows = this.processGroupedRows(this.groupedRows);
        this.recalculate();
    };
    /**
     * A row was expanded or collapsed for tree
     */
    DatatableComponent.prototype.onTreeAction = function (event) {
        var _this = this;
        var row = event.row;
        // TODO: For duplicated items this will not work
        var rowIndex = this.rows.findIndex(function (r) {
            return r[_this.treeToRelation] === event.row[_this.treeToRelation];
        });
        this.$emit('tree-action', { row: row, rowIndex: rowIndex });
    };
    DatatableComponent.prototype.onColumnInsert = function (column) {
        utils_1.setColumnDefaults(column, this);
        if (!this.internalColumns) {
            this.internalColumns = [column];
        }
        else {
            this.internalColumns = __spreadArrays(this.internalColumns, [column]);
        }
        // if (!this.internalColumns) {
        //   setColumnDefaults(column, this);
        //   this.internalColumns = [column];
        // }
        // const colIndex = this.internalColumns.findIndex(c => {
        //   if (column.prop) {
        //     return c.prop === column.prop;
        //   } else {
        //     return c.name === column.name;
        //   }
        // });
        // if (colIndex < 0) {
        //   setColumnDefaults(column, this);
        //   this.internalColumns = [...this.internalColumns, column];
        // } else {
        //   const col = this.internalColumns[colIndex];
        //   this.$set(col, 'headerTemplate', column.headerTemplate);
        //   this.$set(col, 'cellTemplate', column.cellTemplate);
        // }
        if (this.isVisible) {
            this.recalculateColumns();
        }
    };
    DatatableComponent.prototype.onColumnRemoved = function (column) {
        var colIndex = this.internalColumns.findIndex(function (c) { return c.name === column.name; });
        var cols = __spreadArrays(this.internalColumns);
        cols.splice(colIndex, 1);
        this.internalColumns = __spreadArrays(cols);
        this.recalculateColumns();
    };
    DatatableComponent.prototype.onColumnChangeVisible = function (column) {
        var _this = this;
        // we have to allow the cell's element to set it's width
        setTimeout(function () { return _this.recalculateColumns(); }, 100);
    };
    /**
     * listen for changes to input bindings of all DataTableColumnDirective and
     * trigger the columnTemplates.changes observable to emit
     */
    // todo
    // private listenForColumnInputChanges(): void {
    //   this._subscriptions.push(this.columnChangesService
    //     .columnInputChanges$
    //     .subscribe(() => {
    //       if (this.columnTemplates) {
    //         this.columnTemplates.notifyOnChanges();
    //       }
    //     }));
    // }
    /**
     * Toggle the expansion of the row
     */
    DatatableComponent.prototype.toggleExpandDetail = function (row) {
        this.bodyComponent.toggleExpandDetail(row);
        this.$emit('detail-toggle', {
            type: 'row',
            value: row
        });
    };
    /**
     * Expand all the rows.
     */
    DatatableComponent.prototype.expandAllDetails = function () {
        this.bodyComponent.expandAllDetails();
        this.$emit('detail-toggle', {
            type: 'all',
            value: true
        });
    };
    /**
     * Collapse all the rows.
     */
    DatatableComponent.prototype.collapseAllDetails = function () {
        this.bodyComponent.collapseAllDetails();
        this.$emit('detail-toggle', {
            type: 'all',
            value: false
        });
    };
    /**
     * Creates a map with the data grouped by the user choice of grouping index
     *
     * @param originalArray the original array passed via parameter
     * @param groupByIndex  the index of the column to group the data by
     */
    DatatableComponent.prototype.groupArrayBy = function (originalArray, groupRowsBy, level) {
        var _this = this;
        if (level === void 0) { level = 0; }
        var groupBy = groupRowsBy;
        if (Array.isArray(groupRowsBy)) {
            groupBy = groupRowsBy[level];
        }
        // create a map to hold groups with their corresponding results
        var map = new Map();
        var getValue = function (row, groupDescr) {
            if (typeof groupDescr === 'string') {
                return row[groupDescr];
            }
            else if ('prop' in groupDescr) {
                return groupDescr.valueGetter ? groupDescr.valueGetter(row[groupDescr.prop]) : row[groupDescr.prop];
            }
        };
        var getKey = function (row, groupByArr) {
            if (!Array.isArray(groupByArr)) {
                return getValue(row, groupByArr);
            }
            return groupByArr.reduce(function (key, groupDescr) {
                var res = null;
                if (Array.isArray(groupDescr)) {
                    return getKey(row, groupDescr);
                }
                else {
                    res = getValue(row, groupDescr);
                }
                if (!res) {
                    return res;
                }
                return key ? key + "^^" + res : "" + res;
            }, '');
        };
        var itemsToRemove = [];
        originalArray.forEach(function (item) {
            var key = getKey(item, groupBy);
            if (key !== undefined || key !== null) {
                itemsToRemove.push(item);
                if (!map.has(key)) {
                    map.set(key, [item]);
                }
                else {
                    map.get(key).push(item);
                }
            }
        });
        if (level > 0 && itemsToRemove.length) {
            itemsToRemove.forEach(function (item) {
                var i = originalArray.indexOf(item);
                if (i >= 0) {
                    originalArray.splice(i, 1);
                }
            });
        }
        var keysDescr = [];
        if (Array.isArray(groupBy)) {
            groupBy.forEach(function (prop) {
                var title = _this.getGroupTitle(prop);
                keysDescr.push({ title: title, prop: prop });
            });
        }
        else {
            var title = this.getGroupTitle(groupBy);
            keysDescr.push({ title: title, prop: groupBy });
        }
        // convert map back to a simple array of objects
        var result = Array.from(map, function (x) { return _this.addGroup(x[0], x[1], level, keysDescr); });
        if (Array.isArray(groupRowsBy) && level < groupRowsBy.length - 1) {
            result.forEach(function (item) {
                item.groups = _this.groupArrayBy(item.value, groupRowsBy, level + 1);
            });
        }
        return result;
    };
    DatatableComponent.prototype.addGroup = function (key, value, _level, keysDescr) {
        var keys = key ? key.toString().split('^^') : null;
        var keysObj = [];
        keysDescr.forEach(function (descr, index) {
            keysObj.push({ title: descr.title, prop: descr.prop, value: keys && keys.length > index ? keys[index] : '' });
        });
        return {
            key: key,
            value: value,
            level: _level,
            keys: keysObj,
            __expanded: true,
            __isGroup: true
        };
    };
    DatatableComponent.prototype.getGroupTitle = function (prop) {
        var title = prop;
        if (typeof prop === 'string') {
            var column = this.columns && this.columns.find(function (c) { return c.prop === prop; });
            title = column ? column.name : prop;
        }
        else if ('title' in prop) {
            title = prop.title;
        }
        return title;
    };
    DatatableComponent.prototype.sortInternalRows = function () {
        if (this.groupedRows) {
            this.groupedRows = this.sortGroupedRows(this.groupedRows);
            this.internalRows = this.processGroupedRows(this.groupedRows);
        }
        else {
            this.internalRows = utils_1.sortRows(this.internalRows, this.internalColumns, this.sorts);
        }
    };
    DatatableComponent.prototype.sortGroupedRows = function (groupedRows) {
        var _this = this;
        var rows = [];
        var sortedRows;
        groupedRows.forEach(function (gr) {
            var row = { __group: gr };
            gr.keys.forEach(function (keyDescr) {
                row[keyDescr.prop] = keyDescr.value;
            });
            rows.push(row);
            if (gr.groups && gr.groups.length) {
                gr.groups = _this.sortGroupedRows(gr.groups);
            }
            if (gr.value && gr.value) {
                gr.value = utils_1.sortRows(gr.value, _this.internalColumns, _this.sorts);
            }
        });
        sortedRows = utils_1.sortRows(rows, this.internalColumns, this.sorts);
        var result = sortedRows.map(function (r) { return r.__group; });
        return result;
    };
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "targetMarkerTemplate", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "rows", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DatatableComponent.prototype, "groupRowsBy", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DatatableComponent.prototype, "columns", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Array, default: function () { return []; } }),
        __metadata("design:type", Array)
    ], DatatableComponent.prototype, "selected", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Array, default: function () { return []; } }),
        __metadata("design:type", Array)
    ], DatatableComponent.prototype, "checked", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "scrollbarV", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "scrollbarH", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "rowHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "groupRowHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "rowDetailHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: String, validator: function (value) { return ['standard', 'flex', 'force'].indexOf(value) !== -1; } }),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "columnMode", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Number, default: 30 }),
        __metadata("design:type", Number)
    ], DatatableComponent.prototype, "headerHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], DatatableComponent.prototype, "footerHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "externalPaging", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "externalPager", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "externalSorting", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DatatableComponent.prototype, "limit", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], DatatableComponent.prototype, "count", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], DatatableComponent.prototype, "offset", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "loadingIndicator", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "selectionType", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: check_type_1.CheckMode.checkIsSelect }),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "checkMode", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "reorderable", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "swapColumns", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: String, validator: function (value) { return ['single', 'multi'].indexOf(value) !== -1; } }),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "sortType", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Array, default: function () { return []; } }),
        __metadata("design:type", Array)
    ], DatatableComponent.prototype, "sorts", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: true }),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "goToFirstAfterSort", void 0);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Object,
            default: function () {
                return {
                    sortAscending: 'datatable-icon-up',
                    sortDescending: 'datatable-icon-down',
                    pagerLeftArrow: 'datatable-icon-left',
                    pagerRightArrow: 'datatable-icon-right',
                    pagerPrevious: 'datatable-icon-prev',
                    pagerNext: 'datatable-icon-skip'
                };
            }
        }),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "cssClasses", void 0);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Object,
            default: function () {
                return {
                    emptyMessage: 'No data to display',
                    // Footer total message
                    totalMessage: 'total',
                    // Footer selected message
                    selectedMessage: 'selected'
                };
            }
        }),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "messages", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Function, default: (function (x) { return x; }) }),
        __metadata("design:type", Function)
    ], DatatableComponent.prototype, "rowIdentity", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "rowClass", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "selectCheck", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Function, default: null }),
        __metadata("design:type", Function)
    ], DatatableComponent.prototype, "displayCheck", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "groupExpansionDefault", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "trackByProp", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "selectAllRowsOnPage", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: true }),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "virtualization", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "treeFromRelation", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "treeToRelation", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: false }),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "lazyTree", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "summaryRow", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: 30 }),
        __metadata("design:type", Object)
    ], DatatableComponent.prototype, "summaryHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: String, default: 'top' }),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "summaryPosition", void 0);
    __decorate([
        vue_property_decorator_1.Watch('rows', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DatatableComponent.prototype, "onRowsChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('groupRowsBy'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], DatatableComponent.prototype, "onGroupRowsByChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('columns', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DatatableComponent.prototype, "onColumnsChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('limit'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DatatableComponent.prototype, "onLimitChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('count'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DatatableComponent.prototype, "onCountChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('columnMode', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DatatableComponent.prototype, "onColumnModeChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('sortType', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DatatableComponent.prototype, "onSortTypeChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('offset', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DatatableComponent.prototype, "onOffsetChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('selected', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DatatableComponent.prototype, "onSelectedChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('checked', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DatatableComponent.prototype, "onCheckedChanged", null);
    __decorate([
        utils_1.throttleable(5),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DatatableComponent.prototype, "onWindowResize", null);
    DatatableComponent = __decorate([
        vue_property_decorator_1.Component({
            directives: {
                'v-visibility-observer': visibility_directive_1.default,
            },
            components: {
                'datatable-header': header_component_1.default,
                'datatable-body': body_component_vue_1.default,
                'datatable-footer': footer_component_1.default,
            }
        })
    ], DatatableComponent);
    return DatatableComponent;
}(vue_property_decorator_1.Vue));
exports.default = DatatableComponent;


/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js?!./src/components/datatable.component.scss?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--2-oneOf-1-2!./src/components/datatable.component.scss?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--2-oneOf-1-2!./datatable.component.scss?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js?!./src/components/datatable.component.scss?vue&type=style&index=0&lang=scss&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("24f3cf14", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/lib/addStylesClient.js":
/*!**************************************************************************!*\
  !*** ./node_modules/vue-style-loader/lib/addStylesClient.js + 1 modules ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesClient; });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "./src/components/body/body-cell.component.html?vue&type=template&id=48c40f9f&":
/*!*************************************************************************************************!*\
  !*** ./src/components/body/body-cell.component.html?vue&type=template&id=48c40f9f& + 1 modules ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "render", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./config/my-vue-raw-loader.js!./src/components/body/body-cell.component.html?vue&type=template&id=48c40f9f&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.column.visible,
          expression: "column.visible"
        }
      ],
      staticClass: "datatable-body-cell",
      class: _vm.cssClasses,
      style: _vm.styles,
      attrs: {
        id: _vm.column.prop + "-" + _vm.column.$$id,
        tabindex: _vm.tabIndex
      },
      on: {
        dblclick: _vm.onDblClick,
        click: _vm.onClick,
        keydown: _vm.onKeyDown,
        mouseenter: _vm.onMouseEnter,
        focus: _vm.onFocus,
        blur: _vm.onBlur
      }
    },
    [
      _c(
        "div",
        {
          staticClass: "datatable-body-cell-label",
          style: _vm.column.isTreeColumn ? _vm.marginCellStyle : null
        },
        [
          _vm.column.checkboxable &&
          (!_vm.displayCheck ||
            _vm.displayCheck(_vm.rowContext.row, _vm.column, _vm.value))
            ? _c("label", { staticClass: "datatable-checkbox" }, [
                _c("input", {
                  attrs: { type: "checkbox" },
                  domProps: { checked: _vm.rowContext.isChecked },
                  on: { click: _vm.onCheckboxChange }
                })
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.column.isTreeColumn
            ? [
                !_vm.column.treeToggleTemplate
                  ? _c(
                      "button",
                      {
                        staticClass: "datatable-tree-button",
                        attrs: {
                          disabled: _vm.rowContext.treeStatus === "disabled"
                        },
                        on: { click: _vm.onTreeAction }
                      },
                      [
                        _c("span", [
                          _vm.rowContext.row.treeStatus === "loading"
                            ? _c("i", {
                                staticClass: "icon datatable-icon-collapse"
                              })
                            : _vm.rowContext.treeStatus === "collapsed"
                            ? _c("i", {
                                staticClass: "icon datatable-icon-right"
                              })
                            : _vm.rowContext.treeStatus === "expanded"
                            ? _c("i", {
                                staticClass: "icon datatable-icon-down"
                              })
                            : _c("i", {
                                staticClass:
                                  "icon icon-disabled datatable-icon-down"
                              })
                        ])
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm._t("tree-toggle")
              ]
            : _vm._e(),
          _vm._v(" "),
          _vm._t(
            "default",
            [
              _c("span", {
                attrs: { title: _vm.sanitizedValue },
                domProps: { innerHTML: _vm._s(_vm.value) }
              })
            ],
            null,
            {
              row: _vm.rowContext.row ? _vm.rowContext.row : {},
              column: _vm.column,
              rowIndex: _vm.rowContext.rowIndex,
              group: _vm.rowContext.group,
              expanded: _vm.rowContext.expanded,
              value: _vm.value
            }
          )
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/components/body/body-cell.component.html?vue&type=template&id=48c40f9f&


/***/ }),

/***/ "./src/components/body/body-cell.component.ts?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./src/components/body/body-cell.component.ts?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_cell_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--4!../../../node_modules/tslint-loader!./body-cell.component.ts?vue&type=script&lang=js& */ "./node_modules/ts-loader/index.js?!./node_modules/tslint-loader/index.js!./src/components/body/body-cell.component.ts?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_cell_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_cell_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_cell_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_cell_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_cell_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/body/body-cell.component.vue":
/*!*****************************************************!*\
  !*** ./src/components/body/body-cell.component.vue ***!
  \*****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _body_cell_component_html_vue_type_template_id_48c40f9f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./body-cell.component.html?vue&type=template&id=48c40f9f& */ "./src/components/body/body-cell.component.html?vue&type=template&id=48c40f9f&");
/* harmony import */ var _body_cell_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./body-cell.component.ts?vue&type=script&lang=js& */ "./src/components/body/body-cell.component.ts?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _body_cell_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _body_cell_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _body_cell_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _body_cell_component_html_vue_type_template_id_48c40f9f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _body_cell_component_html_vue_type_template_id_48c40f9f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/body/body-cell.component.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/body/body-group-header.component.ts":
/*!************************************************************!*\
  !*** ./src/components/body/body-group-header.component.ts ***!
  \************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var DataTableBodyGroupHeaderComponent = /** @class */ (function (_super) {
    __extends(DataTableBodyGroupHeaderComponent, _super);
    function DataTableBodyGroupHeaderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataTableBodyGroupHeaderComponent.prototype.created = function () {
        if (this.groupHeaderSlot) {
            this.$slots.groupHeader = this.groupHeaderSlot({
                group: this.group,
                expanded: this.expanded,
                level: this.groupLevel,
                groupBy: this.groupBy
            });
        }
    };
    DataTableBodyGroupHeaderComponent.prototype.beforeUpdate = function () {
        if (this.groupHeaderSlot) {
            this.$slots.groupHeader = this.groupHeaderSlot({
                group: this.group,
                expanded: this.expanded,
                level: this.groupLevel,
                groupBy: this.groupBy
            });
        }
    };
    /**
     * Toggle the expansion of a group
     */
    DataTableBodyGroupHeaderComponent.prototype.toggleExpandGroup = function () {
        this.$emit('group-toggle', {
            type: 'group',
            value: this.group
        });
    };
    /**
     * Expand all groups
     */
    DataTableBodyGroupHeaderComponent.prototype.expandAllGroups = function () {
        this.$emit('group-toggle', {
            type: 'all',
            value: true
        });
    };
    /**
     * Collapse all groups
     */
    DataTableBodyGroupHeaderComponent.prototype.collapseAllGroups = function () {
        this.$emit('group-toggle', {
            type: 'all',
            value: false
        });
    };
    Object.defineProperty(DataTableBodyGroupHeaderComponent.prototype, "groupTitle", {
        get: function () {
            var result = '';
            if (this.group && this.group.keys) {
                this.group.keys.forEach(function (gr) {
                    if (!result) {
                        result += gr.title + " - " + gr.value;
                    }
                    else {
                        result += "; " + gr.title + " - " + gr.value;
                    }
                });
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyGroupHeaderComponent.prototype, "styles", {
        get: function () {
            return {
                'padding-left': this.groupLevel ? (this.groupLevel * 10) + 'px' : '5px',
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyGroupHeaderComponent.prototype, "groupBy", {
        get: function () {
            if (this.groupLevel !== undefined && this.groupLevel !== null
                && Array.isArray(this.groupRowsBy) && this.groupRowsBy.length - 1 >= this.groupLevel) {
                return this.groupRowsBy[this.groupLevel];
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        vue_property_decorator_1.Prop({ default: 0 }),
        __metadata("design:type", Object)
    ], DataTableBodyGroupHeaderComponent.prototype, "rowHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyGroupHeaderComponent.prototype, "group", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableBodyGroupHeaderComponent.prototype, "expanded", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyGroupHeaderComponent.prototype, "groupHeaderSlot", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableBodyGroupHeaderComponent.prototype, "groupLevel", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyGroupHeaderComponent.prototype, "groupRowsBy", void 0);
    DataTableBodyGroupHeaderComponent = __decorate([
        vue_property_decorator_1.Component({
            template: "\n      <div :class=\"{ 'datatable-icon-right': !expanded, 'datatable-icon-down': expanded }\" :style=\"styles\" \n            title=\"Expand/Collapse Group\" @click=\"toggleExpandGroup\">\n        <slot name=\"groupHeader\" v-bind=\"{ group: group, expanded: expanded, level: groupLevel, groupBy: groupBy }\">\n          <span><b>{{groupTitle}}</b></span>\n        </slot>  \n      </div>                          \n  ",
        })
    ], DataTableBodyGroupHeaderComponent);
    return DataTableBodyGroupHeaderComponent;
}(vue_property_decorator_1.Vue));
exports.default = DataTableBodyGroupHeaderComponent;


/***/ }),

/***/ "./src/components/body/body-row-detail.component.ts":
/*!**********************************************************!*\
  !*** ./src/components/body/body-row-detail.component.ts ***!
  \**********************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var DataTableBodyRowDetailComponent = /** @class */ (function (_super) {
    __extends(DataTableBodyRowDetailComponent, _super);
    function DataTableBodyRowDetailComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataTableBodyRowDetailComponent.prototype.created = function () {
        if (this.rowDetailSlot) {
            this.$slots.rowDetail = this.rowDetailSlot({ row: this.row, expanded: this.expanded });
        }
    };
    DataTableBodyRowDetailComponent.prototype.beforeUpdate = function () {
        if (this.rowDetailSlot) {
            this.$slots.rowDetail = this.rowDetailSlot({ row: this.row, expanded: this.expanded });
        }
    };
    DataTableBodyRowDetailComponent.prototype.toggleExpandGroup = function () {
        //
    };
    __decorate([
        vue_property_decorator_1.Prop({ default: 0 }),
        __metadata("design:type", Object)
    ], DataTableBodyRowDetailComponent.prototype, "rowHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyRowDetailComponent.prototype, "row", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableBodyRowDetailComponent.prototype, "expanded", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableBodyRowDetailComponent.prototype, "rowDetailSlot", void 0);
    DataTableBodyRowDetailComponent = __decorate([
        vue_property_decorator_1.Component({
            template: "\n      <div style=\"padding-left:5px;\">\n           <slot name=\"rowDetail\" v-bind=\"{ row: row, expanded: expanded }\">\n             <h3>detail row info</h3>\n           </slot>  \n      </div>\n  ",
        })
    ], DataTableBodyRowDetailComponent);
    return DataTableBodyRowDetailComponent;
}(vue_property_decorator_1.Vue));
exports.default = DataTableBodyRowDetailComponent;


/***/ }),

/***/ "./src/components/body/body-row-wrapper.component.ts?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./src/components/body/body-row-wrapper.component.ts?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_row_wrapper_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--4!../../../node_modules/tslint-loader!./body-row-wrapper.component.ts?vue&type=script&lang=js& */ "./node_modules/ts-loader/index.js?!./node_modules/tslint-loader/index.js!./src/components/body/body-row-wrapper.component.ts?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_row_wrapper_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_row_wrapper_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_row_wrapper_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_row_wrapper_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_row_wrapper_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/body/body-row-wrapper.component.vue":
/*!************************************************************!*\
  !*** ./src/components/body/body-row-wrapper.component.vue ***!
  \************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _body_row_wrapper_component_vue_vue_type_template_id_11b0d871_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./body-row-wrapper.component.vue?vue&type=template&id=11b0d871&scoped=true& */ "./src/components/body/body-row-wrapper.component.vue?vue&type=template&id=11b0d871&scoped=true&");
/* harmony import */ var _body_row_wrapper_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./body-row-wrapper.component.ts?vue&type=script&lang=js& */ "./src/components/body/body-row-wrapper.component.ts?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _body_row_wrapper_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _body_row_wrapper_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _body_row_wrapper_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _body_row_wrapper_component_vue_vue_type_template_id_11b0d871_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _body_row_wrapper_component_vue_vue_type_template_id_11b0d871_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "11b0d871",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/body/body-row-wrapper.component.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/body/body-row-wrapper.component.vue?vue&type=template&id=11b0d871&scoped=true&":
/*!*******************************************************************************************************************!*\
  !*** ./src/components/body/body-row-wrapper.component.vue?vue&type=template&id=11b0d871&scoped=true& + 1 modules ***!
  \*******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "render", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/body/body-row-wrapper.component.vue?vue&type=template&id=11b0d871&scoped=true&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "datatable-row-wrapper",
      style: _vm.styleObject,
      attrs: { tabindex: "-1" }
    },
    [
      _vm.row && _vm.row.__isGroup
        ? _c("datatable-group-header", {
            staticClass: "datatable-group-header",
            style: _vm.groupHeaderStyles,
            attrs: {
              group: _vm.row,
              groupLevel: _vm.row.level,
              groupRowsBy: _vm.groupRowsBy,
              expanded: _vm.row.__expanded,
              groupHeaderSlot: _vm.groupHeaderSlot
            },
            on: {
              "group-toggle": function($event) {
                return _vm.$emit("group-toggle", $event)
              },
              contextmenu: function($event) {
                return _vm.$emit("row-contextmenu", $event, _vm.row)
              }
            }
          })
        : _vm._t("default"),
      _vm._v(" "),
      _vm.rowDetail && _vm.expanded
        ? _c("datatable-row-detail", {
            staticClass: "datatable-row-detail",
            style: { height: _vm.rowDetailHeight + "px" },
            attrs: {
              row: _vm.row,
              expanded: _vm.expanded,
              rowDetailSlot: _vm.rowDetailSlot
            },
            on: {
              "detail-toggle": function($event) {
                return _vm.$emit("detail-toggle", $event)
              },
              contextmenu: function($event) {
                return _vm.$emit("row-contextmenu", $event, _vm.row)
              }
            }
          })
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/components/body/body-row-wrapper.component.vue?vue&type=template&id=11b0d871&scoped=true&


/***/ }),

/***/ "./src/components/body/body-row.component.ts?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./src/components/body/body-row.component.ts?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_row_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--4!../../../node_modules/tslint-loader!./body-row.component.ts?vue&type=script&lang=js& */ "./node_modules/ts-loader/index.js?!./node_modules/tslint-loader/index.js!./src/components/body/body-row.component.ts?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_row_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_row_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_row_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_row_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_row_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/body/body-row.component.vue":
/*!****************************************************!*\
  !*** ./src/components/body/body-row.component.vue ***!
  \****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _body_row_component_vue_vue_type_template_id_0d0f71aa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./body-row.component.vue?vue&type=template&id=0d0f71aa& */ "./src/components/body/body-row.component.vue?vue&type=template&id=0d0f71aa&");
/* harmony import */ var _body_row_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./body-row.component.ts?vue&type=script&lang=js& */ "./src/components/body/body-row.component.ts?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _body_row_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _body_row_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _body_row_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _body_row_component_vue_vue_type_template_id_0d0f71aa___WEBPACK_IMPORTED_MODULE_0__["render"],
  _body_row_component_vue_vue_type_template_id_0d0f71aa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/body/body-row.component.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/body/body-row.component.vue?vue&type=template&id=0d0f71aa&":
/*!***********************************************************************************************!*\
  !*** ./src/components/body/body-row.component.vue?vue&type=template&id=0d0f71aa& + 1 modules ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "render", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/body/body-row.component.vue?vue&type=template&id=0d0f71aa&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: _vm.groupClass,
      style: _vm.styles,
      attrs: { id: "row-group", tabIndex: -1 },
      on: { focus: _vm.onFocus, blur: _vm.onBlur, keydown: _vm.onKeyDown }
    },
    _vm._l(_vm.columnsByPin, function(colGroup) {
      return _c(
        "div",
        {
          key: colGroup.type,
          staticClass: "datatable-row-group",
          class: "datatable-row-" + colGroup.type,
          style: _vm.groupStyles(colGroup),
          on: {
            mouseenter: function($event) {
              return _vm.$emit("activate", _vm.row)
            }
          }
        },
        _vm._l(colGroup.columns, function(column, ii) {
          return _c("datatable-body-cell", {
            key: column.$$id + "-" + _vm.counter,
            attrs: {
              tabIndex: "-1",
              rowContext: _vm.rowContext,
              column: column,
              cellSlot: _vm.slots()[column.prop],
              renderTracking: _vm.renderTracking,
              displayCheck: _vm.displayCheck
            },
            on: {
              activate: function($event) {
                return _vm.onActivate($event, ii)
              },
              "tree-action": _vm.onTreeAction,
              mouseenter: _vm.onMouseenter,
              "cell-created": _vm.onCellRendered,
              "cell-updated": _vm.onCellRendered
            }
          })
        }),
        1
      )
    }),
    0
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/components/body/body-row.component.vue?vue&type=template&id=0d0f71aa&


/***/ }),

/***/ "./src/components/body/body.component.html?vue&type=template&id=0878f244&":
/*!********************************************************************************************!*\
  !*** ./src/components/body/body.component.html?vue&type=template&id=0878f244& + 1 modules ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "render", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./config/my-vue-raw-loader.js!./src/components/body/body.component.html?vue&type=template&id=0878f244&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "datatable-body", style: _vm.styleObject },
    [
      _c(
        "datatable-selection",
        {
          ref: "selector",
          attrs: {
            selected: _vm.mySelected,
            checked: _vm.checked,
            rows: _vm.rows,
            pageSize: _vm.pageSize,
            selectCheck: _vm.selectCheck,
            selectEnabled: _vm.selectEnabled,
            selectionType: _vm.selectionType,
            checkMode: _vm.checkMode,
            rowIdentity: _vm.rowIdentity,
            scroller: _vm.scroller
          },
          on: {
            select: _vm.onSelect,
            check: function($event) {
              return _vm.$emit("check", $event)
            },
            activate: function($event) {
              return _vm.$emit("activate", $event)
            }
          }
        },
        [
          _vm.loadingIndicator ? _c("datatable-progress") : _vm._e(),
          _vm._v(" "),
          _c(
            "datatable-scroller",
            {
              ref: "scroller",
              attrs: {
                scrollbarV: _vm.scrollbarV,
                scrollbarH: _vm.scrollbarH,
                scrollHeight: _vm.scrollHeight,
                scrollWidth: _vm.scrollWidth
              },
              on: { setup: _vm.onScrollSetup, scroll: _vm.onBodyScroll }
            },
            [
              _vm.summaryRow && _vm.summaryPosition === "top"
                ? _c("datatable-summary-row", {
                    staticClass: "datatable-summary-row",
                    attrs: {
                      rowHeight: _vm.summaryHeight,
                      offsetX: _vm.offsetX,
                      innerWidth: _vm.innerWidth,
                      rows: _vm.rows,
                      columns: _vm.columns,
                      columnsByPin: _vm.columnsByPin,
                      columnGroupWidths: _vm.columnGroupWidths,
                      groupStyles: _vm.getGroupStyles,
                      groupClass: _vm.getGroupClass,
                      slots: _vm.cellSlots
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.rowContexts, function(rowContext, i) {
                return _c(
                  "datatable-row-wrapper",
                  {
                    key: i,
                    attrs: {
                      styleObject: _vm.getRowWrapperStyles(rowContext),
                      groupRowsBy: _vm.groupRowsBy,
                      groupLevel: 0,
                      row: rowContext.row,
                      innerWidth: _vm.innerWidth,
                      rowDetail: _vm.rowDetail,
                      groupHeader: _vm.groupHeader,
                      offsetX: _vm.offsetX,
                      groupRowHeight: _vm.groupRowHeight,
                      rowDetailHeight: _vm.getDetailRowHeight(rowContext.row),
                      expanded: rowContext.expanded,
                      rowIndex: rowContext.rowIndex,
                      groupHeaderSlot: _vm.groupHeaderSlot,
                      rowDetailSlot: _vm.rowDetailSlot
                    },
                    on: {
                      "group-toggle": _vm.onGroupToggle,
                      "row-contextmenu": function($event) {
                        return _vm.$emit("rowContextmenu")
                      }
                    }
                  },
                  [
                    _c("datatable-body-row", {
                      attrs: {
                        tabindex: "-1",
                        columnsByPin: _vm.columnsByPin,
                        columnGroupWidths: _vm.columnGroupWidths,
                        groupStyles: _vm.getGroupStyles,
                        groupClass: _vm.getGroupClass(
                          rowContext.row,
                          rowContext.rowIndex
                        ),
                        row: rowContext.row,
                        rowContext: rowContext,
                        displayCheck: _vm.displayCheck,
                        slots: _vm.cellSlots,
                        renderTracking: _vm.renderTracking
                      },
                      on: {
                        "tree-action": function($event) {
                          return _vm.onTreeAction($event)
                        },
                        activate: function($event) {
                          return _vm.onActivate($event, i)
                        },
                        "row-created": _vm.onRowRendered,
                        "row-updated": _vm.onRowRendered
                      }
                    })
                  ],
                  1
                )
              }),
              _vm._v(" "),
              _vm.summaryRow && _vm.summaryPosition === "bottom"
                ? _c("datatable-summary-row", {
                    staticClass: "datatable-summary-row",
                    style: _vm.getBottomSummaryRowStyles,
                    attrs: {
                      rowHeight: _vm.summaryHeight,
                      offsetX: _vm.offsetX,
                      innerWidth: _vm.innerWidth,
                      rows: _vm.rows,
                      columns: _vm.columns,
                      columnsByPin: _vm.columnsByPin,
                      columnGroupWidths: _vm.columnGroupWidths,
                      groupStyles: _vm.getGroupStyles,
                      groupClass: _vm.getGroupClass,
                      slots: _vm.cellSlots
                    }
                  })
                : _vm._e()
            ],
            2
          ),
          _vm._v(" "),
          (!_vm.rows || !_vm.rows.length) && !_vm.loadingIndicator
            ? _c("div", {
                staticClass: "empty-row",
                domProps: { innerHTML: _vm._s(_vm.emptyMessage) }
              })
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/components/body/body.component.html?vue&type=template&id=0878f244&


/***/ }),

/***/ "./src/components/body/body.component.ts?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./src/components/body/body.component.ts?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--4!../../../node_modules/tslint-loader!./body.component.ts?vue&type=script&lang=js& */ "./node_modules/ts-loader/index.js?!./node_modules/tslint-loader/index.js!./src/components/body/body.component.ts?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_body_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/body/body.component.vue":
/*!************************************************!*\
  !*** ./src/components/body/body.component.vue ***!
  \************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _body_component_html_vue_type_template_id_0878f244___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./body.component.html?vue&type=template&id=0878f244& */ "./src/components/body/body.component.html?vue&type=template&id=0878f244&");
/* harmony import */ var _body_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./body.component.ts?vue&type=script&lang=js& */ "./src/components/body/body.component.ts?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _body_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _body_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _body_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _body_component_html_vue_type_template_id_0878f244___WEBPACK_IMPORTED_MODULE_0__["render"],
  _body_component_html_vue_type_template_id_0878f244___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/body/body.component.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/body/progress-bar.component.ts":
/*!*******************************************************!*\
  !*** ./src/components/body/progress-bar.component.ts ***!
  \*******************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var ProgressBarComponent = /** @class */ (function (_super) {
    __extends(ProgressBarComponent, _super);
    function ProgressBarComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressBarComponent = __decorate([
        vue_property_decorator_1.Component({
            template: "\n    <div class=\"progress-linear\" role=\"progressbar\">\n      <div class=\"ngx-container\">\n        <div class=\"ngx-bar\"></div>\n      </div>\n    </div>\n  ",
        })
    ], ProgressBarComponent);
    return ProgressBarComponent;
}(vue_property_decorator_1.Vue));
exports.default = ProgressBarComponent;


/***/ }),

/***/ "./src/components/body/scroller.component.ts":
/*!***************************************************!*\
  !*** ./src/components/body/scroller.component.ts ***!
  \***************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var ScrollerComponent = /** @class */ (function (_super) {
    __extends(ScrollerComponent, _super);
    function ScrollerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fromPager = true;
        _this.scrollYPos = 0;
        _this.scrollXPos = 0;
        _this.prevScrollYPos = 0;
        _this.prevScrollXPos = 0;
        _this.scrollDirty = false;
        return _this;
    }
    Object.defineProperty(ScrollerComponent.prototype, "styleObject", {
        get: function () {
            return {
                height: this.scrollHeight + 'px',
                width: this.scrollWidth + 'px',
            };
        },
        enumerable: true,
        configurable: true
    });
    ScrollerComponent.prototype.created = function () {
        this.$emit('setup', {
            scrollYPos: this.scrollYPos,
            scrollXPos: this.scrollXPos
        });
    };
    ScrollerComponent.prototype.mounted = function () {
        var _this = this;
        // manual bind so we don't always listen
        if (this.scrollbarV || this.scrollbarH) {
            // const renderer = this.renderer;
            this.parentElement = this.$el.closest('.datatable-body');
            // .parentElement; //  renderer.parentNode(renderer.parentNode(this.element));
            this.onScrollListener = this.onScrolled.bind(this);
            this.parentElement.addEventListener('scroll', this.onScrollListener, {
                passive: true,
            });
            this.onInitScrollHandler = this.onInitScroll.bind(this);
            'mousedown DOMMouseScroll mousewheel wheel touchstart keyup'.split(' ').forEach(function (event) {
                _this.parentElement.addEventListener(event, _this.onInitScrollHandler);
            });
        }
    };
    ScrollerComponent.prototype.destroyed = function () {
        var _this = this;
        if (this.scrollbarV || this.scrollbarH) {
            this.parentElement.removeEventListener('scroll', this.onScrollListener);
            'mousedown DOMMouseScroll mousewheel wheel touchstart keyup'.split(' ').forEach(function (event) {
                _this.parentElement.removeEventListener(event, _this.onInitScrollHandler);
            });
        }
    };
    ScrollerComponent.prototype.setOffset = function (offsetY, fromPager) {
        if (fromPager === void 0) { fromPager = false; }
        if (this.parentElement) {
            this.fromPager = fromPager;
            this.parentElement.scrollTop = offsetY;
        }
    };
    ScrollerComponent.prototype.incOffset = function (offsetY) {
        if (this.parentElement) {
            this.parentElement.scrollTop += offsetY;
        }
    };
    ScrollerComponent.prototype.onInitScroll = function () {
        this.fromPager = false;
    };
    ScrollerComponent.prototype.onScrolled = function (event) {
        var _this = this;
        if (this.scrollbarV || this.scrollbarH) {
            if (!this.scrollDirty) {
                this.scrollDirty = true;
                var dom_1 = event.currentTarget;
                requestAnimationFrame(function () {
                    _this.scrollYPos = dom_1.scrollTop;
                    _this.scrollXPos = dom_1.scrollLeft;
                    _this.updateOffset();
                    _this.scrollDirty = false;
                });
            }
            else {
                console.log('this.scrollDirty is true');
            }
        }
    };
    ScrollerComponent.prototype.updateOffset = function () {
        var direction;
        if (this.scrollYPos < this.prevScrollYPos) {
            direction = 'down';
        }
        else if (this.scrollYPos > this.prevScrollYPos) {
            direction = 'up';
        }
        else if (this.scrollXPos < this.prevScrollXPos) {
            direction = 'right';
        }
        else if (this.scrollXPos > this.prevScrollXPos) {
            direction = 'left';
        }
        if (direction) {
            this.$emit('scroll', {
                direction: direction,
                scrollYPos: this.scrollYPos,
                scrollXPos: this.scrollXPos,
                fromPager: this.fromPager
            });
        }
        this.prevScrollYPos = this.scrollYPos;
        this.prevScrollXPos = this.scrollXPos;
    };
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], ScrollerComponent.prototype, "scrollbarV", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], ScrollerComponent.prototype, "scrollbarH", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], ScrollerComponent.prototype, "scrollHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], ScrollerComponent.prototype, "scrollWidth", void 0);
    ScrollerComponent = __decorate([
        vue_property_decorator_1.Component({
            template: "\n  <div class=\"datatable-scroll\" :style=\"styleObject\">\n    <slot></slot>\n  </div>\n  ",
        })
    ], ScrollerComponent);
    return ScrollerComponent;
}(vue_property_decorator_1.Vue));
exports.default = ScrollerComponent;


/***/ }),

/***/ "./src/components/body/selection.component.ts":
/*!****************************************************!*\
  !*** ./src/components/body/selection.component.ts ***!
  \****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var utils_1 = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
var types_1 = __webpack_require__(/*! ../../types */ "./src/types/index.ts");
var check_type_1 = __webpack_require__(/*! ../../types/check.type */ "./src/types/check.type.ts");
var DataTableSelectionComponent = /** @class */ (function (_super) {
    __extends(DataTableSelectionComponent, _super);
    function DataTableSelectionComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataTableSelectionComponent.prototype.mounted = function () {
        this.bodyRect = this.$parent.$el.getBoundingClientRect();
    };
    DataTableSelectionComponent.prototype.updated = function () {
        this.bodyRect = this.$parent.$el.getBoundingClientRect();
    };
    DataTableSelectionComponent.prototype.selectRow = function (event, index, row) {
        var _a;
        if (!this.selectEnabled)
            return;
        var chkbox = this.selectionType === types_1.SelectionType.checkbox && this.checkMode === check_type_1.CheckMode.checkIsSelect;
        var multi = this.selectionType === types_1.SelectionType.multi;
        var multiClick = this.selectionType === types_1.SelectionType.multiClick;
        var selected = [];
        if (multi || chkbox || multiClick) {
            if (event.shiftKey) {
                selected = utils_1.selectRowsBetween([], this.rows, index, this.prevIndex, this.getRowSelectedIdx.bind(this));
            }
            else if (event.ctrlKey || event.metaKey || multiClick || chkbox) {
                selected = utils_1.selectRows(__spreadArrays(this.selected), row, this.getRowSelectedIdx.bind(this));
            }
            else {
                selected = utils_1.selectRows([], row, this.getRowSelectedIdx.bind(this));
            }
        }
        else {
            selected = utils_1.selectRows([], row, this.getRowSelectedIdx.bind(this));
        }
        this.prevIndex = index;
        if (typeof this.selectCheck === 'function') {
            selected = selected.filter(this.selectCheck.bind(this));
        }
        this.selected.splice(0, this.selected.length);
        (_a = this.selected).push.apply(_a, selected);
        this.$emit('select', {
            selected: selected,
            index: index
        });
    };
    DataTableSelectionComponent.prototype.checkRow = function (event, index, row) {
        var _a;
        if (!this.selectEnabled)
            return;
        var checked = [];
        if (event.shiftKey) {
            checked = utils_1.selectRowsBetween([], this.rows, index, this.prevIndex, this.getRowSelectedIdx.bind(this));
        }
        else {
            checked = utils_1.selectRows(__spreadArrays(this.checked), row, this.getRowSelectedIdx.bind(this));
        }
        this.prevIndex = index;
        if (typeof this.selectCheck === 'function') {
            checked = checked.filter(this.selectCheck.bind(this));
        }
        this.checked.splice(0, this.checked.length);
        (_a = this.checked).push.apply(_a, checked);
        this.$emit('check', {
            checked: checked
        });
    };
    DataTableSelectionComponent.prototype.onActivate = function (model, index) {
        var type = model.type, event = model.event, row = model.row, column = model.column;
        var chkbox = this.selectionType === types_1.SelectionType.checkbox && this.checkMode === check_type_1.CheckMode.checkIsSelect;
        var select = (!chkbox && (type === 'click' || type === 'dblclick')) || (chkbox && type === 'checkbox');
        if (this.checkMode === check_type_1.CheckMode.checkNoSelect && (column === null || column === void 0 ? void 0 : column.checkboxable)) {
            select = false;
        }
        if (select) {
            this.selectRow(event, index, row);
        }
        else if (type === 'checkbox' && this.checkMode === check_type_1.CheckMode.checkNoSelect) {
            this.checkRow(event, index, row);
        }
        else if (type === 'keydown') {
            if (event.keyCode === utils_1.Keys.return) {
                this.selectRow(event, index, row);
            }
            else {
                this.onKeyboardFocus(model);
            }
        }
        this.$emit('activate', model);
    };
    DataTableSelectionComponent.prototype.onKeyboardFocus = function (model) {
        var keyCode = model.event.keyCode;
        var shouldFocus = keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.right ||
            keyCode === utils_1.Keys.left ||
            keyCode === utils_1.Keys.pageUp ||
            keyCode === utils_1.Keys.pageDown;
        if (shouldFocus) {
            var isCellSelection = this.selectionType === types_1.SelectionType.cell;
            if (!model.cellElement || !isCellSelection) {
                this.focusRow(model, keyCode);
            }
            else if (isCellSelection) {
                this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
            }
        }
    };
    DataTableSelectionComponent.prototype.focusRow = function (model, keyCode) {
        return __awaiter(this, void 0, void 0, function () {
            var nextRowElement, index, _a, offsetY, height, scrolled, h;
            return __generator(this, function (_b) {
                nextRowElement = this.getPrevNextRow(model.rowElement, keyCode);
                index = 0;
                if (keyCode === utils_1.Keys.up) {
                    if (model.rowIndex - 1 < 0) {
                        return [2 /*return*/];
                    }
                    index = model.rowIndex - 1;
                }
                else if (keyCode === utils_1.Keys.down) {
                    if (model.rowIndex + 1 >= this.rows.length) {
                        return [2 /*return*/];
                    }
                    index = model.rowIndex + 1;
                }
                else if (keyCode === utils_1.Keys.pageUp) {
                    index = model.rowIndex - this.pageSize;
                    index = index < 0 ? 0 : index;
                }
                else if (keyCode === utils_1.Keys.pageDown) {
                    index = model.rowIndex + this.pageSize;
                    index = index >= this.rows.length ? this.rows.length - 1 : index;
                }
                _a = this.$parent.getRowOffsetY(index), offsetY = _a.offsetY, height = _a.height;
                if (!height) {
                    if (nextRowElement) {
                        nextRowElement.focus();
                    }
                    return [2 /*return*/];
                }
                scrolled = false;
                h = 0;
                if ([utils_1.Keys.down, utils_1.Keys.pageDown].includes(keyCode)) {
                    h = (offsetY + height) - (this.$parent.$el.scrollTop + this.bodyRect.height);
                }
                else if ([utils_1.Keys.up, utils_1.Keys.pageUp].includes(keyCode)) {
                    h = (offsetY - height) - this.$parent.$el.scrollTop;
                }
                if (h > 0 && [utils_1.Keys.down, utils_1.Keys.pageDown].includes(keyCode)) {
                    this.scroller.incOffset(h);
                    // scrolled = model.rowIndex === this.rows.length - 2 ? false : true;
                }
                else if (h < 0 && [utils_1.Keys.up, utils_1.Keys.pageUp].includes(keyCode)) {
                    this.scroller.incOffset(h);
                    scrolled = model.rowIndex === 1 ? false : true;
                }
                else if (h === 0 && [utils_1.Keys.up, utils_1.Keys.pageUp].includes(keyCode) && [0, 1, 2].includes(model.rowIndex)) {
                    this.scroller.setOffset(h);
                    // scrolled = true;
                }
                if (scrolled) {
                    model.rowElement.focus();
                }
                else {
                    if (nextRowElement) {
                        nextRowElement.focus();
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    DataTableSelectionComponent.prototype.focusRow1 = function (keyCode) {
        var _this = this;
        var index = 0;
        if (keyCode === utils_1.Keys.up) {
            if (this.prevIndex - 1 < 0) {
                return;
            }
            index = this.prevIndex - 1;
        }
        else if (keyCode === utils_1.Keys.down) {
            if (this.prevIndex + 1 >= this.rows.length) {
                return;
            }
            index = this.prevIndex + 1;
        }
        else if (keyCode === utils_1.Keys.pageUp) {
            index = this.prevIndex - this.pageSize;
            index = index < 0 ? 0 : index;
        }
        else if (keyCode === utils_1.Keys.pageDown) {
            index = this.prevIndex + this.pageSize;
            index = index >= this.rows.length ? this.rows.length - 1 : index;
        }
        var nextRow = this.rows[index];
        if (!nextRow) {
            return;
        }
        setTimeout(function () { return _this.selectRow({ shiftKey: false, ctrlKey: false }, index, nextRow); });
        var _a = this.$parent.getRowOffsetY(index), offsetY = _a.offsetY, height = _a.height;
        var h = 0;
        if ([utils_1.Keys.down, utils_1.Keys.pageDown].includes(keyCode)) {
            h = offsetY - this.bodyRect.height;
        }
        else if ([utils_1.Keys.up, utils_1.Keys.pageUp].includes(keyCode)) {
            h = (offsetY - height) - this.scroller.scrollYPos;
        }
        if (h > 0 && [utils_1.Keys.down, utils_1.Keys.pageDown].includes(keyCode)) {
            this.scroller.setOffset(h);
        }
        else if (h < 0 && [utils_1.Keys.up, utils_1.Keys.pageUp].includes(keyCode)) {
            this.scroller.incOffset(h);
        }
        // const { el: rowElement, height } = (this.$parent as any).getRowElementAndHeight(this.rows[this.prevIndex]);
        // if (!rowElement) {
        //   return;
        // }
        // const nextRowElement = this.getPrevNextRowElement(rowElement, keyCode);
        // // const nextRowElement = this.getPrevNextRow(rowElement, keyCode);
        // if (nextRowElement) {
        //   // nextRowElement.focus();
        //   let index = this.prevIndex;
        //   if (keyCode === Keys.up) {
        //     if (this.prevIndex - 1 < 0) {
        //       return;
        //     } 
        //     index = this.prevIndex - 1;
        //   } else if (keyCode === Keys.down) {
        //     if (this.prevIndex + 1 >= this.rows.length) {
        //       return;
        //     }
        //     index = this.prevIndex + 1
        //   }
        //   const row = this.rows[index];
        //   this.selectRow({ shiftKey: false, ctrlKey: false } as any, index, row);
        //   const bodyRect = this.$parent.$el.getBoundingClientRect();
        //   const rowRect = nextRowElement.getBoundingClientRect();
        //   const top = rowRect.top - bodyRect.top;
        //   let h = 0;
        //   if (keyCode === Keys.down) {
        //     h = (top + height) - bodyRect.height;
        //   } else if (keyCode === Keys.up) {
        //     h = top;
        //   }
        //   // console.log('before incOffset', h, bodyRect, rowRect, nextRowElement);
        //   if (h > 0 && keyCode === Keys.down) {
        //     // console.log('incOffset', h + 5);
        //     (this.scroller as any).incOffset(h + 5);
        //   } else if (h < 0 && keyCode === Keys.up) {
        //     (this.scroller as any).incOffset(h);
        //   }
        //   // (this.$el as any).focus();
        //   (nextRowElement as any).focus();
        // }
    };
    DataTableSelectionComponent.prototype.getPrevNextRowElement = function (rowElement, keyCode) {
        if (rowElement) {
            var focusElement = void 0;
            if (keyCode === utils_1.Keys.up) {
                focusElement = rowElement.previousElementSibling;
            }
            else if (keyCode === utils_1.Keys.down) {
                focusElement = rowElement.nextElementSibling;
            }
            return focusElement;
        }
    };
    DataTableSelectionComponent.prototype.getPrevNextRow = function (rowElement, keyCode) {
        var parentElement = rowElement.parentElement;
        if (parentElement) {
            var focusElement = void 0;
            if (keyCode === utils_1.Keys.up) {
                focusElement = parentElement.previousElementSibling;
            }
            else if (keyCode === utils_1.Keys.down) {
                focusElement = parentElement.nextElementSibling;
            }
            if (focusElement && focusElement.children.length) {
                return focusElement.children[0];
            }
        }
    };
    DataTableSelectionComponent.prototype.getPrevNextRow1 = function (rowElement, keyCode) {
        var parentElement = rowElement.parentElement;
        // const parentElement = rowElement.closest('.datatable-row-wrapper');
        if (parentElement) {
            var focusElement = void 0;
            if (keyCode === utils_1.Keys.up) {
                focusElement = parentElement.previousElementSibling;
            }
            else if (keyCode === utils_1.Keys.down) {
                focusElement = parentElement.nextElementSibling;
            }
            // return focusElement;
            if (focusElement && focusElement.children.length) {
                return focusElement.children[0];
            }
        }
    };
    DataTableSelectionComponent.prototype.focusCell = function (cellElement, rowElement, keyCode, cellIndex) {
        var nextCellElement;
        if (keyCode === utils_1.Keys.left) {
            nextCellElement = cellElement.previousElementSibling;
        }
        else if (keyCode === utils_1.Keys.right) {
            nextCellElement = cellElement.nextElementSibling;
        }
        else if (keyCode === utils_1.Keys.up || keyCode === utils_1.Keys.down) {
            var nextRowElement = this.getPrevNextRow(rowElement, keyCode);
            if (nextRowElement) {
                var children = nextRowElement.getElementsByClassName('datatable-body-cell');
                if (children.length)
                    nextCellElement = children[cellIndex];
            }
        }
        if (nextCellElement)
            nextCellElement.focus();
    };
    DataTableSelectionComponent.prototype.getRowSelected = function (row) {
        return this.getRowSelectedIdx(row, this.selected) > -1;
    };
    DataTableSelectionComponent.prototype.getRowChecked = function (row) {
        var arr = this.checkMode === check_type_1.CheckMode.checkIsSelect ? this.selected : this.checked;
        return this.getRowSelectedIdx(row, arr) > -1;
    };
    DataTableSelectionComponent.prototype.getRowSelectedIdx = function (row, selected) {
        var _this = this;
        if (!selected || !selected.length)
            return -1;
        var rowId = this.rowIdentity(row);
        return selected.findIndex(function (r) {
            var id = _this.rowIdentity(r);
            return id === rowId;
        });
    };
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DataTableSelectionComponent.prototype, "rows", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DataTableSelectionComponent.prototype, "selected", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DataTableSelectionComponent.prototype, "checked", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableSelectionComponent.prototype, "selectEnabled", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableSelectionComponent.prototype, "selectionType", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableSelectionComponent.prototype, "checkMode", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableSelectionComponent.prototype, "rowIdentity", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableSelectionComponent.prototype, "selectCheck", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableSelectionComponent.prototype, "scroller", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableSelectionComponent.prototype, "pageSize", void 0);
    DataTableSelectionComponent = __decorate([
        vue_property_decorator_1.Component({
            template: "\n    <div id=\"selector\">\n      <slot>\n        selection\n      </slot>\n    </div>\n  ",
        })
    ], DataTableSelectionComponent);
    return DataTableSelectionComponent;
}(vue_property_decorator_1.Vue));
exports.default = DataTableSelectionComponent;


/***/ }),

/***/ "./src/components/body/summary/summary-row.component.ts":
/*!**************************************************************!*\
  !*** ./src/components/body/summary/summary-row.component.ts ***!
  \**************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var body_row_component_vue_1 = __webpack_require__(/*! ../body-row.component.vue */ "./src/components/body/body-row.component.vue");
function defaultSumFunc(cells) {
    var cellsWithValues = cells.filter(function (cell) { return !!cell; });
    if (!cellsWithValues.length) {
        return null;
    }
    if (cellsWithValues.some(function (cell) { return typeof cell !== 'number'; })) {
        return null;
    }
    return cellsWithValues.reduce(function (res, cell) { return res + cell; });
}
function noopSumFunc(cells) {
    return null;
}
var DataTableSummaryRowComponent = /** @class */ (function (_super) {
    __extends(DataTableSummaryRowComponent, _super);
    function DataTableSummaryRowComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.internalColumns = [];
        _this.summaryRow = {};
        _this.mySlotsFunc = null;
        _this.myRowContext = null;
        return _this;
    }
    DataTableSummaryRowComponent.prototype.onRowsChanged = function () {
        this.onChanges();
    };
    DataTableSummaryRowComponent.prototype.onColumnsChanged = function () {
        this.onChanges();
    };
    DataTableSummaryRowComponent.prototype.onChanges = function () {
        if (!this.columns || !this.rows) {
            return;
        }
        this.updateInternalColumns();
        this.updateValues();
    };
    DataTableSummaryRowComponent.prototype.onActivate = function (event) {
        this.$emit('summary-activate', event, this.summaryRow);
    };
    DataTableSummaryRowComponent.prototype.updateInternalColumns = function () {
        this.mySlotsFunc = this.slots;
        var summarySlots = {};
        this.internalColumns = this.columns.map(function (col) {
            if (col.summaryTemplate) {
                summarySlots[col.prop] = col.summaryTemplate;
            }
            return col;
        });
        if (Object.keys(summarySlots).length) {
            var slots_1 = Object.assign({}, this.slots());
            Object.keys(summarySlots).forEach(function (column) {
                slots_1[column] = summarySlots[column];
            });
            this.mySlotsFunc = function () { return slots_1; };
        }
    };
    DataTableSummaryRowComponent.prototype.updateValues = function () {
        var _this = this;
        this.summaryRow = {};
        this.columns
            .filter(function (col) { return !col.summaryTemplate; })
            .forEach(function (col) {
            var cellsFromSingleColumn = _this.rows.map(function (row) { return row[col.prop]; });
            var sumFunc = _this.getSummaryFunction(col);
            // this.summaryRow[col.prop] = col.pipe ?
            //   col.pipe.transform(sumFunc(cellsFromSingleColumn)) :
            //   sumFunc(cellsFromSingleColumn);
            _this.summaryRow[col.prop] = col.filter ?
                col.filter(sumFunc(cellsFromSingleColumn)) :
                sumFunc(cellsFromSingleColumn);
        });
        this.myRowContext = { row: this.summaryRow, rowIndex: -1, expanded: false, isChecked: false, isSelected: false, rowHeight: this.rowHeight, treeStatus: null };
    };
    DataTableSummaryRowComponent.prototype.getSummaryFunction = function (column) {
        if (column.summaryFunc === undefined) {
            return defaultSumFunc;
        }
        else if (column.summaryFunc === null) {
            return noopSumFunc;
        }
        else {
            return column.summaryFunc;
        }
    };
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DataTableSummaryRowComponent.prototype, "rows", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DataTableSummaryRowComponent.prototype, "columns", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableSummaryRowComponent.prototype, "rowHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableSummaryRowComponent.prototype, "offsetX", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableSummaryRowComponent.prototype, "innerWidth", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DataTableSummaryRowComponent.prototype, "columnsByPin", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableSummaryRowComponent.prototype, "columnGroupWidths", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableSummaryRowComponent.prototype, "groupStyles", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableSummaryRowComponent.prototype, "groupClass", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableSummaryRowComponent.prototype, "slots", void 0);
    __decorate([
        vue_property_decorator_1.Watch('rows', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableSummaryRowComponent.prototype, "onRowsChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('columns'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableSummaryRowComponent.prototype, "onColumnsChanged", null);
    DataTableSummaryRowComponent = __decorate([
        vue_property_decorator_1.Component({
            components: {
                'datatable-body-row': body_row_component_vue_1.default,
            },
            template: "\n  <datatable-body-row\n    v-if=\"summaryRow && internalColumns\"\n    tabindex=\"-1\"\n    :columnsByPin=\"columnsByPin\"\n    :columnGroupWidths=\"columnGroupWidths\"\n    :groupStyles=\"groupStyles\"\n    :groupClass=\"groupClass(rowContext.row, -1)\"\n    :rowContext=\"myRowContext\"\n    :slots=\"cellSlots\"\n    :renderTracking=\"renderTracking\"\n    :row=\"summaryRow\"\n    :slots=\"mySlotsFunc\"\n    @activate=\"onActivate\">\n  </datatable-body-row>\n  ",
        })
    ], DataTableSummaryRowComponent);
    return DataTableSummaryRowComponent;
}(vue_property_decorator_1.Vue));
exports.default = DataTableSummaryRowComponent;


/***/ }),

/***/ "./src/components/columns/column.component.ts":
/*!****************************************************!*\
  !*** ./src/components/columns/column.component.ts ***!
  \****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var DataTableColumnComponent = /** @class */ (function (_super) {
    __extends(DataTableColumnComponent, _super);
    function DataTableColumnComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.column = {};
        return _this;
    }
    DataTableColumnComponent.prototype.mounted = function () {
        this.$set(this.column, 'name', this.name);
        this.$set(this.column, 'prop', this.prop);
        this.$set(this.column, 'frozenLeft', this.frozenLeft);
        this.$set(this.column, 'frozenRight', this.frozenRight);
        this.$set(this.column, 'flexGrow', this.flexGrow);
        this.$set(this.column, 'resizeable', this.resizeable);
        this.$set(this.column, 'comparator', this.comparator);
        this.$set(this.column, 'sortable', this.sortable);
        this.$set(this.column, 'draggable', this.draggable);
        this.$set(this.column, 'canAutoResize', this.canAutoResize);
        this.$set(this.column, 'minWidth', this.minWidth);
        this.$set(this.column, 'width', this.width);
        this.$set(this.column, 'maxWidth', this.maxWidth);
        this.$set(this.column, 'checkboxable', this.checkboxable);
        this.$set(this.column, 'headerCheckboxable', this.headerCheckboxable);
        var headerClasses = [];
        if (Array.isArray(this.headerClass)) {
            headerClasses = __spreadArrays(this.headerClass);
        }
        else if (typeof this.headerClass === 'string') {
            headerClasses.push(this.headerClass);
        }
        else if (typeof this.headerClass === 'function') {
            var res = this.headerClass({
                column: this.column
            });
            if (typeof res === 'string') {
                headerClasses.push(res);
            }
            else if (typeof res === 'object') {
                var keys = Object.keys(res);
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    if (res[key] === true) {
                        headerClasses.push(key);
                    }
                }
            }
        }
        for (var i = 0; i < this.$el.classList.length; i++) {
            var value = this.$el.classList[0];
            headerClasses.push(value);
        }
        this.$set(this.column, 'headerClass', headerClasses);
        var cellClasses = [];
        if (Array.isArray(this.cellClass)) {
            cellClasses = __spreadArrays(this.cellClass);
        }
        else if (typeof this.cellClass === 'string') {
            cellClasses.push(this.cellClass);
        }
        else if (typeof this.cellClass === 'function') {
            cellClasses.push(this.cellClass);
        }
        for (var i = 0; i < this.$el.classList.length; i++) {
            var value = this.$el.classList[0];
            cellClasses.push(value);
        }
        this.$set(this.column, 'cellClass', cellClasses);
        this.$set(this.column, 'isTreeColumn', this.isTreeColumn);
        this.$set(this.column, 'treeLevelIndent', this.treeLevelIndent);
        this.$set(this.column, 'summaryFunc', this.summaryFunc);
        this.$set(this.column, 'headerTemplate', this.$scopedSlots.header);
        this.$set(this.column, 'cellTemplate', this.$scopedSlots.default);
        this.$set(this.column, 'summaryTemplate', this.$scopedSlots.summary);
        this.$set(this.column, 'visible', this.visible);
        // todo: select any way to pass column to datatable // this.$emit('insert-column', column);
        this.$parent.onColumnInsert(this.column);
    };
    DataTableColumnComponent.prototype.destroyed = function () {
        this.$parent.onColumnRemoved(this.column);
    };
    DataTableColumnComponent.prototype.onVisibleChanged = function (newVal) {
        this.column.visible = newVal;
        this.$parent.onColumnChangeVisible(this.column);
    };
    DataTableColumnComponent.prototype.onWidthChanged = function () {
        this.$emit('update-width', this.column.width);
    };
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableColumnComponent.prototype, "name", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableColumnComponent.prototype, "prop", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableColumnComponent.prototype, "frozenLeft", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableColumnComponent.prototype, "frozenRight", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableColumnComponent.prototype, "flexGrow", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableColumnComponent.prototype, "resizeable", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableColumnComponent.prototype, "comparator", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableColumnComponent.prototype, "pipe", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableColumnComponent.prototype, "sortable", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableColumnComponent.prototype, "draggable", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableColumnComponent.prototype, "canAutoResize", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableColumnComponent.prototype, "minWidth", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableColumnComponent.prototype, "width", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableColumnComponent.prototype, "maxWidth", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableColumnComponent.prototype, "checkboxable", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableColumnComponent.prototype, "headerCheckboxable", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableColumnComponent.prototype, "headerClass", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableColumnComponent.prototype, "cellClass", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableColumnComponent.prototype, "isTreeColumn", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableColumnComponent.prototype, "treeLevelIndent", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Function)
    ], DataTableColumnComponent.prototype, "summaryFunc", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: true }),
        __metadata("design:type", Boolean)
    ], DataTableColumnComponent.prototype, "visible", void 0);
    __decorate([
        vue_property_decorator_1.Watch('visible'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DataTableColumnComponent.prototype, "onVisibleChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('column.width'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableColumnComponent.prototype, "onWidthChanged", null);
    DataTableColumnComponent = __decorate([
        vue_property_decorator_1.Component({
            template: "\n    <div>\n      <slot name=\"header\" v-bind=\"{column: column}\">\n      <!-- default content -->\n        {{ name }}\n      </slot>\n      <!-- default slot for cell -->\n      <slot>\n      </slot>\n    </div>"
        })
    ], DataTableColumnComponent);
    return DataTableColumnComponent;
}(vue_property_decorator_1.Vue));
exports.default = DataTableColumnComponent;


/***/ }),

/***/ "./src/components/datatable.component.html?vue&type=template&id=3f42d2da&":
/*!********************************************************************************************!*\
  !*** ./src/components/datatable.component.html?vue&type=template&id=3f42d2da& + 1 modules ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "render", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./config/my-vue-raw-loader.js!./src/components/datatable.component.html?vue&type=template&id=3f42d2da&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        { name: "visibility-observer", rawName: "v-visibility-observer" }
      ],
      staticClass: "ngx-datatable",
      class: _vm.classObject,
      on: { visible: _vm.onVisible, "insert-column": _vm.onColumnInsert }
    },
    [
      _c(
        "div",
        { ref: "hiddenColumns", staticClass: "hidden-columns" },
        [_vm._t("default")],
        2
      ),
      _vm._v(" "),
      _vm.headerHeight
        ? _c("datatable-header", {
            ref: "datatableHeader",
            staticClass: "datatable-header",
            attrs: {
              sorts: _vm.sorts,
              sortType: _vm.mySortType,
              scrollbarWidth: _vm.scrollbarWidth,
              scrollbarH: _vm.scrollbarH,
              innerWidth: _vm.innerWidth,
              offsetX: _vm.offsetX,
              dealsWithGroup: _vm.groupRowsBy,
              columns: _vm.internalColumns,
              headerHeight: _vm.headerHeight,
              reorderable: _vm.reorderable,
              targetMarkerTemplate: _vm.targetMarkerTemplate,
              sortAscendingIcon: _vm.cssClasses.sortAscending,
              sortDescendingIcon: _vm.cssClasses.sortDescending,
              allRowsSelected: _vm.allRowsSelected,
              selectionType: _vm.selectionType
            },
            on: {
              sort: function($event) {
                return _vm.onColumnSort($event)
              },
              resize: function($event) {
                return _vm.onColumnResize($event)
              },
              reorder: function($event) {
                return _vm.onColumnReorder($event)
              },
              select: function($event) {
                return _vm.onHeaderSelect($event)
              },
              columnContextmenu: function($event) {
                return _vm.onColumnContextmenu($event)
              }
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("datatable-body", {
        ref: "datatableBody",
        attrs: {
          groupRowsBy: _vm.groupRowsBy,
          rows: _vm.internalRows,
          groupExpansionDefault: _vm.groupExpansionDefault,
          scrollbarV: _vm.scrollbarV,
          scrollbarH: _vm.scrollbarH,
          virtualization: _vm.virtualization,
          loadingIndicator: _vm.loadingIndicator,
          externalPaging: _vm.externalPaging,
          rowHeight: _vm.rowHeight,
          rowCount: _vm.rowCount,
          offset: _vm.myOffset,
          trackByProp: _vm.trackByProp,
          columns: _vm.internalColumns,
          pageSize: _vm.pageSize,
          limit: _vm.limit,
          offsetX: _vm.offsetX,
          rowDetail: _vm.rowDetail,
          rowDetailHeight: _vm.rowDetailHeight,
          groupHeader: _vm.groupHeader,
          selected: _vm.mySelected,
          checked: _vm.myChecked,
          innerWidth: _vm.innerWidth,
          bodyHeight: _vm.bodyHeight,
          selectionType: _vm.selectionType,
          checkMode: _vm.checkMode,
          emptyMessage: _vm.messages.emptyMessage,
          rowIdentity: _vm.rowIdentity,
          rowClass: _vm.rowClass,
          selectCheck: _vm.selectCheck,
          displayCheck: _vm.displayCheck,
          summaryRow: _vm.summaryRow,
          summaryHeight: _vm.summaryHeight,
          summaryPosition: _vm.summaryPosition,
          groupRowHeight: _vm.groupRowHeight,
          groupHeaderSlot: _vm.groupHeaderSlot,
          rowDetailSlot: _vm.rowDetailSlot,
          renderTracking: _vm.renderTracking
        },
        on: {
          page: _vm.onBodyPage,
          activate: function($event) {
            return _vm.$emit("activate", $event)
          },
          rowContextmenu: _vm.onRowContextmenu,
          select: _vm.onBodySelect,
          check: _vm.onBodyCheck,
          scroll: _vm.onBodyScroll,
          "group-toggle": _vm.onGroupToggle,
          "tree-action": _vm.onTreeAction,
          rendered: function($event) {
            return _vm.$emit("rendered", $event)
          }
        }
      }),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "datatable-footer",
          class: { "datatable-footer-border": Boolean(_vm.footerHeight) }
        },
        [
          _vm.footerHeight
            ? _c("datatable-footer", {
                ref: "datatableFooter",
                attrs: {
                  rowCount: _vm.rowCount,
                  pageSize: _vm.pageSize,
                  offset: _vm.myOffset,
                  footerHeight: _vm.footerHeight,
                  totalMessage: _vm.messages.totalMessage,
                  pagerLeftArrowIcon: _vm.cssClasses.pagerLeftArrow,
                  pagerRightArrowIcon: _vm.cssClasses.pagerRightArrow,
                  pagerPreviousIcon: _vm.cssClasses.pagerPrevious,
                  selectedCount: _vm.mySelected.length,
                  selectedMessage:
                    !!_vm.selectionType && _vm.messages.selectedMessage,
                  pagerNextIcon: _vm.cssClasses.pagerNext,
                  footerSlot: _vm.footerSlot
                },
                on: { page: _vm.onFooterPage }
              })
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/components/datatable.component.html?vue&type=template&id=3f42d2da&


/***/ }),

/***/ "./src/components/datatable.component.scss?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************!*\
  !*** ./src/components/datatable.component.scss?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_oneOf_1_2_datatable_component_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--2-oneOf-1-2!./datatable.component.scss?vue&type=style&index=0&lang=scss& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js?!./src/components/datatable.component.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_oneOf_1_2_datatable_component_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_oneOf_1_2_datatable_component_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_oneOf_1_2_datatable_component_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_oneOf_1_2_datatable_component_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_2_oneOf_1_2_datatable_component_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/datatable.component.ts?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./src/components/datatable.component.ts?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_datatable_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--4!../../node_modules/tslint-loader!./datatable.component.ts?vue&type=script&lang=js& */ "./node_modules/ts-loader/index.js?!./node_modules/tslint-loader/index.js!./src/components/datatable.component.ts?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_datatable_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_datatable_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_datatable_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_datatable_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_4_node_modules_tslint_loader_index_js_datatable_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/datatable.component.vue":
/*!************************************************!*\
  !*** ./src/components/datatable.component.vue ***!
  \************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _datatable_component_html_vue_type_template_id_3f42d2da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datatable.component.html?vue&type=template&id=3f42d2da& */ "./src/components/datatable.component.html?vue&type=template&id=3f42d2da&");
/* harmony import */ var _datatable_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datatable.component.ts?vue&type=script&lang=js& */ "./src/components/datatable.component.ts?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _datatable_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _datatable_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _datatable_component_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./datatable.component.scss?vue&type=style&index=0&lang=scss& */ "./src/components/datatable.component.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _datatable_component_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _datatable_component_html_vue_type_template_id_3f42d2da___WEBPACK_IMPORTED_MODULE_0__["render"],
  _datatable_component_html_vue_type_template_id_3f42d2da___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/datatable.component.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/footer/footer.component.ts":
/*!***************************************************!*\
  !*** ./src/components/footer/footer.component.ts ***!
  \***************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var pager_component_1 = __webpack_require__(/*! ./pager.component */ "./src/components/footer/pager.component.ts");
var DataTableFooterComponent = /** @class */ (function (_super) {
    __extends(DataTableFooterComponent, _super);
    function DataTableFooterComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataTableFooterComponent.prototype.created = function () {
        if (this.footerSlot) {
            this.$slots.default = this.footerSlot({
                rowCount: this.rowCount,
                pageSize: this.pageSize,
                selectedCount: this.selectedCount,
                curPage: this.curPage,
                offset: this.offset,
            });
        }
    };
    DataTableFooterComponent.prototype.beforeUpdate = function () {
        if (this.footerSlot) {
            this.$slots.default = this.footerSlot({
                rowCount: this.rowCount,
                pageSize: this.pageSize,
                selectedCount: this.selectedCount,
                curPage: this.curPage,
                offset: this.offset,
            });
        }
    };
    Object.defineProperty(DataTableFooterComponent.prototype, "isVisible", {
        get: function () {
            return (this.rowCount / this.pageSize) > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableFooterComponent.prototype, "curPage", {
        get: function () {
            return this.offset + 1;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableFooterComponent.prototype, "footerHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableFooterComponent.prototype, "rowCount", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableFooterComponent.prototype, "pageSize", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableFooterComponent.prototype, "offset", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableFooterComponent.prototype, "pagerLeftArrowIcon", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableFooterComponent.prototype, "pagerRightArrowIcon", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableFooterComponent.prototype, "pagerPreviousIcon", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableFooterComponent.prototype, "pagerNextIcon", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableFooterComponent.prototype, "totalMessage", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableFooterComponent.prototype, "footerSlot", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], DataTableFooterComponent.prototype, "selectedCount", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableFooterComponent.prototype, "selectedMessage", void 0);
    DataTableFooterComponent = __decorate([
        vue_property_decorator_1.Component({
            components: {
                'datatable-pager': pager_component_1.default
            },
            template: "\n    <div\n      class=\"datatable-footer-inner\"\n      :class=\"{'selected-count': selectedMessage }\"\n      :style = \"{ 'height': footerHeight + 'px' }\">\n      <slot v-bind:row=\"{ rowCount: rowCount, pageSize: pageSize, \n                          selectedCount: selectedCount, curPage: curPage, offset: offset }\">\n        <div class=\"page-count\">\n          <span v-if=\"selectedMessage\">\n            {{selectedCount.toLocaleString()}} {{selectedMessage}} / \n          </span>\n          {{rowCount.toLocaleString()}} {{totalMessage}}\n        </div>\n      </slot>\n      <div class=\"datatable-pager\">\n        <datatable-pager\n          :pagerLeftArrowIcon=\"pagerLeftArrowIcon\"\n          :pagerRightArrowIcon=\"pagerRightArrowIcon\"\n          :pagerPreviousIcon=\"pagerPreviousIcon\"\n          :pagerNextIcon=\"pagerNextIcon\"\n          :page=\"curPage\"\n          :size=\"pageSize\"\n          :count=\"rowCount\"\n          :hidden=\"!isVisible\"\n          @change-page=\"$emit('page', $event)\">\n        </datatable-pager>\n      </div>\n    </div>\n  ",
        })
    ], DataTableFooterComponent);
    return DataTableFooterComponent;
}(vue_property_decorator_1.Vue));
exports.default = DataTableFooterComponent;


/***/ }),

/***/ "./src/components/footer/pager.component.ts":
/*!**************************************************!*\
  !*** ./src/components/footer/pager.component.ts ***!
  \**************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var DataTablePagerComponent = /** @class */ (function (_super) {
    __extends(DataTablePagerComponent, _super);
    function DataTablePagerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pages = [];
        _this.myPage = 0;
        return _this;
    }
    DataTablePagerComponent.prototype.onCountChanged = function () {
        this.pages = this.calcPages();
    };
    DataTablePagerComponent.prototype.onSizeChanged = function () {
        this.pages = this.calcPages();
    };
    DataTablePagerComponent.prototype.onPageChanged = function () {
        this.myPage = this.page;
        this.pages = this.calcPages();
    };
    DataTablePagerComponent.prototype.created = function () {
        this.myPage = this.page;
        this.pages = this.calcPages();
    };
    Object.defineProperty(DataTablePagerComponent.prototype, "totalPages", {
        get: function () {
            var count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
            return Math.max(count || 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "canPrevious", {
        // @Output() change: EventEmitter<any> = new EventEmitter();
        get: function () {
            return this.myPage > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "canNext", {
        get: function () {
            return this.myPage < this.totalPages;
        },
        enumerable: true,
        configurable: true
    });
    DataTablePagerComponent.prototype.prevPage = function () {
        this.selectPage(this.myPage - 1);
    };
    DataTablePagerComponent.prototype.nextPage = function () {
        this.selectPage(this.myPage + 1);
    };
    DataTablePagerComponent.prototype.selectPage = function (page) {
        if (page > 0 && page <= this.totalPages && page !== this.myPage) {
            this.myPage = page;
            this.$emit('change-page', {
                page: page
            });
        }
    };
    DataTablePagerComponent.prototype.calcPages = function (page) {
        var pages = [];
        var startPage = 1;
        var endPage = this.totalPages;
        var maxSize = 5;
        var isMaxSized = maxSize < this.totalPages;
        page = page || this.myPage;
        if (isMaxSized) {
            startPage = page - Math.floor(maxSize / 2);
            endPage = page + Math.floor(maxSize / 2);
            if (startPage < 1) {
                startPage = 1;
                endPage = Math.min(startPage + maxSize - 1, this.totalPages);
            }
            else if (endPage > this.totalPages) {
                startPage = Math.max(this.totalPages - maxSize + 1, 1);
                endPage = this.totalPages;
            }
        }
        for (var num = startPage; num <= endPage; num++) {
            pages.push({
                number: num,
                text: num
            });
        }
        return pages;
    };
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTablePagerComponent.prototype, "pagerLeftArrowIcon", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTablePagerComponent.prototype, "pagerRightArrowIcon", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTablePagerComponent.prototype, "pagerPreviousIcon", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTablePagerComponent.prototype, "pagerNextIcon", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], DataTablePagerComponent.prototype, "size", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Number, default: 0 }),
        __metadata("design:type", Number)
    ], DataTablePagerComponent.prototype, "count", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ type: Number, default: 1 }),
        __metadata("design:type", Number)
    ], DataTablePagerComponent.prototype, "page", void 0);
    __decorate([
        vue_property_decorator_1.Watch('count'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTablePagerComponent.prototype, "onCountChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('size'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTablePagerComponent.prototype, "onSizeChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('page'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTablePagerComponent.prototype, "onPageChanged", null);
    DataTablePagerComponent = __decorate([
        vue_property_decorator_1.Component({
            template: "\n    <ul class=\"pager\">\n      <li :class=\"{ disabled: !canPrevious }\">\n        <a\n          role=\"button\"\n          aria-label=\"go to first page\"\n          href=\"javascript:void(0)\"\n          @click=\"selectPage(1)\">\n          <i :class=\"pagerPreviousIcon\"></i>\n        </a>\n      </li>\n      <li :class=\"{ disabled: !canPrevious }\">\n        <a\n          role=\"button\"\n          aria-label=\"go to previous page\"\n          href=\"javascript:void(0)\"\n          @click=\"prevPage\">\n          <i :class=\"pagerLeftArrowIcon\"></i>\n        </a>\n      </li>\n      <li\n        role=\"button\"\n        aria-label=\"'page ' + pg.number\"\n        class=\"pages\"\n        v-for=\"pg of pages\"\n        :class=\"{ active: pg.number === myPage }\">\n        <a\n          href=\"javascript:void(0)\"\n          @click=\"selectPage(pg.number)\">\n          {{pg.text}}\n        </a>\n      </li>\n      <li :class=\"{ disabled: !canNext }\">\n        <a\n          role=\"button\"\n          aria-label=\"go to next page\"\n          href=\"javascript:void(0)\"\n          @click=\"nextPage\">\n          <i :class=\"pagerRightArrowIcon\"></i>\n        </a>\n      </li>\n      <li :class=\"{ disabled: !canNext }\">\n        <a\n          role=\"button\"\n          aria-label=\"go to last page\"\n          href=\"javascript:void(0)\"\n          @click=\"selectPage(totalPages)\">\n          <i :class=\"pagerNextIcon\"></i>\n        </a>\n      </li>\n    </ul>\n  ",
        })
    ], DataTablePagerComponent);
    return DataTablePagerComponent;
}(vue_property_decorator_1.Vue));
exports.default = DataTablePagerComponent;


/***/ }),

/***/ "./src/components/header/header-cell.component.ts":
/*!********************************************************!*\
  !*** ./src/components/header/header-cell.component.ts ***!
  \********************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var types_1 = __webpack_require__(/*! ../../types */ "./src/types/index.ts");
var utils_1 = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
var DataTableHeaderCellComponent = /** @class */ (function (_super) {
    __extends(DataTableHeaderCellComponent, _super);
    function DataTableHeaderCellComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sortFn = _this.onSort.bind(_this);
        _this.sortDir = null;
        _this.myAllRowsSelected = false;
        _this.sortOrder = '';
        // selectFn = this.select.emit.bind(this.select);
        _this.cellContext = {
            column: _this.column,
            sortDir: _this.sortDir,
            sortFn: _this.sortFn,
            allRowsSelected: _this.allRowsSelected,
        };
        return _this;
    }
    DataTableHeaderCellComponent.prototype.onAllRowsSelectedChanged = function () {
        this.myAllRowsSelected = this.allRowsSelected;
        this.cellContext.allRowsSelected = this.allRowsSelected;
    };
    DataTableHeaderCellComponent.prototype.onColumnChahged = function () {
        this.cellContext.column = this.column;
    };
    DataTableHeaderCellComponent.prototype.onSortsChanged = function () {
        this.sortDir = this.calcSortDir(this.sorts);
        this.cellContext.sortDir = this.sortDir;
    };
    DataTableHeaderCellComponent.prototype.created = function () {
        this.$emit('header-cell-created', this.$el);
        if (this.column.headerTemplate) {
            this.$slots.default = this.column.headerTemplate({ column: this.column });
        }
    };
    DataTableHeaderCellComponent.prototype.mounted = function () {
        this.column.element = this.$el;
        this.$emit('header-cell-mounted', this.$el);
    };
    DataTableHeaderCellComponent.prototype.beforeUpdate = function () {
        if (this.column.headerTemplate) {
            this.$slots.default = this.column.headerTemplate({ column: this.column });
        }
    };
    DataTableHeaderCellComponent.prototype.onCheckboxChange = function () {
        this.$emit('select', this.myAllRowsSelected);
    };
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "columnCssClasses", {
        get: function () {
            var cls = 'datatable-header-cell';
            if (this.column) {
                if (this.column.sortable)
                    cls += ' sortable';
                if (this.column.resizeable)
                    cls += ' resizeable';
                if (this.column.draggable)
                    cls += ' draggable';
                if (this.column.headerClass) {
                    if (typeof this.column.headerClass === 'string') {
                        cls += ' ' + this.column.headerClass;
                    }
                    else if (Array.isArray(this.column.headerClass)) {
                        cls += ' ' + this.column.headerClass.join(' ');
                    }
                    else if (typeof this.column.headerClass === 'function') {
                        var res = this.column.headerClass({
                            column: this.column
                        });
                        if (typeof res === 'string') {
                            cls += res;
                        }
                        else if (typeof res === 'object') {
                            var keys = Object.keys(res);
                            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                                var k = keys_1[_i];
                                if (res[k] === true)
                                    cls += " " + k;
                            }
                        }
                    }
                }
            }
            var sortDir = this.sortDir;
            if (sortDir) {
                cls += " sort-active sort-" + sortDir;
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "name", {
        // @HostBinding('attr.title')
        get: function () {
            // guaranteed to have a value by setColumnDefaults() in column-helper.ts
            return this.column.headerTemplate === undefined ? this.column.name : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "styles", {
        // @HostBinding('style.height.px')
        get: function () {
            // const width = this.calcRealWidth();
            // if (width !== null && width < 10) {
            //   this.column.visible = false;
            // } else {
            //   this.column.visible = true;
            // }
            return {
                height: this.headerHeight + 'px',
                width: this.column.width + 'px',
                'min-width': this.column.minWidth + 'px',
                'max-width': this.column.maxWidth + 'px',
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "sortCssClass", {
        get: function () {
            return this.calcSortCssClass(this.sortDir);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "cssClass", {
        get: function () {
            return this.calcCssClass(this.sortDir);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "isCheckboxable", {
        // @HostBinding('style.minWidth.px')
        // get minWidth(): number {
        //   return this.column.minWidth;
        // }
        // @HostBinding('style.maxWidth.px')
        // get maxWidth(): number {
        //   return this.column.maxWidth;
        // }
        // @HostBinding('style.width.px')
        // get width(): number {
        //   return this.column.width;
        // }
        get: function () {
            return this.column.checkboxable && this.column.headerCheckboxable;
        },
        enumerable: true,
        configurable: true
    });
    // @HostListener('contextmenu', ['$event'])
    DataTableHeaderCellComponent.prototype.onContextmenu = function ($event) {
        this.$emit('columnContextmenu', { event: $event, column: this.column });
    };
    DataTableHeaderCellComponent.prototype.calcSortDir = function (sorts) {
        var _this = this;
        this.sortOrder = '';
        if (sorts && this.column) {
            var sortOrder_1 = '';
            var sort = sorts.filter(function (s) { return s.prop; }).find(function (s, index) {
                if (s.prop === _this.column.prop) {
                    sortOrder_1 = (index + 1).toString();
                    return true;
                }
            });
            if (sort) {
                if (this.sortType === types_1.SortType.multi) {
                    this.sortOrder = sortOrder_1;
                }
                return sort.dir;
            }
        }
    };
    DataTableHeaderCellComponent.prototype.onSort = function () {
        if (!this.column.sortable)
            return;
        var newValue = utils_1.nextSortDir(this.sortType, this.sortDir);
        this.$emit('sort', {
            column: this.column,
            prevValue: this.sortDir,
            newValue: newValue
        });
    };
    DataTableHeaderCellComponent.prototype.calcSortCssClass = function (sortDir) {
        if (sortDir === types_1.SortDirection.asc) {
            return "sort-btn sort-asc " + this.sortAscendingIcon;
        }
        else if (sortDir === types_1.SortDirection.desc) {
            return "sort-btn sort-desc " + this.sortDescendingIcon;
        }
        else {
            return "sort-btn";
        }
    };
    DataTableHeaderCellComponent.prototype.calcCssClass = function (sortDir) {
        if (sortDir === types_1.SortDirection.asc || sortDir === types_1.SortDirection.desc) {
            return 'datatable-header-cell-bold';
        }
        else {
            return '';
        }
    };
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableHeaderCellComponent.prototype, "sortType", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableHeaderCellComponent.prototype, "sortAscendingIcon", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableHeaderCellComponent.prototype, "sortDescendingIcon", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableHeaderCellComponent.prototype, "isTarget", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableHeaderCellComponent.prototype, "allRowsSelected", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableHeaderCellComponent.prototype, "selectionType", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableHeaderCellComponent.prototype, "column", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DataTableHeaderCellComponent.prototype, "sorts", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableHeaderCellComponent.prototype, "headerHeight", void 0);
    __decorate([
        vue_property_decorator_1.Watch('allRowsSelected', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableHeaderCellComponent.prototype, "onAllRowsSelectedChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('column', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableHeaderCellComponent.prototype, "onColumnChahged", null);
    __decorate([
        vue_property_decorator_1.Watch('sorts', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableHeaderCellComponent.prototype, "onSortsChanged", null);
    DataTableHeaderCellComponent = __decorate([
        vue_property_decorator_1.Component({
            template: "\n    <div class=\"datatable-header-cell-template-wrap\" :class=\"[columnCssClasses]\" :style=\"styles\" :title=\"name\"\n          v-show=\"column.visible\"\n          @contextmenu=\"onContextmenu($event)\">\n      <slot name=\"target-marker\">\n        <!-- Default content -->\n        <div class=\"targetMarker\" v-if=\"isTarget\">\n          <div class=\"icon datatable-icon-down\"></div>\n          <div class=\"icon datatable-icon-up\"></div>\n        </div>\n      </slot>\n      <label\n        v-if=\"isCheckboxable\"\n        class=\"datatable-checkbox\">\n        <input\n          type=\"checkbox\"\n          v-model=\"myAllRowsSelected\"\n          @change=\"onCheckboxChange\"\n        />\n      </label>\n      <slot v-bind=\"{ column: column }\">\n        <!-- Default content -->\n        <span class=\"datatable-header-cell-wrapper\">\n          <span class=\"datatable-header-cell-label draggable\"\n            :class=\"cssClass\"\n            @click=\"onSort\" v-html=\"name\">\n          </span>\n        </span>\n      </slot>\n      <span :class=\"sortCssClass\" @click=\"onSort\">\n        {{sortOrder}}\n      </span>\n    </div>\n  ",
        })
    ], DataTableHeaderCellComponent);
    return DataTableHeaderCellComponent;
}(vue_property_decorator_1.Vue));
exports.default = DataTableHeaderCellComponent;


/***/ }),

/***/ "./src/components/header/header.component.ts":
/*!***************************************************!*\
  !*** ./src/components/header/header.component.ts ***!
  \***************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var types_1 = __webpack_require__(/*! ../../types */ "./src/types/index.ts");
var utils_1 = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
var header_cell_component_1 = __webpack_require__(/*! ./header-cell.component */ "./src/components/header/header-cell.component.ts");
var resizeable_directive_1 = __webpack_require__(/*! ../../directives/resizeable.directive */ "./src/directives/resizeable.directive.ts");
var long_press_directive_1 = __webpack_require__(/*! ../../directives/long-press.directive */ "./src/directives/long-press.directive.ts");
var draggable_directive_1 = __webpack_require__(/*! ../../directives/draggable.directive */ "./src/directives/draggable.directive.ts");
var DataTableHeaderComponent = /** @class */ (function (_super) {
    __extends(DataTableHeaderComponent, _super);
    function DataTableHeaderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.columnsByPin = null;
        _this.columnGroupWidths = null;
        _this.myHeaderHeight = 'auto';
        _this.styleByGroup = {
            left: {},
            center: {},
            right: {}
        };
        _this.targetMarkerContext = null;
        _this.dragEventTarget = null;
        _this.dragging = false;
        _this.positions = {};
        return _this;
    }
    DataTableHeaderComponent.prototype.onChangedInnerWidth = function () {
        if (this.columns) {
            var colByPin = utils_1.columnsByPin(this.columns);
            this.columnGroupWidths = utils_1.columnGroupWidths(colByPin, this.columns, this.innerWidth);
            this.setStylesByGroup();
        }
    };
    // @HostBinding('style.height')
    DataTableHeaderComponent.prototype.onHeaderHeightChanged = function () {
        if (this.headerHeight !== 'auto') {
            this.myHeaderHeight = this.headerHeight + "px";
        }
        else {
            this.myHeaderHeight = this.headerHeight;
        }
    };
    DataTableHeaderComponent.prototype.onColumnsChanged = function () {
        var colsByPin = utils_1.columnsByPin(this.columns);
        this.columnsByPin = utils_1.columnsByPinArr(this.columns);
        this.columnGroupWidths = utils_1.columnGroupWidths(colsByPin, this.columns, this.innerWidth);
        this.setStylesByGroup();
    };
    DataTableHeaderComponent.prototype.onOffsetXChanged = function () {
        this.setStylesByGroup();
    };
    // @Output() sort: EventEmitter<any> = new EventEmitter();
    // @Output() reorder: EventEmitter<any> = new EventEmitter();
    // @Output() resize: EventEmitter<any> = new EventEmitter();
    // @Output() select: EventEmitter<any> = new EventEmitter();
    // @Output() columnContextmenu = new EventEmitter<{ event: MouseEvent, column: any }>(false);
    DataTableHeaderComponent.prototype.onLongPressStart = function (_a) {
        var event = _a.event, model = _a.model;
        model.dragging = true;
        this.dragEventTarget = event;
    };
    DataTableHeaderComponent.prototype.onLongPressEnd = function (_a) {
        var _this = this;
        var event = _a.event, model = _a.model;
        this.dragEventTarget = event;
        // delay resetting so sort can be
        // prevented if we were dragging
        setTimeout(function () {
            // datatable component creates copies from columns on reorder
            // set dragging to false on new objects
            var column = _this.columns.find(function (c) { return c.$$id === model.$$id; });
            if (column) {
                column.dragging = false;
            }
        }, 5);
    };
    Object.defineProperty(DataTableHeaderComponent.prototype, "headerWidth", {
        // @HostBinding('style.width')
        get: function () {
            if (this.scrollbarH) {
                return this.innerWidth + 'px';
            }
            return '100%';
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderComponent.prototype.isEnableDragX = function (column) {
        return this.reorderable && column.draggable && column.dragging;
    };
    // trackByGroups(colGroup: any): any {    
    //   return colGroup.type;
    // }
    // columnTrackingFn(column: any): any {
    //   return column.$$id;
    // }
    DataTableHeaderComponent.prototype.onColumnResized = function (width, column) {
        if (width <= column.minWidth) {
            width = column.minWidth;
        }
        else if (width >= column.maxWidth) {
            width = column.maxWidth;
        }
        this.$emit('resize', {
            column: column,
            prevValue: column.width,
            newValue: width
        });
    };
    DataTableHeaderComponent.prototype.onHiddenChanged = function ($event) {
        this.$emit('hidden-changed');
        this.onChangedInnerWidth();
    };
    DataTableHeaderComponent.prototype.getColumn = function (index) {
        var leftColumnCount = this.columnsByPin[0].columns.length;
        if (index < leftColumnCount) {
            return this.columnsByPin[0].columns[index];
        }
        var centerColumnCount = this.columnsByPin[1].columns.length;
        if (index < leftColumnCount + centerColumnCount) {
            return this.columnsByPin[1].columns[index - leftColumnCount];
        }
        return this.columnsByPin[2].columns[index - leftColumnCount - centerColumnCount];
    };
    DataTableHeaderComponent.prototype.onSort = function (_a) {
        var column = _a.column, prevValue = _a.prevValue, newValue = _a.newValue;
        // if we are dragging don't sort!
        if (column.dragging)
            return;
        var sorts = this.calcNewSorts(column, prevValue, newValue);
        var event = {
            sorts: sorts,
            column: column,
            prevValue: prevValue,
            newValue: newValue
        };
        this.$emit('sort', event);
    };
    DataTableHeaderComponent.prototype.onSelect = function (event) {
        this.$emit('select', event);
    };
    DataTableHeaderComponent.prototype.calcNewSorts = function (column, prevValue, newValue) {
        var idx = 0;
        if (!this.sorts) {
            this.sorts = [];
        }
        var sorts = this.sorts.map(function (s, i) {
            s = __assign({}, s);
            if (s.prop === column.prop)
                idx = i;
            return s;
        });
        if (newValue === undefined) {
            sorts.splice(idx, 1);
        }
        else if (prevValue) {
            sorts[idx].dir = newValue;
        }
        else {
            if (this.sortType === types_1.SortType.single) {
                sorts.splice(0, this.sorts.length);
            }
            sorts.push({ dir: newValue, prop: column.prop });
        }
        return sorts;
    };
    DataTableHeaderComponent.prototype.setStylesByGroup = function () {
        if (!this.columnsByPin || !this.columnsByPin.length) {
            return;
        }
        var leftColumnCount = this.columnsByPin[0].columns.length;
        if (leftColumnCount) {
            this.styleByGroup['left'] = this.calcStylesByGroup('left');
        }
        var centerColumnCount = this.columnsByPin[1].columns.length;
        if (centerColumnCount) {
            this.styleByGroup['center'] = this.calcStylesByGroup('center');
        }
        var rightColumnCount = this.columnsByPin[2].columns.length;
        if (rightColumnCount) {
            this.styleByGroup['right'] = this.calcStylesByGroup('right');
        }
    };
    DataTableHeaderComponent.prototype.calcStylesByGroup = function (group) {
        var widths = this.columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'center') {
            utils_1.translateXY(styles, offsetX * -1, 0);
        }
        else if (group === 'right') {
            var totalDiff = widths.total - this.innerWidth;
            var offset = totalDiff * -1;
            if (this.scrollbarWidth !== undefined && this.scrollbarWidth !== null) {
                offset -= this.scrollbarWidth;
            }
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    DataTableHeaderComponent.prototype.styleForGroup = function (group) {
        return this.styleByGroup[group.type];
    };
    Object.defineProperty(DataTableHeaderComponent.prototype, "styleObject", {
        get: function () {
            return {
                width: this.headerWidth ? this.headerWidth : this.columnGroupWidths.total + 'px',
                height: this.myHeaderHeight,
            };
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderComponent.prototype.onHeaderCellMounted = function (column, element) {
        if (!this.draggables) {
            this.draggables = [];
        }
        this.draggables.push({ dragModel: column, element: element });
    };
    DataTableHeaderComponent.prototype.onDragStart = function () {
        if (this.dragging) {
            return;
        }
        this.dragging = true;
        this.positions = {};
        var i = 0;
        this.draggables.sort(function (a, b) {
            var left = parseInt(a.element.offsetLeft.toString(), 0);
            var left1 = parseInt(b.element.offsetLeft.toString(), 0);
            return left - left1;
        });
        for (var _i = 0, _a = this.draggables; _i < _a.length; _i++) {
            var dragger = _a[_i];
            var elm = dragger.element;
            var left = parseInt(elm.offsetLeft.toString(), 0);
            var width = elm.offsetWidth;
            if (width) {
                this.positions[dragger.dragModel.prop] = {
                    left: left,
                    right: left + parseInt(width.toString(), 0),
                    index: i++,
                    element: elm
                };
            }
        }
    };
    DataTableHeaderComponent.prototype.onDragging = function (_a) {
        var element = _a.element, model = _a.model, event = _a.event;
        var prevPos = this.positions[model.prop];
        var target = this.isTarget(model, event);
        if (target) {
            if (this.lastDraggingIndex !== target.i) {
                this.onTargetChanged({
                    prevIndex: this.lastDraggingIndex,
                    newIndex: target.i,
                    initialIndex: prevPos.index
                });
                this.lastDraggingIndex = target.i;
            }
        }
        else if (this.lastDraggingIndex !== prevPos.index) {
            this.onTargetChanged({
                prevIndex: this.lastDraggingIndex,
                initialIndex: prevPos.index
            });
            this.lastDraggingIndex = prevPos.index;
        }
    };
    DataTableHeaderComponent.prototype.onDragEnd = function (_a) {
        var element = _a.element, model = _a.model, event = _a.event;
        this.dragging = false;
        var prevPos = this.columns.findIndex(function (col) { return col.prop === model.prop; }); // this.positions[model.prop];
        var target = this.isTarget(model, event);
        this.positions = {};
        if (target) {
            this.onColumnReordered({
                prevIndex: prevPos,
                newIndex: this.columns.findIndex(function (col) { return col.prop === target.prop; }),
                model: model
            });
        }
        this.lastDraggingIndex = undefined;
        element.style.left = 'auto';
    };
    DataTableHeaderComponent.prototype.onColumnReordered = function (_a) {
        var prevIndex = _a.prevIndex, newIndex = _a.newIndex, model = _a.model;
        var column = this.getColumn(newIndex);
        column.isTarget = false;
        column.targetMarkerContext = undefined;
        this.$emit('reorder', {
            column: model,
            prevValue: prevIndex,
            newValue: newIndex
        });
    };
    DataTableHeaderComponent.prototype.onTargetChanged = function (_a) {
        var prevIndex = _a.prevIndex, newIndex = _a.newIndex, initialIndex = _a.initialIndex;
        if (prevIndex || prevIndex === 0) {
            var oldColumn = this.getColumn(prevIndex);
            oldColumn.isTarget = false;
            oldColumn.targetMarkerContext = undefined;
        }
        if (newIndex || newIndex === 0) {
            var newColumn = this.getColumn(newIndex);
            newColumn.isTarget = true;
            if (initialIndex !== newIndex) {
                newColumn.targetMarkerContext = { class: 'targetMarker '.concat(initialIndex > newIndex ? 'dragFromRight' : 'dragFromLeft') };
            }
        }
    };
    DataTableHeaderComponent.prototype.isTarget = function (model, event) {
        var i = 0;
        var x = event.x || event.clientX;
        var y = event.y || event.clientY;
        var targets = document.elementsFromPoint(x, y);
        var _loop_1 = function (prop) {
            // current column position which throws event.
            var pos = this_1.positions[prop];
            // since we drag the inner span, we need to find it in the elements at the cursor
            if (model.prop !== prop && targets.find(function (el) { return el === pos.element; })) {
                return { value: {
                        prop: prop,
                        pos: pos,
                        i: i
                    } };
            }
            i++;
        };
        var this_1 = this;
        for (var prop in this.positions) {
            var state_1 = _loop_1(prop);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableHeaderComponent.prototype, "sortAscendingIcon", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableHeaderComponent.prototype, "sortDescendingIcon", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableHeaderComponent.prototype, "scrollbarWidth", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableHeaderComponent.prototype, "scrollbarH", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableHeaderComponent.prototype, "dealsWithGroup", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableHeaderComponent.prototype, "targetMarkerTemplate", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableHeaderComponent.prototype, "innerWidth", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DataTableHeaderComponent.prototype, "sorts", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableHeaderComponent.prototype, "sortType", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableHeaderComponent.prototype, "allRowsSelected", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", String)
    ], DataTableHeaderComponent.prototype, "selectionType", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableHeaderComponent.prototype, "reorderable", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], DataTableHeaderComponent.prototype, "headerHeight", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Array)
    ], DataTableHeaderComponent.prototype, "columns", void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Number)
    ], DataTableHeaderComponent.prototype, "offsetX", void 0);
    __decorate([
        vue_property_decorator_1.Watch('innerWidth', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableHeaderComponent.prototype, "onChangedInnerWidth", null);
    __decorate([
        vue_property_decorator_1.Watch('headerHeight', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableHeaderComponent.prototype, "onHeaderHeightChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('columns', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableHeaderComponent.prototype, "onColumnsChanged", null);
    __decorate([
        vue_property_decorator_1.Watch('offsetX'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DataTableHeaderComponent.prototype, "onOffsetXChanged", null);
    DataTableHeaderComponent = __decorate([
        vue_property_decorator_1.Component({
            components: {
                'datatable-header-cell': header_cell_component_1.default,
            },
            directives: {
                resizeable: resizeable_directive_1.default,
                'long-press': long_press_directive_1.default,
                dragndrop: draggable_directive_1.default,
            },
            template: "\n    <div :style=\"styleObject\" class=\"datatable-header-inner\">\n      <div v-for=\"colGroup of columnsByPin\" :key=\"colGroup.type\"\n        :class=\"['datatable-row-' + colGroup.type]\"\n        :style=\"styleByGroup[colGroup.type]\">\n        <datatable-header-cell class=\"datatable-header-cell\"\n          v-for=\"column of colGroup.columns\" :key=\"column.$$id\"\n          v-resizeable=\"{ resizeEnabled: column.resizeable }\"\n          v-long-press=\"{pressModel: column, pressEnabled: reorderable && column.draggable}\"\n          v-dragndrop=\"{dragEventTarget:dragEventTarget,dragModel:column,dragX:isEnableDragX(column),dragY:false}\"\n          @resize=\"onColumnResized($event, column)\"\n          @longPressStart=\"onLongPressStart($event, column)\"\n          @longPressEnd=\"onLongPressEnd($event, column)\"\n          :headerHeight=\"headerHeight\"\n          :isTarget=\"column.isTarget\"\n          :targetMarkerTemplate=\"targetMarkerTemplate\"\n          :targetMarkerContext=\"column.targetMarkerContext\"\n          :column=\"column\"\n          :sortType=\"sortType\"\n          :sorts=\"sorts\"\n          :selectionType=\"selectionType\"\n          :sortAscendingIcon=\"sortAscendingIcon\"\n          :sortDescendingIcon=\"sortDescendingIcon\"\n          :allRowsSelected=\"allRowsSelected\"\n          @sort=\"onSort($event)\"\n          @select=\"onSelect\"\n          @columnContextmenu=\"$emit('columnContextmenu', $event)\"\n          @header-cell-mounted=\"onHeaderCellMounted(column, $event)\"\n          @dragStart=\"onDragStart\"\n          @dragEnd=\"onDragEnd\"\n          @dragging=\"onDragging\"\n          @hidden-changed=onHiddenChanged($event)>\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
        })
    ], DataTableHeaderComponent);
    return DataTableHeaderComponent;
}(vue_property_decorator_1.Vue));
exports.default = DataTableHeaderComponent;


/***/ }),

/***/ "./src/directives/draggable.directive.ts":
/*!***********************************************!*\
  !*** ./src/directives/draggable.directive.ts ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var _id = 0;
var DraggableController = /** @class */ (function () {
    function DraggableController(id, vNode, el, dragModel, dragX, dragY) {
        this.id = 0;
        this.vnode = null;
        this.element = null;
        this.handleUp = null;
        this.handleDown = null;
        this.handleMove = null;
        this.dragX = true;
        this.dragY = true;
        this._dragEventTarget = null;
        this.isDragging = false;
        this.id = id;
        this.vnode = vNode;
        this.element = el;
        this.dragModel = dragModel;
        this.dragX = dragX;
        this.dragY = dragY;
        this.handleUp = this.onMouseUp.bind(this);
        this.handleMove = this.onMouseMove.bind(this);
    }
    DraggableController.prototype.unsubscribe = function () {
        document.removeEventListener('mousemove', this.handleMove);
        document.removeEventListener('mouseup', this.handleUp);
    };
    Object.defineProperty(DraggableController.prototype, "dragEventTarget", {
        get: function () {
            return this._dragEventTarget;
        },
        set: function (value) {
            this._dragEventTarget = value;
            if (value) {
                this.onMouseDown(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    DraggableController.prototype.onMouseDown = function (event) {
        // we only want to drag the inner header text
        var isDragElm = event.target.classList.contains('draggable');
        if (isDragElm && (this.dragX || this.dragY)) {
            event.preventDefault();
            this.isDragging = true;
            this.mouseDownPos = { x: event.clientX, y: event.clientY };
            document.addEventListener('mouseup', this.handleUp);
            document.addEventListener('mousemove', this.handleMove);
            this.emit('dragStart', {
                event: event,
                element: this.element,
                model: this.dragModel
            });
        }
    };
    DraggableController.prototype.onMouseUp = function (event) {
        document.removeEventListener('mousemove', this.handleMove);
        if (!this.isDragging)
            return;
        this.isDragging = false;
        this.element.classList.remove('dragging');
        this.unsubscribe();
        this.emit('dragEnd', {
            event: event,
            element: this.element,
            model: this.dragModel
        });
    };
    DraggableController.prototype.onMouseMove = function (event) {
        if (!this.isDragging)
            return;
        var x = event.clientX - this.mouseDownPos.x;
        var y = event.clientY - this.mouseDownPos.y;
        if (this.dragX)
            this.element.style.left = x + "px";
        if (this.dragY)
            this.element.style.top = y + "px";
        this.element.classList.add('dragging');
        this.emit('dragging', {
            event: event,
            element: this.element,
            model: this.dragModel
        });
    };
    DraggableController.prototype.emit = function (name, data) {
        var handlers = (this.vnode.data && this.vnode.data.on) ||
            (this.vnode.componentOptions && this.vnode.componentOptions.listeners);
        if (handlers && handlers[name]) {
            handlers[name].fns(data);
        }
    };
    return DraggableController;
}());
exports.default = vue_property_decorator_1.Vue.directive('draggable', {
    bind: function (el, binding, vnode) {
        var ctrl = new DraggableController(_id++, vnode, el, binding.value.dragModel, binding.value.dragX, binding.value.dragY);
        el.__draggable__ = ctrl;
    },
    update: function (el, binding, vnode) {
        var ctrl = el.__draggable__;
        if (!ctrl) {
            return;
        }
        ctrl.dragX = binding.value.dragX;
        ctrl.dragEventTarget = binding.value.dragEventTarget;
    },
    unbind: function (el) {
        var ctrl = el.__draggable__;
        ctrl.unsubscribe();
    },
});


/***/ }),

/***/ "./src/directives/long-press.directive.ts":
/*!************************************************!*\
  !*** ./src/directives/long-press.directive.ts ***!
  \************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var _id = 0;
var LongPressController = /** @class */ (function () {
    function LongPressController(id, vNode, el) {
        this.id = 0;
        this.pressEnabled = true;
        this.duration = 200;
        this.mouseX = 0;
        this.mouseY = 0;
        this.vnode = null;
        this.element = null;
        this.handleUp = null;
        this.handleDown = null;
        this.handleMove = null;
        this.id = id;
        this.vnode = vNode;
        this.element = el;
        this.handleDown = this.onMouseDown.bind(this);
        this.handleUp = this.onMouseUp.bind(this);
        this.handleMove = this.onMouseMove.bind(this);
        el.addEventListener('mousedown', this.handleDown);
    }
    LongPressController.prototype.unsubscribe = function () {
        document.removeEventListener('mousemove', this.handleMove);
        document.removeEventListener('mouseup', this.handleUp);
    };
    Object.defineProperty(LongPressController.prototype, "pressing", {
        get: function () {
            return this._pressing;
        },
        set: function (value) {
            this._pressing = value;
            value ? this.element.classList.add('press') : this.element.classList.remove('press');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongPressController.prototype, "isLongPressing", {
        get: function () {
            return this._isLongPressing;
        },
        set: function (value) {
            this._isLongPressing = value;
            // console.log('set isLongPressing, id, value', this.id, value);
            value ? this.element.classList.add('longpress') : this.element.classList.remove('longpress');
        },
        enumerable: true,
        configurable: true
    });
    LongPressController.prototype.onMouseDown = function (event) {
        var _this = this;
        // don't do right/middle clicks
        if (event.which !== 1 || !this.pressEnabled)
            return;
        // don't start drag if its on resize handle
        var target = event.target;
        if (target.classList.contains('resize-handle'))
            return;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.pressing = true;
        this.isLongPressing = false;
        document.addEventListener('mouseup', this.handleUp);
        this.timeout = setTimeout(function () {
            _this.isLongPressing = true;
            _this.emit('longPressStart', {
                event: event,
                model: _this.pressModel
            });
            document.addEventListener('mousemove', _this.handleMove);
            _this.loop(event);
        }, this.duration);
        this.loop(event);
    };
    LongPressController.prototype.onMouseUp = function () {
        document.removeEventListener('mousemove', this.handleMove);
        this.endPress();
    };
    LongPressController.prototype.onMouseMove = function (event) {
        if (this.pressing && !this.isLongPressing) {
            var xThres = Math.abs(event.clientX - this.mouseX) > 10;
            var yThres = Math.abs(event.clientY - this.mouseY) > 10;
            // console.log('long-press mouse move, id=', this.id);
            if (xThres || yThres) {
                this.endPress();
            }
        }
    };
    LongPressController.prototype.loop = function (event) {
        var _this = this;
        if (this.isLongPressing) {
            this.timeout = setTimeout(function () {
                _this.emit('longPressing', {
                    event: event,
                    model: _this.pressModel
                });
                _this.loop(event);
            }, 50);
        }
    };
    LongPressController.prototype.endPress = function () {
        clearTimeout(this.timeout);
        if (this.isLongPressing) {
            this.unsubscribe();
            this.isLongPressing = false;
            this.pressing = false;
            this.emit('longPressEnd', {
                model: this.pressModel
            });
        }
    };
    LongPressController.prototype.emit = function (name, data) {
        var handlers = (this.vnode.data && this.vnode.data.on) ||
            (this.vnode.componentOptions && this.vnode.componentOptions.listeners);
        if (handlers && handlers[name]) {
            handlers[name].fns(data);
        }
    };
    return LongPressController;
}());
exports.default = vue_property_decorator_1.Vue.directive('long-press', {
    bind: function (el, binding, vnode) {
        var ctrl = new LongPressController(_id++, vnode, el);
        if (binding.value.pressEnabled !== undefined && binding.value.pressEnabled !== null) {
            ctrl.pressEnabled = binding.value.pressEnabled;
        }
        if (binding.value.duration !== undefined && binding.value.duration !== null) {
            ctrl.duration = binding.value.duration;
        }
        ctrl.pressModel = binding.value.pressModel;
        el.__longpress__ = ctrl;
    },
    unbind: function (el) {
        var ctrl = el.__longpress__;
        ctrl.element.removeEventListener('mousedown', ctrl.handleDown);
        ctrl.unsubscribe();
    },
});
/*
@Directive({ selector: '[long-press]' })
export class LongPressDirective implements OnDestroy {

  @Input() pressEnabled: boolean = true;
  @Input() pressModel: any;
  @Input() duration: number = 500;

  @Output() longPressStart: EventEmitter<any> = new EventEmitter();
  @Output() longPressing: EventEmitter<any> = new EventEmitter();
  @Output() longPressEnd: EventEmitter<any> = new EventEmitter();

  pressing: boolean;
  isLongPressing: boolean;
  timeout: any;
  mouseX: number = 0;
  mouseY: number = 0;

  subscription: Subscription;

  @HostBinding('class.press')
  get press(): boolean { return this.pressing; }

  @HostBinding('class.longpress')
  get isLongPress(): boolean {
    return this.isLongPressing;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    // don't do right/middle clicks
    if (event.which !== 1 || !this.pressEnabled) return;

    // don't start drag if its on resize handle
    const target = (<HTMLElement>event.target);
    if (target.classList.contains('resize-handle')) return;

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.pressing = true;
    this.isLongPressing = false;

    const mouseup = fromEvent(document, 'mouseup');
    this.subscription = mouseup.subscribe((ev: MouseEvent) => this.onMouseup());

    this.timeout = setTimeout(() => {
      this.isLongPressing = true;
      this.longPressStart.emit({
        event,
        model: this.pressModel
      });

      this.subscription.add(
        fromEvent(document, 'mousemove')
          .pipe(takeUntil(mouseup))
          .subscribe((mouseEvent: MouseEvent) => this.onMouseMove(mouseEvent))
      );

      this.loop(event);
    }, this.duration);

    this.loop(event);
  }

  onMouseMove(event: MouseEvent): void {
    if (this.pressing && !this.isLongPressing) {
      const xThres = Math.abs(event.clientX - this.mouseX) > 10;
      const yThres = Math.abs(event.clientY - this.mouseY) > 10;

      if (xThres || yThres) {
        this.endPress();
      }
    }
  }

  loop(event: MouseEvent): void {
    if (this.isLongPressing) {
      this.timeout = setTimeout(() => {
        this.longPressing.emit({
          event,
          model: this.pressModel
        });
        this.loop(event);
      }, 50);
    }
  }

  endPress(): void {
    clearTimeout(this.timeout);
    this.isLongPressing = false;
    this.pressing = false;
    this._destroySubscription();

    this.longPressEnd.emit({
      model: this.pressModel
    });
  }

  onMouseup(): void {
    this.endPress();
  }

  ngOnDestroy(): void {
    this._destroySubscription();
  }

  private _destroySubscription(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

}
*/


/***/ }),

/***/ "./src/directives/resizeable.directive.ts":
/*!************************************************!*\
  !*** ./src/directives/resizeable.directive.ts ***!
  \************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var _id = 0;
var ResizeableDirectiveController = /** @class */ (function () {
    function ResizeableDirectiveController(id, vNode, el) {
        this.resizeEnabled = true;
        this.minWidth = 0;
        this.maxWidth = 0;
        this.resizing = false;
        this.element = null;
        this.handleUp = null;
        this.handleDown = null;
        this.handleMove = null;
        this.vnode = null;
        this.id = 0;
        this.id = id;
        this.vnode = vNode;
        this.element = el;
        this.handleDown = this.onMouseDown.bind(this);
        this.handleUp = this.onMouseUp.bind(this);
    }
    ResizeableDirectiveController.prototype.onMouseUp = function () {
        document.removeEventListener('mousemove', this.handleMove);
        if (this.resizing) {
            this.resizing = false;
            // this.vnode.context.$emit('resize', this.element.clientWidth);
            this.emit(this.vnode, 'resize', this.element.clientWidth);
        }
    };
    ResizeableDirectiveController.prototype.onMouseDown = function (event) {
        var _this = this;
        var isHandle = (event.target).classList.contains('resize-handle');
        var initialWidth = this.element.clientWidth;
        var mouseDownScreenX = event.screenX;
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            this.handleMove = function (e) { return _this.move(e, initialWidth, mouseDownScreenX); };
            document.addEventListener('mousemove', this.handleMove);
        }
    };
    ResizeableDirectiveController.prototype.move = function (event, initialWidth, mouseDownScreenX) {
        if (!this.resizing) {
            return;
        }
        var movementX = event.screenX - mouseDownScreenX;
        var newWidth = initialWidth + movementX;
        var overMinWidth = !this.minWidth || newWidth >= this.minWidth;
        var underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;
        if (overMinWidth && underMaxWidth) {
            this.element.style.width = newWidth + "px";
        }
    };
    ResizeableDirectiveController.prototype.emit = function (vnode, name, data) {
        var handlers = (vnode.data && vnode.data.on) ||
            (vnode.componentOptions && vnode.componentOptions.listeners);
        if (handlers && handlers[name]) {
            handlers[name].fns(data);
        }
    };
    return ResizeableDirectiveController;
}());
exports.default = vue_property_decorator_1.Vue.directive('resizeable', {
    resizing: false,
    bind: function (el, binding, vnode) {
        var ctrl = new ResizeableDirectiveController(_id++, vnode, el);
        if (binding.value.resizeEnabled !== undefined && binding.value.resizeEnabled !== null) {
            ctrl.resizeEnabled = binding.value.resizeEnabled;
        }
        ctrl.minWidth = binding.value.minWidth;
        ctrl.maxWidth = binding.value.maxWidth;
        el.__resizeable__ = ctrl;
        document.addEventListener('mouseup', ctrl.handleUp);
        el.addEventListener('mousedown', ctrl.handleDown);
    },
    unbind: function (el) {
        var ctrl = el.__resizeable__;
        document.removeEventListener('mouseup', ctrl.handleUp);
        el.removeEventListener('mousedown', ctrl.handleDown);
    },
    inserted: function (el) {
        var node = document.createElement('span');
        var ctrl = el.__resizeable__;
        if (ctrl.resizeEnabled) {
            node.classList.add('resize-handle');
        }
        else {
            node.classList.add('resize-handle--not-resizable');
        }
        el.appendChild(node);
    },
});
/*@Directive({
  selector: '[resizeable]',
  host: {
    '[class.resizeable]': 'resizeEnabled'
  }
})
export class ResizeableDirective implements OnDestroy, AfterViewInit {

  @Input() resizeEnabled: boolean = true;
  @Input() minWidth: number;
  @Input() maxWidth: number;

  @Output() resize: EventEmitter<any> = new EventEmitter();

  element: HTMLElement;
  subscription: Subscription;
  resizing: boolean = false;

  constructor(element: ElementRef, private renderer: Renderer2) {
    this.element = element.nativeElement;
  }

  ngAfterViewInit(): void {
    const renderer2 = this.renderer;
    const node = renderer2.createElement('span');
    if (this.resizeEnabled) {
      renderer2.addClass(node, 'resize-handle');
    } else {
      renderer2.addClass(node, 'resize-handle--not-resizable');
    }
    renderer2.appendChild(this.element, node);
  }

  ngOnDestroy(): void {
    this._destroySubscription();
  }

  onMouseup(): void {
    this.resizing = false;

    if (this.subscription && !this.subscription.closed) {
      this._destroySubscription();
      this.resize.emit(this.element.clientWidth);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent): void {
    const isHandle = (<HTMLElement>(event.target)).classList.contains('resize-handle');
    const initialWidth = this.element.clientWidth;
    const mouseDownScreenX = event.screenX;

    if (isHandle) {
      event.stopPropagation();
      this.resizing = true;

      const mouseup = fromEvent(document, 'mouseup');
      this.subscription = mouseup
        .subscribe((ev: MouseEvent) => this.onMouseup());

      const mouseMoveSub = fromEvent(document, 'mousemove')
        .pipe(takeUntil(mouseup))
        .subscribe((e: MouseEvent) => this.move(e, initialWidth, mouseDownScreenX));

      this.subscription.add(mouseMoveSub);
    }
  }

  move(event: MouseEvent, initialWidth: number, mouseDownScreenX: number): void {
    const movementX = event.screenX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;

    const overMinWidth = !this.minWidth || newWidth >= this.minWidth;
    const underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;

    if (overMinWidth && underMaxWidth) {
      this.element.style.width = `${newWidth}px`;
    }
  }

  private _destroySubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

}*/


/***/ }),

/***/ "./src/directives/visibility.directive.ts":
/*!************************************************!*\
  !*** ./src/directives/visibility.directive.ts ***!
  \************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = __webpack_require__(/*! vue-property-decorator */ "vue-property-decorator");
var VisibilityController = /** @class */ (function () {
    function VisibilityController(vNode, el) {
        this._isVisible = false;
        this.vnode = null;
        this.element = null;
        this.vnode = vNode;
        this.element = el;
    }
    Object.defineProperty(VisibilityController.prototype, "isVisible", {
        get: function () {
            return this._isVisible;
        },
        set: function (value) {
            this._isVisible = value;
            value ? this.element.classList.add('visible') : this.element.classList.remove('visible');
        },
        enumerable: true,
        configurable: true
    });
    VisibilityController.prototype.stopCheck = function () {
        clearTimeout(this.timeout);
    };
    VisibilityController.prototype.onVisibilityChange = function (visible) {
        if (this.isVisible !== visible) {
            this.isVisible = visible;
            this.emit('visible', visible);
        }
    };
    VisibilityController.prototype.runCheck = function () {
        var _this = this;
        var check = function () {
            clearTimeout(_this.timeout);
            // https://davidwalsh.name/offsetheight-visibility
            var _a = _this.element, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
            if (offsetHeight && offsetWidth) {
                _this.onVisibilityChange(true);
            }
            else {
                _this.onVisibilityChange(false);
            }
            _this.timeout = setTimeout(check.bind(_this), 100);
        };
        this.timeout = setTimeout(check.bind(this));
    };
    VisibilityController.prototype.emit = function (name, data) {
        var handlers = (this.vnode.data && this.vnode.data.on) ||
            (this.vnode.componentOptions && this.vnode.componentOptions.listeners);
        if (handlers && handlers[name]) {
            handlers[name].fns(data);
        }
    };
    return VisibilityController;
}());
/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 *      v-visibility-observer
 *     >
 * 		</div>
 *
 */
exports.default = vue_property_decorator_1.Vue.directive('visibility-observer', {
    resizing: false,
    bind: function (el, binding, vnode) {
        var ctrl = new VisibilityController(vnode, el);
        el.__visibility__ = ctrl;
        ctrl.runCheck();
    },
    unbind: function (el) {
        var ctrl = el.__visibility__;
        ctrl.stopCheck();
    },
});
/*@Directive({ selector: '[visibilityObserver]' })
export class VisibilityDirective implements OnInit, OnDestroy {

  @HostBinding('class.visible')
  isVisible: boolean = false;

  @Output() visible: EventEmitter<any> = new EventEmitter();

  timeout: any;

  constructor(private element: ElementRef, private zone: NgZone) { }

  ngOnInit(): void {
    this.runCheck();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

  onVisibilityChange(): void {
    // trigger zone recalc for columns
    this.zone.run(() => {
      this.isVisible = true;
      this.visible.emit(true);
    });
  }

  runCheck(): void {
    const check = () => {
      // https://davidwalsh.name/offsetheight-visibility
      const { offsetHeight, offsetWidth } = this.element.nativeElement;

      if (offsetHeight && offsetWidth) {
        clearTimeout(this.timeout);
        this.onVisibilityChange();
      } else {
        clearTimeout(this.timeout);
        this.zone.runOutsideAngular(() => {
          this.timeout = setTimeout(() => check(), 50);
        });
      }
    };

    this.timeout = setTimeout(() => check());
  }

}*/


/***/ }),

/***/ "./src/services/dimensions-helper.service.ts":
/*!***************************************************!*\
  !*** ./src/services/dimensions-helper.service.ts ***!
  \***************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 */
var DimensionsHelper = /** @class */ (function () {
    function DimensionsHelper() {
    }
    DimensionsHelper.prototype.getDimensions = function (element) {
        return element.getBoundingClientRect();
    };
    return DimensionsHelper;
}());
exports.DimensionsHelper = DimensionsHelper;


/***/ }),

/***/ "./src/services/scrollbar-helper.service.ts":
/*!**************************************************!*\
  !*** ./src/services/scrollbar-helper.service.ts ***!
  \**************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 */
var ScrollbarHelper = /** @class */ (function () {
    function ScrollbarHelper() {
        this.document = window.document;
        this.width = this.getWidth();
    }
    ScrollbarHelper.prototype.getWidth = function () {
        var outer = this.document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.msOverflowStyle = 'scrollbar';
        this.document.body.appendChild(outer);
        var widthNoScroll = outer.offsetWidth;
        outer.style.overflow = 'scroll';
        var inner = this.document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);
        var widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    };
    return ScrollbarHelper;
}());
exports.ScrollbarHelper = ScrollbarHelper;


/***/ }),

/***/ "./src/types/check.type.ts":
/*!*********************************!*\
  !*** ./src/types/check.type.ts ***!
  \*********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CheckMode;
(function (CheckMode) {
    CheckMode["checkIsSelect"] = "checkIsSelect";
    CheckMode["checkNoSelect"] = "checkNoSelect";
})(CheckMode = exports.CheckMode || (exports.CheckMode = {}));


/***/ }),

/***/ "./src/types/click.type.ts":
/*!*********************************!*\
  !*** ./src/types/click.type.ts ***!
  \*********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ClickType;
(function (ClickType) {
    ClickType["single"] = "single";
    ClickType["double"] = "double";
})(ClickType = exports.ClickType || (exports.ClickType = {}));


/***/ }),

/***/ "./src/types/column-mode.type.ts":
/*!***************************************!*\
  !*** ./src/types/column-mode.type.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ColumnMode;
(function (ColumnMode) {
    ColumnMode["standard"] = "standard";
    ColumnMode["flex"] = "flex";
    ColumnMode["force"] = "force";
})(ColumnMode = exports.ColumnMode || (exports.ColumnMode = {}));


/***/ }),

/***/ "./src/types/contextmenu.type.ts":
/*!***************************************!*\
  !*** ./src/types/contextmenu.type.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContextmenuType;
(function (ContextmenuType) {
    ContextmenuType["header"] = "header";
    ContextmenuType["body"] = "body";
})(ContextmenuType = exports.ContextmenuType || (exports.ContextmenuType = {}));


/***/ }),

/***/ "./src/types/index.ts":
/*!****************************!*\
  !*** ./src/types/index.ts ***!
  \****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./column-mode.type */ "./src/types/column-mode.type.ts"));
__export(__webpack_require__(/*! ./sort.type */ "./src/types/sort.type.ts"));
__export(__webpack_require__(/*! ./sort-direction.type */ "./src/types/sort-direction.type.ts"));
__export(__webpack_require__(/*! ./selection.type */ "./src/types/selection.type.ts"));
__export(__webpack_require__(/*! ./click.type */ "./src/types/click.type.ts"));
__export(__webpack_require__(/*! ./contextmenu.type */ "./src/types/contextmenu.type.ts"));


/***/ }),

/***/ "./src/types/selection.type.ts":
/*!*************************************!*\
  !*** ./src/types/selection.type.ts ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["singleFocus"] = "singleFocus";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType = exports.SelectionType || (exports.SelectionType = {}));


/***/ }),

/***/ "./src/types/sort-direction.type.ts":
/*!******************************************!*\
  !*** ./src/types/sort-direction.type.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SortDirection;
(function (SortDirection) {
    SortDirection["asc"] = "asc";
    SortDirection["desc"] = "desc";
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));


/***/ }),

/***/ "./src/types/sort.type.ts":
/*!********************************!*\
  !*** ./src/types/sort.type.ts ***!
  \********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SortType;
(function (SortType) {
    SortType["single"] = "single";
    SortType["multi"] = "multi";
})(SortType = exports.SortType || (exports.SortType = {}));


/***/ }),

/***/ "./src/utils/camel-case.ts":
/*!*********************************!*\
  !*** ./src/utils/camel-case.ts ***!
  \*********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts strings from something to camel case
 * http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
 */
function camelCase(str) {
    // Replace special characters with a space
    str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');
    // put a space before an uppercase letter
    str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    // Lower case first character and some other stuff
    str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
    // uppercase characters preceded by a space or number
    str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function (a, b, c) {
        return b.trim() + c.toUpperCase();
    });
    return str;
}
exports.camelCase = camelCase;
/**
 * Converts strings from camel case to words
 * http://stackoverflow.com/questions/7225407/convert-camelcasetext-to-camel-case-text
 */
function deCamelCase(str) {
    return str
        .replace(/([A-Z])/g, function (match) { return " " + match; })
        .replace(/^./, function (match) { return match.toUpperCase(); });
}
exports.deCamelCase = deCamelCase;


/***/ }),

/***/ "./src/utils/column-helper.ts":
/*!************************************!*\
  !*** ./src/utils/column-helper.ts ***!
  \************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// import { DataTableColumnDirective } from '../components/columns';
var camel_case_1 = __webpack_require__(/*! ./camel-case */ "./src/utils/camel-case.ts");
var id_1 = __webpack_require__(/*! ./id */ "./src/utils/id.ts");
var column_prop_getters_1 = __webpack_require__(/*! ./column-prop-getters */ "./src/utils/column-prop-getters.ts");
/**
 * Sets the column defaults
 */
function setColumnsDefaults(columns, vm) {
    if (!columns)
        return;
    // Only one column should hold the tree view
    // Thus if multiple columns are provided with
    // isTreeColumn as true we take only the first one
    var treeColumnFound = false;
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var column = columns_1[_i];
        setColumnDefaults(column, vm);
        if (!column.hasOwnProperty('isTreeColumn')) {
            vm.$set(column, 'isTreeColumn', false);
        }
        else {
            if (column.isTreeColumn && !treeColumnFound) {
                // If the first column with isTreeColumn is true found
                // we mark that treeCoulmn is found
                vm.$set(column, 'isTreeColumn', true);
                treeColumnFound = true;
            }
            else {
                // After that isTreeColumn property for any other column
                // will be set as false
                vm.$set(column, 'isTreeColumn', false);
            }
        }
    }
}
exports.setColumnsDefaults = setColumnsDefaults;
function setColumnDefaults(column, vm) {
    if (!column)
        return;
    if (!column.$$id) {
        column.$$id = id_1.id();
    }
    // prop can be numeric; zero is valid not a missing prop
    // translate name => prop
    if (isNullOrUndefined(column.prop) && column.name) {
        column.prop = camel_case_1.camelCase(column.name);
    }
    if (!column.$$valueGetter) {
        vm.$set(column, '$$valueGetter', column_prop_getters_1.getterForProp(column.prop));
    }
    // format props if no name passed
    if (!isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
        column.name = camel_case_1.deCamelCase(String(column.prop));
    }
    if (isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
        column.name = ''; // Fixes IE and Edge displaying `null`
    }
    if (!column.hasOwnProperty('resizeable')) {
        vm.$set(column, 'resizeable', true);
    }
    if (!column.hasOwnProperty('sortable')) {
        vm.$set(column, 'sortable', true);
    }
    if (!column.hasOwnProperty('draggable')) {
        vm.$set(column, 'draggable', true);
    }
    if (!column.hasOwnProperty('visible')) {
        vm.$set(column, 'visible', true);
    }
    if (!column.hasOwnProperty('canAutoResize') || isNullOrUndefined(column.canAutoResize)) {
        column.canAutoResize = true;
    }
    if (!column.hasOwnProperty('width') || !column.width) {
        vm.$set(column, 'width', 150);
    }
    else {
        vm.$set(column, 'width', column.width);
    }
    vm.$set(column, 'isTreeColumn', column.isTreeColumn);
    vm.$set(column, 'isTarget', isNullOrUndefined(column.isTarget) ? false : column.isTarget);
}
exports.setColumnDefaults = setColumnDefaults;
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
exports.isNullOrUndefined = isNullOrUndefined;
/**
 * Translates templates definitions to objects
 */
// export function translateTemplates(templates: DataTableColumnDirective[]): any[] {
//   const result: any[] = [];
//   for(const temp of templates) {
//     const col: any = {};
//     const props = Object.getOwnPropertyNames(temp);
//     for(const prop of props) {
//       col[prop] = temp[prop];
//     }
//     if(temp.headerTemplate) {
//       col.headerTemplate = temp.headerTemplate;
//     }
//     if(temp.cellTemplate) {
//       col.cellTemplate = temp.cellTemplate;
//     }
//     if(temp.summaryFunc) {
//       col.summaryFunc = temp.summaryFunc;
//     }
//     if(temp.summaryTemplate) {
//       col.summaryTemplate = temp.summaryTemplate;
//     }
//     result.push(col);
//   }
//   return result;
// }


/***/ }),

/***/ "./src/utils/column-prop-getters.ts":
/*!******************************************!*\
  !*** ./src/utils/column-prop-getters.ts ***!
  \******************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// maybe rename this file to prop-getters.ts
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Always returns the empty string ''
 * @returns {string}
 */
function emptyStringGetter() {
    return '';
}
exports.emptyStringGetter = emptyStringGetter;
/**
 * Returns the appropriate getter function for this kind of prop.
 * If prop == null, returns the emptyStringGetter.
 */
function getterForProp(prop) {
    if (prop == null)
        return emptyStringGetter;
    if (typeof prop === 'number') {
        return numericIndexGetter;
    }
    else {
        // deep or simple
        if (prop.indexOf('.') !== -1) {
            return deepValueGetter;
        }
        else {
            return shallowValueGetter;
        }
    }
}
exports.getterForProp = getterForProp;
/**
 * Returns the value at this numeric index.
 * @param row array of values
 * @param index numeric index
 * @returns {any} or '' if invalid index
 */
function numericIndexGetter(row, index) {
    if (row == null)
        return '';
    // mimic behavior of deepValueGetter
    if (!row || index == null)
        return row;
    var value = row[index];
    if (value == null)
        return '';
    return value;
}
exports.numericIndexGetter = numericIndexGetter;
/**
 * Returns the value of a field.
 * (more efficient than deepValueGetter)
 * @param obj object containing the field
 * @param fieldName field name string
 * @returns {any}
 */
function shallowValueGetter(obj, fieldName) {
    if (obj == null)
        return '';
    if (!obj || !fieldName)
        return obj;
    var value = obj[fieldName];
    if (value == null)
        return '';
    return value;
}
exports.shallowValueGetter = shallowValueGetter;
/**
 * Returns a deep object given a string. zoo['animal.type']
 * @param {object} obj
 * @param {string} path
 */
function deepValueGetter(obj, path) {
    if (obj == null)
        return '';
    if (!obj || !path)
        return obj;
    // check if path matches a root-level field
    // { "a.b.c": 123 }
    var current = obj[path];
    if (current !== undefined)
        return current;
    current = obj;
    var split = path.split('.');
    if (split.length) {
        for (var i = 0; i < split.length; i++) {
            current = current[split[i]];
            // if found undefined, return empty string
            if (current === undefined || current === null)
                return '';
        }
    }
    return current;
}
exports.deepValueGetter = deepValueGetter;


/***/ }),

/***/ "./src/utils/column.ts":
/*!*****************************!*\
  !*** ./src/utils/column.ts ***!
  \*****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function columnsByPin(cols) {
    var ret = {
        left: [],
        center: [],
        right: []
    };
    if (cols) {
        for (var _i = 0, cols_1 = cols; _i < cols_1.length; _i++) {
            var col = cols_1[_i];
            if (col.frozenLeft) {
                ret.left.push(col);
            }
            else if (col.frozenRight) {
                ret.right.push(col);
            }
            else {
                ret.center.push(col);
            }
        }
    }
    return ret;
}
exports.columnsByPin = columnsByPin;
/**
 * Returns the widths of all group sets of a column
 */
function columnGroupWidths(groups, all, tableWidth) {
    var result = {
        left: columnTotalWidth(groups.left),
        center: columnTotalWidth(groups.center),
        right: columnTotalWidth(groups.right),
        total: Math.floor(columnTotalWidth(all))
    };
    if (tableWidth > result.total) {
        result.center += tableWidth - result.total;
        result.total = tableWidth;
    }
    return result;
}
exports.columnGroupWidths = columnGroupWidths;
/**
 * Calculates the total width of all columns and their groups
 */
function columnTotalWidth(columns, prop) {
    var totalWidth = 0;
    if (columns) {
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var c = columns_1[_i];
            if (c.hidden) {
                continue;
            }
            var has = prop && c[prop];
            var width = c.hidden ? 0 : has ? c[prop] : c.width;
            totalWidth = totalWidth + parseFloat(width);
        }
    }
    return totalWidth;
}
exports.columnTotalWidth = columnTotalWidth;
/**
 * Calculates the total width of all columns and their groups
 */
function columnsTotalWidth(columns, prop) {
    var totalWidth = 0;
    for (var _i = 0, columns_2 = columns; _i < columns_2.length; _i++) {
        var column = columns_2[_i];
        var has = prop && column[prop];
        totalWidth = totalWidth + (has ? column[prop] : column.width);
    }
    return totalWidth;
}
exports.columnsTotalWidth = columnsTotalWidth;
function columnsByPinArr(val) {
    var colsByPinArr = [];
    var colsByPin = columnsByPin(val);
    colsByPinArr.push({ type: 'left', columns: colsByPin['left'] });
    colsByPinArr.push({ type: 'center', columns: colsByPin['center'] });
    colsByPinArr.push({ type: 'right', columns: colsByPin['right'] });
    return colsByPinArr;
}
exports.columnsByPinArr = columnsByPinArr;


/***/ }),

/***/ "./src/utils/elm-from-point.ts":
/*!*************************************!*\
  !*** ./src/utils/elm-from-point.ts ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
if (typeof document !== 'undefined' && !document.elementsFromPoint) {
    document.elementsFromPoint = elementsFromPoint;
}
/*tslint:disable*/
/**
 * Polyfill for `elementsFromPoint`
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/elementsFromPoint
 * https://gist.github.com/iddan/54d5d9e58311b0495a91bf06de661380
 * https://gist.github.com/oslego/7265412
 */
function elementsFromPoint(x, y) {
    var elements = [];
    var previousPointerEvents = [];
    var current; // TODO: window.getComputedStyle should be used with inferred type (Element)
    var i;
    var d;
    //if (document === undefined) return elements;
    // get all elements via elementFromPoint, and remove them from hit-testing in order
    while ((current = document.elementFromPoint(x, y)) && elements.indexOf(current) === -1 && current != null) {
        // push the element and its current style
        elements.push(current);
        previousPointerEvents.push({
            value: current.style.getPropertyValue('pointer-events'),
            priority: current.style.getPropertyPriority('pointer-events')
        });
        // add "pointer-events: none", to get to the underlying element
        current.style.setProperty('pointer-events', 'none', 'important');
    }
    // restore the previous pointer-events values
    for (i = previousPointerEvents.length; d = previousPointerEvents[--i];) {
        elements[i].style.setProperty('pointer-events', d.value ? d.value : '', d.priority);
    }
    // return our results
    return elements;
}
exports.elementsFromPoint = elementsFromPoint;
/*tslint:enable*/


/***/ }),

/***/ "./src/utils/equal.array.ts":
/*!**********************************!*\
  !*** ./src/utils/equal.array.ts ***!
  \**********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isArrayEqual(array1, array2) {
    // if the other array is a falsy value, return
    if (!array1 || !array2 || !Array.isArray(array1) || !Array.isArray(array2))
        return false;
    // compare lengths - can save a lot of time 
    if (array1.length !== array2.length)
        return false;
    for (var i = 0, l = array1.length; i < l; i++) {
        // Check if we have nested arrays
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            // recurse into the nested arrays
            if (!isArrayEqual(array1[i], array2[i]))
                return false;
        }
        else if (array1[i] !== array2[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
exports.isArrayEqual = isArrayEqual;


/***/ }),

/***/ "./src/utils/id.ts":
/*!*************************!*\
  !*** ./src/utils/id.ts ***!
  \*************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a unique object id.
 * http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 */
function id() {
    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
}
exports.id = id;


/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./id */ "./src/utils/id.ts"));
__export(__webpack_require__(/*! ./column */ "./src/utils/column.ts"));
__export(__webpack_require__(/*! ./column-prop-getters */ "./src/utils/column-prop-getters.ts"));
__export(__webpack_require__(/*! ./camel-case */ "./src/utils/camel-case.ts"));
__export(__webpack_require__(/*! ./keys */ "./src/utils/keys.ts"));
__export(__webpack_require__(/*! ./math */ "./src/utils/math.ts"));
__export(__webpack_require__(/*! ./prefixes */ "./src/utils/prefixes.ts"));
__export(__webpack_require__(/*! ./selection */ "./src/utils/selection.ts"));
__export(__webpack_require__(/*! ./translate */ "./src/utils/translate.ts"));
__export(__webpack_require__(/*! ./throttle */ "./src/utils/throttle.ts"));
__export(__webpack_require__(/*! ./sort */ "./src/utils/sort.ts"));
__export(__webpack_require__(/*! ./row-height-cache */ "./src/utils/row-height-cache.ts"));
__export(__webpack_require__(/*! ./column-helper */ "./src/utils/column-helper.ts"));
__export(__webpack_require__(/*! ./elm-from-point */ "./src/utils/elm-from-point.ts"));
__export(__webpack_require__(/*! ./tree */ "./src/utils/tree.ts"));


/***/ }),

/***/ "./src/utils/keys.ts":
/*!***************************!*\
  !*** ./src/utils/keys.ts ***!
  \***************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Keys;
(function (Keys) {
    Keys[Keys["up"] = 38] = "up";
    Keys[Keys["down"] = 40] = "down";
    Keys[Keys["return"] = 13] = "return";
    Keys[Keys["escape"] = 27] = "escape";
    Keys[Keys["left"] = 37] = "left";
    Keys[Keys["right"] = 39] = "right";
    Keys[Keys["pageUp"] = 33] = "pageUp";
    Keys[Keys["pageDown"] = 34] = "pageDown";
})(Keys = exports.Keys || (exports.Keys = {}));


/***/ }),

/***/ "./src/utils/math.ts":
/*!***************************!*\
  !*** ./src/utils/math.ts ***!
  \***************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var column_1 = __webpack_require__(/*! ./column */ "./src/utils/column.ts");
/**
 * Calculates the Total Flex Grow
 */
function getTotalFlexGrow(columns) {
    var totalFlexGrow = 0;
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var c = columns_1[_i];
        totalFlexGrow += c.flexGrow || 0;
    }
    return totalFlexGrow;
}
/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 */
function adjustColumnWidths(allColumns, expectedWidth) {
    if (allColumns === void 0) { allColumns = []; }
    // if (allColumns && allColumns.length) {
    //   allColumns = allColumns.filter(c => c.visible && !c.hidden);
    // }
    var hiddenColumns = [];
    allColumns.forEach(function (col) {
        col.hidden = false;
        var width = calcRealWidth(col);
        if (width !== null && width < 10) {
            hiddenColumns.push(col);
            col.hidden = true;
            if (!col.$$oldWidth) {
                col.$$oldWidth = col.width;
            }
            col.width = 0;
        }
    });
    allColumns = allColumns.filter(function (c) { return c.visible && !c.hidden; });
    var columnsWidth = column_1.columnsTotalWidth(allColumns);
    var totalFlexGrow = getTotalFlexGrow(allColumns);
    var colsByGroup = column_1.columnsByPin(allColumns);
    if (columnsWidth !== expectedWidth) {
        scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
    }
}
exports.adjustColumnWidths = adjustColumnWidths;
/**
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 */
function scaleColumns(colsByGroup, maxWidth, totalFlexGrow) {
    // calculate total width and flexgrow points for coulumns that can be resized
    for (var attr in colsByGroup) {
        for (var _i = 0, _a = colsByGroup[attr]; _i < _a.length; _i++) {
            var column = _a[_i];
            if (!column.canAutoResize) {
                maxWidth -= column.width;
                totalFlexGrow -= column.flexGrow ? column.flexGrow : 0;
            }
            else {
                column.width = 0;
            }
        }
    }
    var hasMinWidth = {};
    var remainingWidth = maxWidth;
    // resize columns until no width is left to be distributed
    do {
        var widthPerFlexPoint = remainingWidth / totalFlexGrow;
        remainingWidth = 0;
        for (var attr in colsByGroup) {
            for (var _b = 0, _c = colsByGroup[attr]; _b < _c.length; _b++) {
                var column = _c[_b];
                // if the column can be resize and it hasn't reached its minimum width yet
                if (column.canAutoResize && !hasMinWidth[column.prop]) {
                    var newWidth = column.width + column.flexGrow * widthPerFlexPoint;
                    if (column.minWidth !== undefined && newWidth < column.minWidth) {
                        remainingWidth += newWidth - column.minWidth;
                        column.width = column.minWidth;
                        hasMinWidth[column.prop] = true;
                    }
                    else {
                        column.width = newWidth;
                    }
                }
            }
        }
    } while (remainingWidth !== 0);
}
function calcRealWidth(column) {
    if (!column.element) {
        return null;
    }
    var w = column.element.offsetWidth;
    if (!w || w < 0) {
        return w;
    }
    w = 0;
    for (var i = 0; i < column.element.children.length; i++) {
        var el = column.element.children[i];
        w = Math.max(w, el.offsetWidth);
    }
    return w;
}
/**
 * Forces the width of the columns to
 * distribute equally but overflowing when necessary
 *
 * Rules:
 *
 *  - If combined withs are less than the total width of the grid,
 *    proportion the widths given the min / max / normal widths to fill the width.
 *
 *  - If the combined widths, exceed the total width of the grid,
 *    use the standard widths.
 *
 *  - If a column is resized, it should always use that width
 *
 *  - The proportional widths should never fall below min size if specified.
 *
 *  - If the grid starts off small but then becomes greater than the size ( + / - )
 *    the width should use the original width; not the newly proportioned widths.
 */
function forceFillColumnWidths(allColumns, expectedWidth, startIdx, allowBleed, defaultColWidth) {
    if (defaultColWidth === void 0) { defaultColWidth = 300; }
    // const hiddenColumns = allColumns.filter(c => c.hidden);
    // for (const column of hiddenColumns) {
    //   if(!column.$$oldWidth) {
    //     column.$$oldWidth = column.width;
    //   }
    //   column.width = 0;
    // }
    var hiddenColumns = [];
    allColumns.forEach(function (col) {
        col.hidden = false;
        var width = calcRealWidth(col);
        if (width !== null && width < 10) {
            hiddenColumns.push(col);
            col.hidden = true;
            if (!col.$$oldWidth) {
                col.$$oldWidth = col.width;
            }
            col.width = 0;
        }
    });
    allColumns = allColumns.filter(function (c) { return c.visible && !c.hidden; });
    var columnsToResize = allColumns
        .slice(startIdx + 1, allColumns.length)
        .filter(function (c) {
        return c.canAutoResize !== false;
    });
    var averageColumnWidth = expectedWidth / columnsToResize.length;
    for (var _i = 0, columnsToResize_1 = columnsToResize; _i < columnsToResize_1.length; _i++) {
        var column = columnsToResize_1[_i];
        if (!column.$$oldWidth) {
            column.$$oldWidth = column.width;
        }
        column.width = averageColumnWidth;
    }
    var additionWidthPerColumn = 0;
    var exceedsWindow = false;
    var contentWidth = getContentWidth(allColumns, defaultColWidth);
    var remainingWidth = expectedWidth - contentWidth;
    var columnsProcessed = [];
    // This loop takes care of the
    do {
        additionWidthPerColumn = remainingWidth / columnsToResize.length;
        exceedsWindow = contentWidth >= expectedWidth;
        for (var _a = 0, columnsToResize_2 = columnsToResize; _a < columnsToResize_2.length; _a++) {
            var column = columnsToResize_2[_a];
            if (exceedsWindow && allowBleed) {
                column.width = column.$$oldWidth || column.width || defaultColWidth;
            }
            else {
                var newSize = (column.width || defaultColWidth) + additionWidthPerColumn;
                if (column.minWidth && newSize < column.minWidth) {
                    column.width = column.minWidth;
                    columnsProcessed.push(column);
                }
                else if (column.maxWidth && newSize > column.maxWidth) {
                    column.width = column.maxWidth;
                    columnsProcessed.push(column);
                }
                else {
                    column.width = newSize;
                }
            }
            column.width = Math.max(0, column.width);
        }
        contentWidth = getContentWidth(allColumns);
        remainingWidth = expectedWidth - contentWidth;
        removeProcessedColumns(columnsToResize, columnsProcessed);
    } while (remainingWidth > 0 && columnsToResize.length !== 0);
}
exports.forceFillColumnWidths = forceFillColumnWidths;
/**
 * Remove the processed columns from the current active columns.
 */
function removeProcessedColumns(columnsToResize, columnsProcessed) {
    for (var _i = 0, columnsProcessed_1 = columnsProcessed; _i < columnsProcessed_1.length; _i++) {
        var column = columnsProcessed_1[_i];
        var index = columnsToResize.indexOf(column);
        columnsToResize.splice(index, 1);
    }
}
/**
 * Gets the width of the columns
 */
function getContentWidth(allColumns, defaultColWidth) {
    if (defaultColWidth === void 0) { defaultColWidth = 300; }
    var contentWidth = 0;
    for (var _i = 0, allColumns_1 = allColumns; _i < allColumns_1.length; _i++) {
        var column = allColumns_1[_i];
        contentWidth += (column.width || defaultColWidth);
    }
    return contentWidth;
}


/***/ }),

/***/ "./src/utils/prefixes.ts":
/*!*******************************!*\
  !*** ./src/utils/prefixes.ts ***!
  \*******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var camel_case_1 = __webpack_require__(/*! ./camel-case */ "./src/utils/camel-case.ts");
var cache = {};
var testStyle = typeof document !== 'undefined' ? document.createElement('div').style : undefined;
// Get Prefix
// http://davidwalsh.name/vendor-prefix
var prefix = function () {
    var styles = typeof window !== 'undefined' ? window.getComputedStyle(document.documentElement, '') : undefined;
    var match = typeof styles !== 'undefined' ?
        Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) : null;
    var pre = match !== null ? match[1] : undefined;
    var dom = typeof pre !== 'undefined' ? ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1] : undefined;
    return dom ? {
        dom: dom,
        lowercase: pre,
        css: "-" + pre + "-",
        js: pre[0].toUpperCase() + pre.substr(1)
    } : undefined;
}();
function getVendorPrefixedName(property) {
    var name = camel_case_1.camelCase(property);
    if (!cache[name]) {
        if (prefix !== undefined && testStyle[prefix.css + property] !== undefined) {
            cache[name] = prefix.css + property;
        }
        else if (testStyle[property] !== undefined) {
            cache[name] = property;
        }
    }
    return cache[name];
}
exports.getVendorPrefixedName = getVendorPrefixedName;


/***/ }),

/***/ "./src/utils/row-height-cache.ts":
/*!***************************************!*\
  !*** ./src/utils/row-height-cache.ts ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This object contains the cache of the various row heights that are present inside
 * the data table.   Its based on Fenwick tree data structure that helps with
 * querying sums that have time complexity of log n.
 *
 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
 * https://github.com/mikolalysenko/fenwick-tree
 *
 */
var RowHeightCache = /** @class */ (function () {
    function RowHeightCache() {
        /**
         * Tree Array stores the cumulative information of the row heights to perform efficient
         * range queries and updates.  Currently the tree is initialized to the base row
         * height instead of the detail row height.
         */
        // private treeArray: number[] = [];
        this.heights = [];
        // private calcRowIndex(sum: number): number {
        //   if(!this.treeArray.length) return 0;
        //   let pos = -1;
        //   const dataLength = this.treeArray.length;
        //   // Get the highest bit for the block size.
        //   const highestBit = Math.pow(2, dataLength.toString(2).length - 1);
        //   for (let blockSize = highestBit; blockSize !== 0; blockSize >>= 1) {
        //     const nextPos = pos + blockSize;
        //     if (nextPos < dataLength && sum >= this.treeArray[nextPos]) {
        //       sum -= this.treeArray[nextPos];
        //       pos = nextPos;
        //     }
        //   }
        //   return pos + 1;
        // }
        // private initHeights(details: any) {
        //   const { rows, rowHeight, rowDetailHeight, externalVirtual, rowCount, rowIndexes, rowExpansions } = details;
        //   const isFn = typeof rowHeight === 'function';
        //   const isDetailFn = typeof rowDetailHeight === 'function';
        //   if (!isFn && isNaN(rowHeight)) {
        //     throw new Error(`Row Height cache initialization failed. Please ensure that 'rowHeight' is a
        //       valid number or function value: (${rowHeight}) when 'scrollbarV' is enabled.`);
        //   }
        //   // Add this additional guard in case rowDetailHeight is set to 'auto' as it wont work.
        //   if (!isDetailFn && isNaN(rowDetailHeight)) {
        //     throw new Error(`Row Height cache initialization failed. Please ensure that 'rowDetailHeight' is a
        //       valid number or function value: (${rowDetailHeight}) when 'scrollbarV' is enabled.`);
        //   }
        //   const n = externalVirtual ? rowCount : rows.length;
        //   const heights = new Array(n);
        //   let accumulator = 0;
        //   for (let i = 0; i < n; ++i) {
        //     const row = rows[i];
        //     let currentRowHeight = rowHeight;
        //     if(isFn) {
        //       currentRowHeight = rowHeight(row);
        //     }
        //     // Add the detail row height to the already expanded rows.
        //     // This is useful for the table that goes through a filter or sort.
        //     const expanded = rowExpansions.get(row);
        //     if(row && expanded === 1) {
        //       if(isDetailFn) {
        //         const index = rowIndexes.get(row);
        //         currentRowHeight += rowDetailHeight(row, index);
        //       } else {
        //         currentRowHeight += rowDetailHeight;
        //       }
        //     }
        //     accumulator += currentRowHeight;
        //     heights[i] = { accumulator, height: currentRowHeight };
        //   }
        //   return heights;
        // }
    }
    /**
     * Clear the Tree array.
     */
    RowHeightCache.prototype.clearCache = function () {
        // this.treeArray = [];
        this.heights = [];
    };
    /**
     * Initialize the Fenwick tree with row Heights.
     *
     * @param rows The array of rows which contain the expanded status.
     * @param rowHeight The row height.
     * @param rowDetailHeight The detail row height.
     */
    RowHeightCache.prototype.initCache = function (details) {
        var rows = details.rows, rowHeight = details.rowHeight, rowDetailHeight = details.rowDetailHeight, groupRowHeight = details.groupRowHeight, externalVirtual = details.externalVirtual, rowCount = details.rowCount, rowIndexes = details.rowIndexes, rowExpansions = details.rowExpansions;
        var isFn = typeof rowHeight === 'function';
        var isDetailFn = typeof rowDetailHeight === 'function';
        var isGroupFn = typeof groupRowHeight === 'function';
        if (!isFn && isNaN(rowHeight)) {
            throw new Error("Row Height cache initialization failed. Please ensure that 'rowHeight' is a\n        valid number or function value: (" + rowHeight + ") when 'scrollbarV' is enabled.");
        }
        // Add this additional guard in case rowDetailHeight is set to 'auto' as it wont work.
        if (!isDetailFn && isNaN(rowDetailHeight)) {
            throw new Error("Row Height cache initialization failed. Please ensure that 'rowDetailHeight' is a\n        valid number or function value: (" + rowDetailHeight + ") when 'scrollbarV' is enabled.");
        }
        var n = externalVirtual ? rowCount : rows.length;
        // this.treeArray = new Array(n);
        this.heights = new Array(n);
        for (var i = 0; i < n; ++i) {
            // this.treeArray[i] = 0;
            this.heights[i] = null;
        }
        var accumulator = 0;
        for (var i = 0; i < n; ++i) {
            var row = rows[i];
            var currentRowHeight = void 0;
            if (row && row.__isGroup) {
                currentRowHeight = groupRowHeight;
                if (isGroupFn) {
                    currentRowHeight = groupRowHeight(row);
                }
            }
            else {
                currentRowHeight = rowHeight;
                if (isFn) {
                    currentRowHeight = rowHeight(row);
                }
            }
            // Add the detail row height to the already expanded rows.
            // This is useful for the table that goes through a filter or sort.
            var expanded = rowExpansions.get(row);
            if (row && expanded === 1) {
                if (isDetailFn) {
                    var index = rowIndexes.get(row);
                    currentRowHeight += rowDetailHeight(row, index);
                }
                else {
                    currentRowHeight += rowDetailHeight;
                }
            }
            // this.updateTree(i, currentRowHeight);
            accumulator += currentRowHeight;
            this.heights[i] = { accumulator: accumulator, height: currentRowHeight };
        }
        // this.heights = this.initHeights(details);
    };
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.  Below handles edge cases.
     */
    RowHeightCache.prototype.getRowIndex = function (scrollY, first) {
        if (first === void 0) { first = false; }
        if (scrollY === 0)
            return 0;
        var result = this.calcRowIndex(scrollY);
        if (!first) {
            result++;
        }
        return result;
    };
    /**
     * When a row is expanded or rowHeight is changed, update the height.  This can
     * be utilized in future when Angular Data table supports dynamic row heights.
     */
    RowHeightCache.prototype.update = function (atRowIndex, byRowHeight) {
        if (!this.heights || !this.heights.length) {
            return;
            // throw new Error(`Update at index ${atRowIndex} with value ${byRowHeight} failed:
            //   Row Height cache not initialized.`);
        }
        var n = this.heights.length;
        while (atRowIndex < n) {
            this.heights[atRowIndex].accumulator += byRowHeight;
            atRowIndex++;
        }
    };
    // update(atRowIndex: number, byRowHeight: number): void {
    //   if (!this.treeArray.length) {
    //     throw new Error(`Update at index ${atRowIndex} with value ${byRowHeight} failed:
    //       Row Height cache not initialized.`);
    //   }
    //   const n = this.treeArray.length;
    //   atRowIndex |= 0;
    //   while(atRowIndex < n) {
    //     this.treeArray[atRowIndex] += byRowHeight;
    //     atRowIndex |= (atRowIndex + 1);
    //   }
    // }
    /**
     * Range Sum query from 1 to the rowIndex
     */
    RowHeightCache.prototype.query = function (atIndex) {
        var _a;
        if (atIndex < 0) {
            return 0;
        }
        return (_a = this.heights[atIndex]) === null || _a === void 0 ? void 0 : _a.accumulator;
    };
    RowHeightCache.prototype.queryWithHeight = function (atIndex) {
        if (atIndex < 0) {
            return null;
        }
        var result = this.heights[atIndex];
        if (!result) {
            return null;
        }
        return { offsetY: result.accumulator, height: result.height };
    };
    // query(atIndex: number): number {
    //   if (!this.treeArray.length) {
    //     throw new Error(`query at index ${atIndex} failed: Fenwick tree array not initialized.`);
    //   }
    //   let sum = 0;
    //   atIndex |= 0;
    //   while(atIndex >= 0) {
    //     sum += this.treeArray[atIndex];
    //     atIndex = (atIndex & (atIndex + 1)) - 1;
    //   }
    //   return sum;
    // }
    /**
     * Find the total height between 2 row indexes
     */
    RowHeightCache.prototype.queryBetween = function (atIndexA, atIndexB) {
        return this.query(atIndexB) - this.query(atIndexA - 1);
    };
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.
     */
    RowHeightCache.prototype.calcRowIndex = function (sum) {
        if (!this.heights.length)
            return 0;
        if (this.heights[this.heights.length - 1].accumulator < sum) {
            return this.heights.length;
        }
        var pos = -1;
        var dataLength = this.heights.length;
        for (var i = 0; i < dataLength; i++) {
            if (this.heights[i].accumulator >= sum) {
                pos = i;
                break;
            }
        }
        return pos;
    };
    return RowHeightCache;
}());
exports.RowHeightCache = RowHeightCache;


/***/ }),

/***/ "./src/utils/selection.ts":
/*!********************************!*\
  !*** ./src/utils/selection.ts ***!
  \********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function selectRows(selected, row, comparefn) {
    var selectedIndex = comparefn(row, selected);
    if (selectedIndex > -1) {
        selected.splice(selectedIndex, 1);
    }
    else {
        selected.push(row);
    }
    return selected;
}
exports.selectRows = selectRows;
function selectRowsBetween(selected, rows, index, prevIndex, comparefn) {
    var reverse = index < prevIndex;
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var greater = i >= prevIndex && i <= index;
        var lesser = i <= prevIndex && i >= index;
        var range = { start: 0, end: 0 };
        if (reverse) {
            range = {
                start: index,
                end: prevIndex
            };
        }
        else {
            range = {
                start: prevIndex,
                end: index + 1
            };
        }
        if ((reverse && lesser) || (!reverse && greater)) {
            // if in the positive range to be added to `selected`, and
            // not already in the selected array, add it
            if (i >= range.start && i <= range.end) {
                selected.push(row);
            }
        }
    }
    return selected;
}
exports.selectRowsBetween = selectRowsBetween;


/***/ }),

/***/ "./src/utils/sort.ts":
/*!***************************!*\
  !*** ./src/utils/sort.ts ***!
  \***************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(/*! ../types */ "./src/types/index.ts");
var column_prop_getters_1 = __webpack_require__(/*! ./column-prop-getters */ "./src/utils/column-prop-getters.ts");
/**
 * Gets the next sort direction
 */
function nextSortDir(sortType, current) {
    if (sortType === types_1.SortType.single) {
        if (current === types_1.SortDirection.asc) {
            return types_1.SortDirection.desc;
        }
        else {
            return types_1.SortDirection.asc;
        }
    }
    else {
        if (!current) {
            return types_1.SortDirection.asc;
        }
        else if (current === types_1.SortDirection.asc) {
            return types_1.SortDirection.desc;
        }
        else if (current === types_1.SortDirection.desc) {
            return undefined;
        }
        // avoid TS7030: Not all code paths return a value.
        return undefined;
    }
}
exports.nextSortDir = nextSortDir;
/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 */
function orderByComparator(a, b) {
    if (a === null || typeof a === 'undefined')
        a = 0;
    if (b === null || typeof b === 'undefined')
        b = 0;
    if (a instanceof Date && b instanceof Date) {
        if (a < b)
            return -1;
        if (a > b)
            return 1;
    }
    else if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
        // Convert to string in case of a=0 or b=0
        a = String(a);
        b = String(b);
        // Isn't a number so lowercase the string to properly compare
        if (a.toLowerCase() < b.toLowerCase())
            return -1;
        if (a.toLowerCase() > b.toLowerCase())
            return 1;
    }
    else {
        // Parse strings as numbers to compare properly
        if (parseFloat(a) < parseFloat(b))
            return -1;
        if (parseFloat(a) > parseFloat(b))
            return 1;
    }
    // equal each other
    return 0;
}
exports.orderByComparator = orderByComparator;
/**
 * creates a shallow copy of the `rows` input and returns the sorted copy. this function
 * does not sort the `rows` argument in place
 */
function sortRows(rows, columns, dirs) {
    if (!rows)
        return [];
    if (!dirs || !dirs.length || !columns)
        return __spreadArrays(rows);
    /**
     * record the row ordering of results from prior sort operations (if applicable)
     * this is necessary to guarantee stable sorting behavior
     */
    var rowToIndexMap = new Map();
    rows.forEach(function (row, index) { return rowToIndexMap.set(row, index); });
    var temp = __spreadArrays(rows);
    var cols = columns.reduce(function (obj, col) {
        if (col.comparator && typeof col.comparator === 'function') {
            obj[col.prop] = col.comparator;
        }
        return obj;
    }, {});
    // cache valueGetter and compareFn so that they
    // do not need to be looked-up in the sort function body
    var cachedDirs = dirs.map(function (dir) {
        var prop = dir.prop;
        return {
            prop: prop,
            dir: dir.dir,
            valueGetter: column_prop_getters_1.getterForProp(prop),
            compareFn: cols[prop] || orderByComparator
        };
    });
    return temp.sort(function (rowA, rowB) {
        for (var _i = 0, cachedDirs_1 = cachedDirs; _i < cachedDirs_1.length; _i++) {
            var cachedDir = cachedDirs_1[_i];
            // Get property and valuegetters for column to be sorted
            var prop = cachedDir.prop, valueGetter = cachedDir.valueGetter;
            // Get A and B cell values from rows based on properties of the columns
            var propA = valueGetter(rowA, prop);
            var propB = valueGetter(rowB, prop);
            // Compare function gets five parameters:
            // Two cell values to be compared as propA and propB
            // Two rows corresponding to the cells as rowA and rowB
            // Direction of the sort for this column as SortDirection
            // Compare can be a standard JS comparison function (a,b) => -1|0|1
            // as additional parameters are silently ignored. The whole row and sort
            // direction enable more complex sort logic.
            var comparison = cachedDir.dir !== types_1.SortDirection.desc ?
                cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir) :
                -cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir);
            // Don't return 0 yet in case of needing to sort by next property
            if (comparison !== 0)
                return comparison;
        }
        if (!(rowToIndexMap.has(rowA) && rowToIndexMap.has(rowB)))
            return 0;
        /**
         * all else being equal, preserve original order of the rows (stable sort)
         */
        return rowToIndexMap.get(rowA) < rowToIndexMap.get(rowB) ? -1 : 1;
    });
}
exports.sortRows = sortRows;


/***/ }),

/***/ "./src/utils/throttle.ts":
/*!*******************************!*\
  !*** ./src/utils/throttle.ts ***!
  \*******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Throttle a function
 */
function throttle(func, wait, options) {
    options = options || {};
    var context;
    var args;
    var result;
    var timeout = null;
    var previous = 0;
    function later() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(context, args);
    }
    return function () {
        var now = +new Date();
        if (!previous && options.leading === false) {
            previous = now;
        }
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
exports.throttle = throttle;
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 */
function throttleable(duration, options) {
    return function innerDecorator(target, key, descriptor) {
        return {
            configurable: true,
            enumerable: descriptor.enumerable,
            get: function getter() {
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable,
                    value: throttle(descriptor.value, duration, options)
                });
                return this[key];
            }
        };
    };
}
exports.throttleable = throttleable;


/***/ }),

/***/ "./src/utils/translate.ts":
/*!********************************!*\
  !*** ./src/utils/translate.ts ***!
  \********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var prefixes_1 = __webpack_require__(/*! ./prefixes */ "./src/utils/prefixes.ts");
var camel_case_1 = __webpack_require__(/*! ./camel-case */ "./src/utils/camel-case.ts");
// browser detection and prefixing tools
var transform = typeof window !== 'undefined' ? prefixes_1.getVendorPrefixedName('transform') : undefined;
var backfaceVisibility = typeof window !== 'undefined' ? prefixes_1.getVendorPrefixedName('backfaceVisibility') : undefined;
var hasCSSTransforms = typeof window !== 'undefined' ? !!prefixes_1.getVendorPrefixedName('transform') : undefined;
var hasCSS3DTransforms = typeof window !== 'undefined' ? !!prefixes_1.getVendorPrefixedName('perspective') : undefined;
var ua = typeof window !== 'undefined' ? window.navigator.userAgent : 'Chrome';
var isSafari = (/Safari\//).test(ua) && !(/Chrome\//).test(ua);
function translateXY(styles, x, y) {
    if (typeof transform !== 'undefined' && hasCSSTransforms) {
        if (!isSafari && hasCSS3DTransforms) {
            styles[transform] = "translate3d(" + x + "px, " + y + "px, 0)";
            styles[backfaceVisibility] = 'hidden';
        }
        else {
            styles[camel_case_1.camelCase(transform)] = "translate(" + x + "px, " + y + "px)";
        }
    }
    else {
        styles.top = y + "px";
        styles.left = x + "px";
    }
}
exports.translateXY = translateXY;


/***/ }),

/***/ "./src/utils/tree.ts":
/*!***************************!*\
  !*** ./src/utils/tree.ts ***!
  \***************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var column_prop_getters_1 = __webpack_require__(/*! ./column-prop-getters */ "./src/utils/column-prop-getters.ts");
function optionalGetterForProp(prop) {
    return prop && (function (row) { return column_prop_getters_1.getterForProp(prop)(row, prop); });
}
exports.optionalGetterForProp = optionalGetterForProp;
/**
 * This functions rearrange items by their parents
 * Also sets the level value to each of the items
 *
 * Note: Expecting each item has a property called parentId
 * Note: This algorithm will fail if a list has two or more items with same ID
 * NOTE: This algorithm will fail if there is a deadlock of relationship
 *
 * For example,
 *
 * Input
 *
 * id -> parent
 * 1  -> 0
 * 2  -> 0
 * 3  -> 1
 * 4  -> 1
 * 5  -> 2
 * 7  -> 8
 * 6  -> 3
 *
 *
 * Output
 * id -> level
 * 1      -> 0
 * --3    -> 1
 * ----6  -> 2
 * --4    -> 1
 * 2      -> 0
 * --5    -> 1
 * 7     -> 8
 *
 *
 * @param rows
 *
 */
function groupRowsByParents(rows, from, to, lazyTree) {
    if (lazyTree === void 0) { lazyTree = false; }
    if (!rows) {
        this.rows;
    }
    if (from && to) {
        var nodeById = {};
        var l = rows.length;
        var node = null;
        nodeById[0] = new TreeNode(); // that's the root node
        var uniqIDs = rows.reduce(function (arr, item) {
            var toValue = to(item);
            if (arr.indexOf(toValue) === -1) {
                arr.push(toValue);
            }
            return arr;
        }, []);
        for (var i = 0; i < l; i++) { // make TreeNode objects for each item
            nodeById[to(rows[i])] = new TreeNode(rows[i]);
        }
        var notResolvedNodes = [];
        for (var i = 0; i < l; i++) { // link all TreeNode objects
            node = nodeById[to(rows[i])];
            var parent_1 = 0;
            var fromValue = from(node.row);
            if (!!fromValue && (uniqIDs.indexOf(fromValue) > -1)) {
                parent_1 = fromValue;
            }
            node.parent = nodeById[parent_1];
            if (node.parent.row['level'] === null || node.parent.row['level'] === undefined) {
                notResolvedNodes.push(node);
            }
            else {
                node.row['level'] = node.parent.row['level'] + 1;
                node.parent.children.push(node);
            }
        }
        var temp = [];
        do {
            temp.length = 0;
            while (notResolvedNodes.length) {
                node = notResolvedNodes.pop();
                if (node.parent.row['level'] === null || node.parent.row['level'] === undefined) {
                    temp.push(node);
                }
                else {
                    node.row['level'] = node.parent.row['level'] + 1;
                    node.parent.children.push(node);
                }
            }
            notResolvedNodes = temp;
        } while (notResolvedNodes.length);
        var resolvedRows_1 = [];
        nodeById[0].flatten(function () {
            resolvedRows_1 = __spreadArrays(resolvedRows_1, [this.row]);
        }, true, lazyTree);
        return resolvedRows_1;
    }
    else {
        return rows;
    }
}
exports.groupRowsByParents = groupRowsByParents;
var TreeNode = /** @class */ (function () {
    function TreeNode(row) {
        if (row === void 0) { row = null; }
        if (!row) {
            row = {
                level: -1,
                treeStatus: 'expanded'
            };
        }
        this.row = row;
        this.parent = null;
        this.children = [];
    }
    TreeNode.prototype.flatten = function (f, recursive, lazyTree) {
        if (lazyTree === void 0) { lazyTree = false; }
        if (this.row['treeStatus'] === 'expanded') {
            for (var i = 0, l = this.children.length; i < l; i++) {
                var child = this.children[i];
                if (!lazyTree && (!child.children || !child.children.length)) {
                    child.row['treeStatus'] = 'disabled';
                }
                else if (child.children && child.children.length && child.row['treeStatus'] === 'disabled') {
                    child.row['treeStatus'] = 'collapsed';
                }
                f.apply(child, Array.prototype.slice.call(arguments, 2));
                if (recursive) {
                    child.flatten.apply(child, arguments, lazyTree);
                }
            }
        }
    };
    return TreeNode;
}());


/***/ }),

/***/ "vue-property-decorator":
/*!*****************************************!*\
  !*** external "vue-property-decorator" ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vue_property_decorator__;

/***/ })

/******/ });
});
//# sourceMappingURL=index.map