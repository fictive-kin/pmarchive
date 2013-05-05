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

  addEvent(window, 'scroll', function() {
    var header = document.getElementsByTagName('h1')[0];
    if (scrollTop() >= 160) {
      header.className = 'stick-to-top';
    } else {
      header.className = '';
    }
  });
})();