'use strict'
const when = require('when');
const client = require('./client')
const follow = require('./follow')

let root = "/api"
function loadFromServer(pageSize) {
  follow(client, root, [
      {rel: 'employees', params: {size: pageSize}}]
  ).then(employeeCollection => {
    return client({
      method: 'GET',
      path: employeeCollection.entity._links.profile.href,
      headers: {'Accept': 'application/schema+json'}
    }).then(schema => {
      // tag::json-schema-filter[]
      /**
       * Filter unneeded JSON Schema properties, like uri references and
       * subtypes ($ref).
       */
      Object.keys(schema.entity.properties).forEach(function (property) {
        if (schema.entity.properties[property].hasOwnProperty('format') &&
          schema.entity.properties[property].format === 'uri') {
          delete schema.entity.properties[property];
        }
        else if (schema.entity.properties[property].hasOwnProperty('$ref')) {
          delete schema.entity.properties[property];
        }
      });

      this.schema = schema.entity;
      this.links = employeeCollection.entity._links;
      return employeeCollection;
      // end::json-schema-filter[]
    });
  }).then(employeeCollection => {
    this.page = employeeCollection.entity.page;
    return employeeCollection.entity._embedded.employees.map(employee =>
        client({
          method: 'GET',
          path: employee._links.self.href
        })
    );
  }).then(employeePromises => {
    return when.all(employeePromises);
  }).done(employees => {
    this.setState({
      page: this.page,
      employees: employees,
      attributes: Object.keys(this.schema.properties),
      pageSize: pageSize,
      links: this.links
    });
  });
}

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

// let x = client({
//   method: 'GET',
//   path: '/api'
// })
// console.log(x)


/************************************************************
 * Theneable class
 ************************************************************/
class Theneable {
  constructor(num) {
    this.num = num;
  }

  then(resolve, reject) {
    console.log("inside of Theneable.then()")
    setTimeout(() => resolve(this.num * 2), 1000);
  }
}

async function f() {
  let result = await new Theneable(2);
  alert(result);
}

// f();


/************************************************************
 * MDN basic example
 ************************************************************/
let p = new Promise((resolve, reject) => {
  // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
  // In this example, we use setTimeout(...) to simulate async code. 
  // In reality, you will probably be using something like XHR or an HTML5 API.
  setTimeout( function() {
    resolve("Success on " + new Date())  // Yay! Everything went well!
  }, 250) 
}) 

p.then((successMessage) => {
  // successMessage is whatever we passed in the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log("Yay! " + successMessage) 
});


/************************************************************
 * MDN medium example
 ************************************************************/
// To experiment with error handling, "threshold" values cause errors randomly
const THRESHOLD_A = 5; // can use zero 0 to guarantee error

function tetheredGetNumber(resolve, reject) {
  try {
    setTimeout( 
      function() {
        const randomInt = Date.now();
        const value = 4 // randomInt % 10;
        try { 
          if(value >= THRESHOLD_A) {
            throw new Error(`Too large: ${value}`);
          } 
        } catch(msg) {
            reject(`Error in callback ${msg}`); 
        }
      resolve(value);
      return;
    }, 500);
    // To experiment with error at set-up, uncomment the following 'throw'.
    // throw new Error("Bad setup");
  } catch(err) {
    reject(`Error during setup: ${err}`);
  }
  return;
}

function determineParity(value) {
  const isOdd = value % 2 ? true : false ;
  const parityInfo = { theNumber: value, isOdd: isOdd };
  return parityInfo;
}

function troubleWithGetNumber(reason) {
  console.error(`Trouble getting number: ${reason}`);
  throw -999; // must "throw" something, to maintain error state down the chain
}

function promiseGetWord(parityInfo) {
  // The "tetheredGetWord()" function gets "parityInfo" as closure variable.
  var tetheredGetWord = function(resolve,reject) {
    const theNumber = parityInfo.theNumber;
    const threshold_B = THRESHOLD_A - 1;
    if(theNumber >= threshold_B) {
      reject(`Still too large: ${theNumber}`);
    } else {
      parityInfo.wordEvenOdd = parityInfo.isOdd ? 'odd' : 'even';
      resolve(parityInfo);
    }
    return;
  }
  return new Promise(tetheredGetWord);
}

(new Promise(tetheredGetNumber))
  .then(determineParity,troubleWithGetNumber)
  .then(promiseGetWord)
  .then((info) => { 
    console.log("Got: ",info.theNumber,", ", info.wordEvenOdd); 
    return info; 
  })
  .catch((reason) => {
    if(reason === -999) {
      console.error("Had previously handled error");
    }
    else {
      console.error(`Trouble with promiseGetWord(): ${reason}`);
    }
   })
  .finally((info) => console.log("All done"));



/************************************************************
 * MDN advanced example
 ************************************************************/

var promiseCount = 0;

function testPromise() {
    let thisPromiseCount = ++promiseCount;

    let log = document.getElementById('log');
    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Started (<small>Sync code started</small>)<br/>');

    // We make a new promise: we promise a numeric count of this promise, starting from 1 (after waiting 3s)
    let p1 = new Promise(
        // The executor function is called with the ability to resolve or
        // reject the promise
       (resolve, reject) => {
            log.insertAdjacentHTML('beforeend', thisPromiseCount +
                ') Promise started (<small>Async code started</small>)<br/>');
            // This is only an example to create asynchronism
            setTimeout(
                function() {
                    // We fulfill the promise !
                    resolve(thisPromiseCount);
                }, Math.random() * 2000 + 1000);
        }
    );

    // We define what to do when the promise is resolved with the then() call,
    // and what to do when the promise is rejected with the catch() call
    p1.then(
        // Log the fulfillment value
        function(val) {
            log.insertAdjacentHTML('beforeend', val +
                ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
        }).catch(
        // Log the rejection reason
       (reason) => {
            console.log('Handle rejected promise ('+reason+') here.');
        });

    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Promise made (<small>Sync code terminated</small>)<br/>');
}

testPromise();
testPromise();
testPromise();
testPromise();
  
