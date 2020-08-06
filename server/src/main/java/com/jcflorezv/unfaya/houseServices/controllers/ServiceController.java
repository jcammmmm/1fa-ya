package com.jcflorezv.unfaya.houseServices.controllers;

import java.util.List;

import com.jcflorezv.unfaya.houseServices.models.Service;
import com.jcflorezv.unfaya.houseServices.models.Tag;
import com.jcflorezv.unfaya.houseServices.repositories.TagRepository;
import com.jcflorezv.unfaya.houseServices.services.ServiceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class ServiceController {
  @Autowired
  private ServiceService serviceService;

  @Autowired
  private TagRepository tagRepository;
 
 
  @GetMapping("/services")
  public PagedModel<EntityModel<Service>> findAllPaginated(Pageable paging) {
    PagedModel<EntityModel<Service>> svcs = serviceService.findAllPaginated(paging);
    return svcs;
  }

  /**
   * This method returns less boilerplate data than /tags
   * @return
   */
  @GetMapping("/services/tags")
  public List<Tag> getAllTags() {
    return tagRepository.findAll();
  }

}