import { jsdom, } from 'jsdom';

export function setupDOM() {
  global.document = jsdom('');
  global.window = document.defaultView;
  Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
      global[property] = document.defaultView[property];
    }
  });

  global.navigator = {
    userAgent: 'node.js',
  };
}

export function teardownDOM() {
  global.window.close();
  global.window = null;
  global.document = null;
  global.navigator = null;
}
