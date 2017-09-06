/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$j = $j;

const queue = [];

document.addEventListener("DOMContentLoaded", () => {
  console.log('loaded!');
  queue.forEach((func) => {
    func();
  });
});

function $j(selector) {
  let nodeList;
  if (selector instanceof Function) {
    if (document.readyState === 'complete') {
      selector();
    } else {
      queue.push(selector);
    }
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else {
    nodeList = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(nodeList));
  }
}


$j.extend = function(...objects) {
  return Object.assign(...objects);
};


$j.ajax = options => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const defaults = {
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: "GET",
      url: "",
      dataType: "JSON",
      success: () => {},
      error: () => {},
      data: {},
    };
    options = $j.extend(defaults, options);
    xhr.open(options.method, options.url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        options.success(xhr.response);
      } else {
        options.error(xhr.response);
      }
    };
    xhr.send(JSON.stringify(options.data));
  });
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

  val(){
    return this.elements[0].value;
  }

  empty() {
    this.elements.forEach((el) => {
      el.html('');
    });
  }

  append(content) {
    if (typeof content === 'string') {
      this.elements.forEach(el => {
        el.innerHTML += content;
      });
    } else if (content instanceof DomNondeCollection) {
      this.elements.forEach(el => {
        content.forEach(child => {
          el.appendChild(childNode.cloneNode(true));
        });
      });
    }
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


/***/ })
/******/ ]);
//# sourceMappingURL=jerry.js.map