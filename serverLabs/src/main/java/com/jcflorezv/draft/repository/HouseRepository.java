package com.jcflorezv.draft.repository;

import com.jcflorezv.draft.entity.House;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "houses", path = "houses")
public interface HouseRepository extends PagingAndSortingRepository<House, Long> {
  
}