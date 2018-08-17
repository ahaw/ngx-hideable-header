# PhotoSwipe for Angular 2+ with Universal support

This is a library with components and services for PhotoSwipe.
The official PhotoSwipe JS file is still needed.

### Installation

```
npm install --save ngx-hideable-header
```

Include the HideableHeaderModule.
```js
import {HideableHeaderModule} from 'ngx-hideable-header';

@NgModule({
  ...
  imports: [
    BrowserModule,
    HideableHeaderModule
  ]
  ...
})
export class AppModule {
  ...
}
```

### Usage

```js
  //add hideableHeader directive to object with optional 'hideOnScrollDown' parameter">
   <div class="container">
    <nav hideableHeader [hideOnScrollDown]=true>
        <a href="#" id="brand">Brand</a>
    </nav>
</div>
</div>

```

### Demo

For a demo just run:
```
npm install
npm run start
```
