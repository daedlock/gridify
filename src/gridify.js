/*
 * Copyright (c) 2015 Hossam Saraya
 * Licensed under the MIT license.
 */

(function ($) {

  //Create once
  var defaults = {
    arrows: {
      left: ".arrow",
        right: ".arrow",
        top: ".arrow",
        bottom: ".arrow"
    },
    pageSelector: ".page",
      pagesPerRow: 3,
      arrowKeysEnabled: true,
      onAfterPageSlide: function (i, j) {
    },
    onBeforePageSlide: function (i, j) {
    }
  };

  var Gridify = function (el, options) {
    this.settings = $.extend({}, defaults, options);
    this.gridRoot = el;
    this.init();
  }

  Gridify.prototype = {
    /* Initialization variables */
    initData: function () {
      this.body = $("body");
      this.arrows = $([this.settings.arrows.left, this.settings.arrows.right, this.settings.arrows.top, this.settings.arrows.bottom].join(","));
      this.cameraPosition = {
        x: 0,
        y: 0
      };
      this.currentIndex = {
        i: 0,
        j: 0
      };
      this.pages = this.gridRoot.find(this.settings.pageSelector);
    },

    /* Initialization logic */
    init: function () {
      this.initData();
      this.bindArrowKeys();
      this.redraw();
      var self = this;
      $(window).resize(function () {
        self.redraw();
      });
    },

    /* Binds keyboard up,left,right,down to moveTo method */
    bindArrowKeys: function () {
      if (this.settings.arrowKeysEnabled) {
        var self = this;
        $(document).keydown(function (e) {
          switch (e.which) {
            case 37: // left
              self.moveToPage(self.currentIndex.i, self.currentIndex.j - 1);
              break;

            case 38: // up
              self.moveToPage(self.currentIndex.i - 1, self.currentIndex.j);
              break;

            case 39: // right
              self.moveToPage(self.currentIndex.i, self.currentIndex.j + 1);
              break;

            case 40: // down
              self.moveToPage(self.currentIndex.i + 1, self.currentIndex.j);
              break;

            default:
              return; // exit this handler for other keys
          }
          e.preventDefault(); // prevent the default action (scroll / move caret)
        });
      }
    },

    /* Moves the camera to the page of index i,j */
    moveToPage: function (i, j) {
      //TODO: Double Check
      //Boundary check
      if (i < 0 || j < 0 || j + 1 > this.settings.pagesPerRow || i + 1 > Math.ceil(this.pages.length / this.settings.pagesPerRow)) {
        return false;
      }
      this.settings.onBeforePageSlide(this.currentIndex.i, this.currentIndex.j);
      var w = window.innerWidth, h = window.innerHeight;
      var self=this;
      this.cameraPosition.x = -j * w;
      this.cameraPosition.y = -i * h;
      this.currentIndex.j = j;
      this.currentIndex.i = i;

      //Animation
      this.body.velocity({
          scale: 0.7,
          opacity: 0.7
        },
        {});
      this.arrows.velocity({
        opacity: 0
      });
      this.pages.velocity({
        scale: .95
      });
      this.gridRoot.velocity({
        translateX: self.cameraPosition.x,
        translateY: self.cameraPosition.y
      }, {
        delay: 300,
        easing: [0.71, -0.58, 0.29, 1.57]
      });
      this.body.velocity({
        scale: 1,
        opacity: 1
      }, {
        delay: 300,
        complete: function () {
          self.settings.onAfterPageSlide(self.currentIndex.i, self.currentIndex.j);
        }
      });
      this.pages.velocity({
        scale: 1
      }, {
        delay: 300
      });
      this.arrows.velocity({
        opacity: 1
      }, {
        delay: 360
      });

      //End of animation
    },

    /* Redraw/Resize the page blocks. Responsiveness is the purpose */
    redraw: function () {
      this.cameraPosition.x = -this.currentIndex.j * window.innerWidth;
      this.cameraPosition.y = -this.currentIndex.i * window.innerHeight;
      this.gridRoot.css({
        transform: "translateX(" + this.cameraPosition.x + "px) translateY(" + this.cameraPosition.y + "px)"
      });

      var self = this;
      return this.pages.each(function (i, el) {
        //x
        // i % 3
        //y
        // floor i / 3 -> [0,0] [1,0] [2,0] [3,1]
        $(el).css({
          position: "fixed",
          overflow: "scroll",
          zIndex: -1,
          top: Math.floor(i / self.settings.pagesPerRow) * window.innerHeight,
          bottom: 0,
          left: ((i % self.settings.pagesPerRow) * window.innerWidth),
          width: window.innerWidth,
          minHeight: window.innerHeight
        });
      });
    }

  }


  //"use strict";
  $.Gridify = Gridify;

}(jQuery));

