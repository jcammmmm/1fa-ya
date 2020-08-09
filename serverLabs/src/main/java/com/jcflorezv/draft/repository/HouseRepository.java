package com.jcflorezv.draft.repository;

import com.jcflorezv.draft.entity.House;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface HouseRepository extends CrudRepository<House, Long> {
  
}