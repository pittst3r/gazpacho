/* global Testem */
/* eslint-disable no-console */

import querystring from 'querystring';

function appendResult(result) {
  var resultsContainer = document.getElementById('features');
  var resultTag = document.createElement('p');

  resultTag.appendChild(document.createTextNode(result.tap));
  resultsContainer.appendChild(resultTag);
}

function cornichonFrameworkAdapter(socket) {
  let results = [];
  let passed = 0;
  let failed = 0;
  let total = 0;
  let filter = querystring.parse(window.location.search.split('?')[1]).grep;

  socket.emit('tests-start');

  window.cornichon.default.run(filter, (result) => {
    let resultForHarness;

    if (result.didPass) {
      passed += 1;
    } else {
      failed += 1;
    }

    total += 1;

    resultForHarness = {
      passed,
      failed,
      total,
      id: result.testNumber,
      name: result.name,
      items: [{
        passed,
        message: result.error ? result.error.message : undefined,
        stack: result.error ? result.error.stack : undefined,
      },],
    };

    results.push(resultForHarness);

    if (result.error) {
      console.error(result.error);
    }
    appendResult(result);
    socket.emit('test-result', resultForHarness);
  });

  socket.emit('all-test-results', results);
}

Testem.useCustomAdapter(cornichonFrameworkAdapter);
