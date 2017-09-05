const DOMNodeCollection = require('./dom_node_collection');

window.$j = $j;

const queue = [];

document.addEventListener("DOMContentLoaded", () => {
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
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  options = $j.extend(defaults, options);
  options.method = options.method.toUpperCase();
  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);
  xhr.onload = function() {
    console.log(xhr.status);
    console.log(xhr.responseType);
    console.log(xhr.response);
  };
  xhr.send(JSON.stringify(options.data));
};
