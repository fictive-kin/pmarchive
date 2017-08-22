(function() {
  var win = window, docElem = document.documentElement, body = document.body;
  //http://dean.edwards.name/weblog/2005/10/add-event2/
  function addEvent(element, type, handler) {
    if (!handler.$$guid) handler.$$guid = addEvent.guid++;
    if (!element.events) element.events = {};
    var handlers = element.events[type];
    if (!handlers) {
      handlers = element.events[type] = {};
      if (element["on" + type]) {
        handlers[0] = element["on" + type];
      }
    }
    handlers[handler.$$guid] = handler;
    element["on" + type] = handleEvent;
  }
  addEvent.guid = 1;

  function handleEvent(event) {
    var returnValue = true;
    event = event || fixEvent(window.event);
    var handlers = this.events[event.type];
    for (var i in handlers) {
      this.$$handleEvent = handlers[i];
      if (this.$$handleEvent(event) === false) {
        returnValue = false;
      }
    }
    return returnValue;
  }

  function fixEvent(event) {
    event.preventDefault = fixEvent.preventDefault;
    event.stopPropagation = fixEvent.stopPropagation;
    return event;
  }
  fixEvent.preventDefault = function() {
    this.returnValue = false;
  };
  fixEvent.stopPropagation = function() {
    this.cancelBubble = true;
  };

  function scrollTop() {
    return parseInt(win.pageYOffset || docElem.scrollTop  || body.scrollTop, 10);
  }
  function cloneTitle() {
    var header = document.getElementsByTagName('h1')[0];
    header.className = 'scroller';

    var clone = header.cloneNode();
    clone.appendChild(document.createTextNode(header.innerHTML));
    clone.className = 'sticker';
    header.parentNode.insertBefore(clone, header);
  }
  cloneTitle();

  addEvent(window, 'scroll', function() {
    if (scrollTop() >= 160) {
      document.body.className = 'stick-to-top';
    } else {
      document.body.className = '';
    }
  });

  function mouseIn(e) {
    var b = document.createElement('b');
    b.id = 'tooltip';
    var tooltip = this.getAttribute('title');
    b.appendChild(document.createTextNode(tooltip));
    this.parentNode.appendChild(b);
  }
  function mouseOut() {
    var b = document.getElementById('tooltip');
    b.parentNode.removeChild(b);
  }

  var toc2 = document.getElementsByClassName('toc2')[0];
  var as = toc2.getElementsByTagName('a');
  for (var i = 0; i < as.length; i++) {
    addEvent(as[i], 'mouseover', mouseIn);
    addEvent(as[i], 'mouseout', mouseOut);
  }
})();