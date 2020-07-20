package com.jcflorezv.unfaya.houseServices.controllers;

import com.jcflorezv.unfaya.houseServices.models.Service;
import com.jcflorezv.unfaya.houseServices.services.ServiceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServiceController {
  @Autowired
  private ServiceService serviceService;
 
 
  @GetMapping("/services")
  public PagedModel<EntityModel<Service>> findAllPaginated(Pageable paging) {
    PagedModel<EntityModel<Service>> svcs = serviceService.findAllPaginated(paging);
    return svcs;
  }

}