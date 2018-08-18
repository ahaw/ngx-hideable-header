# Hideable Header for Angular 2+ with Universal support

This directive makes it easy to have website headers that are hidable when the user passes a certain height on the screen.

### Online demo

``` 
 https://ngx-hideable-header.firebaseapp.com
```

### Local Demo

For a demo just run:
```
npm install
npm run start
```

### Installation

```
npm install --save ngx-hideable-header
```

Include the HideableHeaderModule.
```js
import { HideableHeaderModule } from 'ngx-hideable-header';

@NgModule({
  ...
  imports: [
    BrowserModule,
    HideableHeaderModule.forRoot({
      height: 80,
      // The rest of these are optional
      units: 'px',
      position: 'fixed',
      top: '0',
      left: '0',
      transition: 'all 0.5s'
    })
  ]
  ...
})
export class AppModule {
  ...
}
```

### Usage

When importing use the `forRoot` method in your app module and pass it the height of your header in and the units you
want to use, as well as positional css.  The only value required is the `height` and the default units value is pixels.

```html
//disable the directive via the 'disable' parameter">
<div class="container">
  <nav hideableHeader [disable]=true>
    <a href="#" id="brand">Brand</a>
  </nav>
</div>
```


