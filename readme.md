# gridify

> a jQuery plugin that utilizes CSS3 transformations to transform your website into a multi page grid with smooth animations.


![](https://github.com/daedlock/gridify/raw/master/demo/images/Preview.gif)



## Dependencies
* [jQuery](https://jquery.com/)
* [VelocityJS](http://julian.com/research/velocity/)
          
      
      
## Installation

###Bower

```
bower install gridify --save
```

Just make sure that _jquery_ and _velocity.js_ is included before gridify because it depends on them.


 

###Manually

Download the [production version][min] or the [development version][max]. and make sure to grab the latest velocityjs from [here](http://julian.com/research/velocity/)

[min]: https://raw.githubusercontent.com/daedlock/jquery-gridify/master/dist/jquery.gridify.min.js
[max]: https://raw.githubusercontent.com/daedlock/jquery-gridify/master/dist/jquery.gridify.js
 
In your web page:

```html
<script src="/path/to/jquery.js"></script>
<script src="/path/to/velocity.js"></script>
<script src="/path/to/jquery.gridify.min.js"></script>
```


## Usage
__HTML__:

```
<div class="yourSelector">
	<div class="page">
		...
	</div>
	<div class="page">
		...
	</div>
	<div class="page">
		...
	</div>
</div>
```

**Javascript**:

```
var grid = new $.Gridify($(".yourSelector"));
```

or

```
var grid = new $.Gridify($(".grid-pages"),{
	//options
});

```

this will initialize the page grid with the default behavior, you can extend the default behavior and extend the functionality by taking advantage of the `moveTo(i,j)` method. It normally gives you a way to manually move to the page at the given index (i,j).

```
grid.moveTo(0,1) //will move to the element at row 0 and column 1

```
      
        
          
          
## Options


| key  | type | default  | description  |
|---|---|---|---|
| pageSelector | string |  .page |  the page CSS Selector |
| pagesPerRow  | integer | 3  | number of pages per row. In otherwords, the threshold before inserting a new row into the grid  |
| arrowKeysEnabled | boolean  | true  | Enable navigating between grid pages using keyboard arrows  |
| onAfterPageSlide | function | `function(i,j){}`  | Fires after navigating to a page. The i,j represents the current page position in 2D space  |
| onBeforePageSlide  | function | `function(i,j){}`   | Fires before navigating to a page The i,j represents the current page position in 2D space  |
|  arrows | no | check the sample options for default values| CSS Selector for arrows upon which the page movement is fired  |


Here is a a json object with the default values for all options

```
  var DEFAULTS = {
      arrows: {
        left: ".gridify-arrow-left",
        right: ".gridify-arrow-right",
        top: ".gridify-arrow-up",
        bottom: ".gridify-arrow-down"
      },
      pageSelector: ".page",
      pagesPerRow: 3,
      arrowKeysEnabled: true,
      onAfterPageSlide: function (i,j) {
      },
      onBeforePageSlide: function (i,j) {
      }
  };
```

## License

MIT © Hossam Saraya

> The MIT License (MIT)

> Copyright (c) <year> <copyright holders>

> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
