package com.jcflorezv.draft.repository;

import com.jcflorezv.draft.entity.Tag;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface TagRepository extends CrudRepository<Tag, Long> {
  @Cacheable("tags")
  Iterable<Tag> findAll();
}