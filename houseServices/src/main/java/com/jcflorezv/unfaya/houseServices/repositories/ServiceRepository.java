package com.jcflorezv.unfaya.houseServices.repositories;

import java.util.List;

import com.jcflorezv.unfaya.houseServices.models.Service;

import org.springframework.data.repository.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:8081")
public interface ServiceRepository extends Repository<Service, Long> {
  Service save(Service service);
  Service findById(Long id);
  List<Service> findAll();
}