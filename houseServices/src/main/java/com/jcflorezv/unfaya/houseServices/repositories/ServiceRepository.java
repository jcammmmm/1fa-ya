package com.jcflorezv.unfaya.houseServices.repositories;

import com.jcflorezv.unfaya.houseServices.models.Service;

import org.springframework.data.repository.Repository;

public interface ServiceRepository extends Repository<Service, Long> {
  Service save(Service service);
  Service findById(Long id);
}