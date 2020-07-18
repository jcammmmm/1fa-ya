'use strict'
const client = require ('./client')

let x = simpleRun_snippet();
console.log(x)

function simpleRun_snippet() {
  let req = client({
    method: 'GET',
    path: 'http://localhost:8080/services'
  }).then(r => console.log(r));
  return req;
}

function error_snippet() {
  // The client must have an error interceptor
  let x = client("abcde").then(function(r) {
    console.log("not called.")
  }, function(s) {
    console.log("errosito")
  });
}
