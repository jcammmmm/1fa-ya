'use strict'
const when = require('when');
const client = require('./client')
const follow = require('./follow')

function loadFromServer(pageSize) {
  let data = follow(client, "http://localhost:8081/api/employees", [ { 'rel': 'employees', params: {'somethingWrong': 33}}])
  setTimeout(() => console.log(data), 5000);



  // follow(client, root, [
  //     {rel: 'employees', params: {size: pageSize}}]
  // ).then(employeeCollection => {
  //   return client({
  //     method: 'GET',
  //     path: employeeCollection.entity._links.profile.href,
  //     headers: {'Accept': 'application/schema+json'}
  //   }).then(schema => {
  //     // tag::json-schema-filter[]
  //     /**
  //      * Filter unneeded JSON Schema properties, like uri references and
  //      * subtypes ($ref).
  //      */
  //     Object.keys(schema.entity.properties).forEach(function (property) {
  //       if (schema.entity.properties[property].hasOwnProperty('format') &&
  //         schema.entity.properties[property].format === 'uri') {
  //         delete schema.entity.properties[property];
  //       }
  //       else if (schema.entity.properties[property].hasOwnProperty('$ref')) {
  //         delete schema.entity.properties[property];
  //       }
  //     });

  //     this.schema = schema.entity;
  //     this.links = employeeCollection.entity._links;
  //     return employeeCollection;
  //     // end::json-schema-filter[]
  //   });
  // }).then(employeeCollection => {
  //   this.page = employeeCollection.entity.page;
  //   return employeeCollection.entity._embedded.employees.map(employee =>
  //       client({
  //         method: 'GET',
  //         path: employee._links.self.href
  //       })
  //   );
  // }).then(employeePromises => {
  //   return when.all(employeePromises);
  // }).done(employees => {
  //   this.setState({
  //     page: this.page,
  //     employees: employees,
  //     attributes: Object.keys(this.schema.properties),
  //     pageSize: pageSize,
  //     links: this.links
  //   });
  // });
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

function basicRequest_snnipet() {
  client({
    method: 'GET',
    path: 'http://localhost:8081/api/employees'
  }).then(
    () => console.log("ok"), 
    (ee) => { 
      console.log(ee.request.path); 
      console.log(ee.raw.response); 
      console.log(ee);
    } 
  )
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

loadFromServer(2);


