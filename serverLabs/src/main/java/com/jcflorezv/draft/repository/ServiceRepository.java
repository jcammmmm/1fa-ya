package com.jcflorezv.draft.repository;

import com.jcflorezv.draft.entity.Service;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface ServiceRepository extends CrudRepository<Service, Long> { }