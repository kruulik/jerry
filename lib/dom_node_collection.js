class DOMNodeCollection {

  constructor(elements) {
    this.elements = elements;
    this.eventCallback = null;
  }

  html(string){
    if (!string){
      return this.elements[0].innerHTML;
    } else {
      this.elements.forEach((el) => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.elements.forEach((el) => {
      el.html('');
    });
  }

  append(content) {
    this.elements.forEach( (el) => {
      content.forEach ( (el2) => {
        el.innerHTML += el2.outerHTML;
      });
    });
  }

  attr(attributeName, value) {
    if (value) {
      this.elements.forEach((el) => {
        el.setAttribute(attributeName, value);
      });
    } else {
      return this.elements[0].getAttribute(attributeName);
    }
  }

  addClass(cNames) {
    cNames = cNames.split(' ');
    this.elements.forEach( (el) => {
      cNames.forEach((name) => {
        el.classList.add(name);
      });
    });
  }

  removeClass(cNames) {
    cNames = cNames.split(' ');
    this.elements.forEach( (el) => {
      const cList = el.classList;
      if(!cNames) {
        cList.forEach((name) => {
          el.classList.remove(name);
        });
      } else {
        el.classList.remove(...cNames);
      }
    });
  }

  children() {
    let arr = [];
    this.elements.forEach( (el) => {
      arr = arr.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(arr);
  }

  parent() {
    let arr = [];
    this.elements.forEach( (el) => {
      arr.push(el.parentNode);
    });
    return new DOMNodeCollection(arr);
  }

  find(selector) {
    let arr = [];
    this.elements.forEach((el) => {
      arr = arr.concat(Array.from(el.querySelectorAll(selector)));
    });
    return arr;
  }

  remove() {
    this.elements.forEach((el) => {
      el.remove();
    });
  }

  on(action, callback){
    this.eventCallback = callback;

    this.elements.forEach((el) => {
      el.addEventListener(action, callback);
    });
  }

  off(action){
    const callback = this.eventCallback;

    this.elements.forEach((el) => {
      el.removeEventListener(action, callback);
    });
  }




}

module.exports = DOMNodeCollection;
