/*
 *
 *
 *
 * Copyright (c) 2015 Hossam Saraya
 * Licensed under the MIT license.
 */
(function ($) {

  $.fn.pageCarousel = function (options) {

    var DEFAULTS = {
      arrows: {
        left: ".arrow",
        right: ".arrow",
        top: ".arrow",
        bottom: ".arrow"
      },
      pageSelector: ".page",
      pagesPerRow: 3,
      arrowKeysEnabled: true,
      onAfterPageSlide: function (i,j) {
      },
      onBeforePageSlide: function (i,j) {
      }
    }

    var settings = $.extend({}, DEFAULTS, options);
    var gridRoot = this;
    var body = $("body");
    var arrows = $([settings.arrows.left,settings.arrows.right,settings.arrows.top,settings.arrows.bottom].join(","));
    var cameraPosition = {
      x: 0,
      y: 0
    };
    var currentIndex = {
      i: 0,
      j: 0
    };
    var pages = gridRoot.find(settings.pageSelector);

    //Bind keys
    if(settings.arrowKeysEnabled){
      $(document).keydown(function(e) {
        switch(e.which) {
          case 37: // left
            moveToPage(currentIndex.i,currentIndex.j-1)
            break;

          case 38: // up
            moveToPage(currentIndex.i-1,currentIndex.j)
            break;

          case 39: // right
            moveToPage(currentIndex.i,currentIndex.j+1)
            break;

          case 40: // down
            moveToPage(currentIndex.i+1,currentIndex.j)
            break;

          default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
      });
    }


    //Reposition and Resize pages to adapt to current viewport w/h
    var redraw = function () {
      console.log(currentIndex)
      cameraPosition.x = -currentIndex.j * window.innerWidth
      cameraPosition.y = -currentIndex.i * window.innerHeight
      gridRoot.css({
        transform: "translateX("+ cameraPosition.x +"px) translateY("+cameraPosition.y+"px)"
      })


      return pages.each(function (i, el) {
        //x
        // i % 3
        //y
        // floor i / 3 -> [0,0] [1,0] [2,0] [3,1]
        $(el).css({
          top: Math.floor(i/settings.pagesPerRow) * window.innerHeight,
          bottom: 0,
          left: ((i%settings.pagesPerRow) * window.innerWidth),
          width: window.innerWidth,
          minHeight: window.innerHeight
        });
      });
    }

    window.moveToPage = function(i,j){

      //Boundary check
      if(i<0 || j<0 || j+1 > settings.pagesPerRow || i+1 > Math.ceil(pages.length/settings.pagesPerRow))
        return false;

      settings.onBeforePageSlide(currentIndex.i,currentIndex.j);


      var w = window.innerWidth,  h = window.innerHeight;

      cameraPosition.x =  - j * w;
      cameraPosition.y =  - i * h;
      currentIndex.j = j;
      currentIndex.i = i;

      body.velocity({
          scale: .7,
          opacity: .7
        },
        {

        });

      arrows.velocity({
        opacity:0
      });

      gridRoot.velocity({
        translateX: cameraPosition.x,
        translateY: cameraPosition.y
      }, {
        delay: 300,
        easing: [.71, -0.58, .29, 1.57]
      });

      body.velocity({
        scale: 1,
        opacity: 1
      }, {
        delay: 300,
        complete: function () {
          settings.onAfterPageSlide(currentIndex.i,currentIndex.j);
        }
      });

      arrows.velocity({
        opacity:1
      },{
        delay:360
      });
    }

    redraw()

    $(window).resize(function () {
      redraw();
    })

    $(".arrow").click(function () {

      //Callback



    });

    return this;
  };


  $(".grid-pages").pageCarousel({
    pagesPerRow:2,
    onAfterPageSlide: function (i,j) {
    }
  });

}(jQuery));

