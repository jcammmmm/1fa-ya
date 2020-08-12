package com.jcflorezv.draft.repository;

import javax.persistence.Cacheable;

import com.jcflorezv.draft.entity.Tag;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface TagRepository extends CrudRepository<Tag, Long> {
  
}