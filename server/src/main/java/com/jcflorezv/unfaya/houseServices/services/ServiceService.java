package com.jcflorezv.unfaya.houseServices.services;

import com.jcflorezv.unfaya.houseServices.models.Service;
import com.jcflorezv.unfaya.houseServices.repositories.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;

@org.springframework.stereotype.Service
public class ServiceService {
  @Autowired
  ServiceRepository serviceRepo;

  @Autowired
  PagedResourcesAssembler<Service> pagedResourcesAssembler;

  /**
   * https://www.baeldung.com/rest-api-pagination-in-spring Alternatively, we
   * could have used a Pageable object, which maps the page, size, and sort
   * parameters automatically
   * 
   * @param page
   * @param size
   * @param sort
   * @return
   */
  public PagedModel<EntityModel<Service>> findAllPaginated(Pageable paging) {
    Page<Service> services = serviceRepo.findAll(paging);
    PagedModel<EntityModel<Service>> servicesPaged = pagedResourcesAssembler.toModel(services);

    // if (pagedResult.hasContent()) {
    //   return pagedResult.getContent();
    // } else {
    //   return new ArrayList<Service>();
    // }}
    return servicesPaged;
  }
}