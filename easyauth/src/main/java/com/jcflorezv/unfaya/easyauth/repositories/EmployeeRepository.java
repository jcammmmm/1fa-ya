package com.jcflorezv.unfaya.easyauth.repositories;

import com.jcflorezv.unfaya.easyauth.entities.Employee;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long> {

}