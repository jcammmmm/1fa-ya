package com.jcflorezv.unfaya.houseServices.services;

import java.util.ArrayList;
import java.util.List;

import com.jcflorezv.unfaya.houseServices.models.Service;
import com.jcflorezv.unfaya.houseServices.repositories.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@org.springframework.stereotype.Service
public class ServiceService {
  @Autowired
  ServiceRepository serviceRepo;

  /**
   * https://www.baeldung.com/rest-api-pagination-in-spring
   * Alternatively, we could have used a Pageable object, which maps the page, size, and sort parameters automatically
   * @param page
   * @param size
   * @param sort
   * @return
   */
  public List<Service> findAll(Integer page, Integer size, String sort) {
    Pageable paging = PageRequest.of(page, size, Sort.by(sort));
    Page<Service> pagedResult = serviceRepo.findAll(paging);

    if (pagedResult.hasContent()) {
      return pagedResult.getContent();
    } else {
      return new ArrayList<Service>();
    }
  }
}