package com.jcflorezv.unfaya.houseServices.repositories;

import java.util.List;
import java.util.Optional;

import com.jcflorezv.unfaya.houseServices.models.Service;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface ServiceRepository extends PagingAndSortingRepository<Service, Long> {
  Service save(Service service);
  Optional<Service> findById(Long id);
  List<Service> findAll();
}