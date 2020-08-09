package com.jcflorezv.draft.repository;

import com.jcflorezv.draft.entity.Service;

import org.springframework.data.repository.Repository;

public interface ServiceRepository extends Repository<Service, Long> {
  Service save(Service s);
}