# jerry

jerry is a lightweight JavaScript DOM interaction Library, inspired by JQuery.

## Features

- Traverse and manipulate single or multiple DOM elements
- Add and remove DOM elements
- Handle DOM events
- Make AJAX requests

## Use

In order to use jerry, download this library into your project and add `jerry.js` in a script tag on the head of your root HTML page.

```html
  <script src="./jerry.js" charset="utf-8"></script>
```

A demo is provided in the demo folder.

### $j(arg)

$j returns an instance of a DOMNodeCollection. If a string is passed as an argument, $j will return a new `DOMNodeCollection` containing all of the HTML elements on the page that match the argument passed to it. If the argument is a function, or there are multiple functions, these will be stored in a `queue`, and executed consecutively once the document has fully loaded.

```javascript
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
```

## Selection with $j

DOM elements are selected based on the type of input passed to $j:

### HTML elements

Select all HTML elements of a given type on a page by passing a string as an argument.

### Select by Class Name

Select all elements belonging to a particular class by prefixing each string item with '.'.

### Select by ID

Select all elements belonging to a particular class by prefixing the string with '#'.

## DOM Manipulation

There are numerous methods available to interact with DOM elements once they have been selected:

``html(str)``
``empty``
``each(callback)``
``append(element)``
``attr(attributeName, value)``
``addClass(newClass)``
``removeClass(className)``
``parent``
``children``
``find(arg)``
``on(action, callback)``
``off(action, callback)``
``$g.ready(callback)``
`$g.keydown(callback)``
`$g.extend``


## AJAX

jerry is able to send AJAX requests, and return a promise upon success/failure.

```javascript
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
