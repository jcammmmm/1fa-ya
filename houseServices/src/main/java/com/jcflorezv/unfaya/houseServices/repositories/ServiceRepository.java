package com.jcflorezv.unfaya.houseServices.repositories;

import java.util.List;
import java.util.Optional;

import com.jcflorezv.unfaya.houseServices.models.Service;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin({ "http://localhost:8081", "http://127.0.0.1:5500" })
public interface ServiceRepository extends PagingAndSortingRepository<Service, Long> {
  Service save(Service service);
  Optional<Service> findById(Long id);
  List<Service> findAll();
}