const DOMNodeCollection = require('./dom_node_collection');

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
