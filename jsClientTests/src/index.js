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
    alert(resolve);
    console.log("test")
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
  setTimeout(function() {
    resolve(new Theneable(333))
    reject("fail.")
  }, 2232)
});

p.then((msj) => console.log(msj))


