package com.jcflorezv.unfaya.easyauth.repositories;

import com.jcflorezv.unfaya.easyauth.entities.Employee;

import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {}