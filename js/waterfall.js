;(function (win, doc) {
  var WaterFall = function (opt) {
    this.containerId = opt.id;
    this.containerEle = null;
    this.cover = opt.cover;
    this.coverEle = null;
    this.background = opt.background;
    this.time = opt.time;
    this.timer = null;
    this.init();
  };

  WaterFall.prototype = {
    init: function () {
      var self = this,
        containerEle = self.$(self.containerId);
      if (! containerEle) {
        return;
      }
      self.containerEle = containerEle;
      self.getImg();
    },

    getImg: function () {
      var self = this,
        cover = self.cover,
        img = new Image();
      self.coverEle = img;
      img.src = cover;
      img.complete && self.startFlow();
      ! img.complete && (img.onload = function () {
        img.onload = null;
        self.startFlow();
      });
    },

    startFlow: function () {
      var self = this,
        timer = self.timer,
        increase = 0,
        coverEle = self.coverEle,
        height = coverEle.height / 2,
        width = coverEle.width / 2,
        time = self.time * 1000 / height;
      self.setDom(width, height);
      timer = setTimeout(function () {
        coverEle.style.clip = ['rect(0px,', width, 'px,', increase, 'px,0px)'].join('');
        timer = setTimeout(arguments.callee, time);
        increase ++ === height && (increase = 0);
      }, time);
    },

    setDom: function (width, height) {
      var self = this,
        containerEle = self.containerEle,
        background = self.background,
        div1 = doc.createElement('div'),
        div2 = doc.createElement('div'),
        img = self.coverEle;
      containerEle.setAttribute('style', ['height:', height, "px;width:", width, 'px;'].join(''));
      div1.setAttribute('class', 'fall-cover');
      div1.appendChild(img);
      div2.setAttribute('class', 'fall-background');
      div2.setAttribute('style', ['background:url(' , background, ') no-repeat 0 0;background-size:', width, 'px ', height, 'px;'].join(''));
      containerEle.appendChild(div2);
      containerEle.appendChild(div1);
    },

    $: function (id) {
      return doc.getElementById(id);
    }
  }
  win.WaterFall = WaterFall;
})(window, document);
