package com.jcflorezv.draft.repository;

import com.jcflorezv.draft.entity.Photo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface PhotoRepository extends CrudRepository<Photo, Long> { }