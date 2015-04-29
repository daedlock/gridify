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
$(".yourSelector").gridify();
```

or

```
$(".yourSelector").gridify({
	//options
});
``` 
      
        
          
          
## Options


| key  | default  | description  |
|---|---|---|
| pageSelector  |  .page |  the page CSS Selector |
| pagesPerRow  | 3  | number of pages per row. In otherwords, the threshold before inserting a new row into the grid  |
| arrowKeysEnabled  | true  | Enable navigating between grid pages using keyboard arrows  |
| onAfterPageSlide  | `function(i,j){}`  | Fires after navigating to a page. The i,j represents the current page position in 2D space  |
| onBeforePageSlide  | `function(i,j){}`   | Fires before navigating to a page The i,j represents the current page position in 2D space  |
|  arrows | check the sample options for default values| CSS Selector for arrows upon which the page movement is fired  |


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
