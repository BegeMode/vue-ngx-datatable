# vue-ngx-datatable

`vue-ngx-datatable` is an Vue.js component for presenting large and complex data.  It has all the features you would expect from any other table but in a light package with _no external dependencies_. The table was designed to be extremely flexible and light; it doesn't make any assumptions about your data or how you: filter, sort or page it.

It was built for modern browsers using _TypeScript, CSS3 and HTML5_ and vue.js `>=2.5.0`.

Check out the [demos](http://begemode.github.io/vue-ngx-datatable/) for more information!

See the [changelog](https://github.com/begemode/vue-ngx-datatable/blob/master/docs/changelog.md) for recent changes.

## Features

- Handle large data sets ( Virtual DOM )
- Expressive Header and Cell Templates
- Horizontal & Vertical Scrolling
- Column Reordering & Resizing
- Client/Server side Pagination & Sorting
- Intelligent Column Width Algorithms ( Force-fill & Flex-grow )
- Integrated Pager
- Cell & Row Selection ( Single, Multi, Keyboard, Checkbox )
- Fixed AND Fluid height
- Left and Right Column Pinning
- Row Detail View
- Decoupled theme'ing with included Google Material theme
- Light codebase / No external dependencies
- AoT Compilation Support
- Universal Support

## Installation

To use vue-ngx-datatable in your project install from `release` folder. In your project (typescript):

```typescript
import 'lib/vue-ngx-datatable/index.css';
import DatatableComponent from 'lib/vue-ngx-datatable';

Vue.component('datatable', DatatableComponent);
```

## Credits

`ngx-vue-datatable` is open-source project; fork of Angular ngx-datatable by [Swimlane](http://swimlane.com).  We believe in giving back to the open-source community by sharing some of the projects we build for our application.
