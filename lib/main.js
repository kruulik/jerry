const DOMNodeCollection = require('./dom_node_collection');

const queue = [];
document.addEventListener("DOMContentLoaded", () => {
  queue.forEach( (func) => {
    func();
  });
});
function $l(selector){
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

window.$l = $l;

$l.extend = function(...objects){
  return Object.assign(...objects);
};
