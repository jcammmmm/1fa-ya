package com.jcflorezv.unfaya.houseServices.controllers;

import java.util.List;

import com.jcflorezv.unfaya.houseServices.models.Service;
import com.jcflorezv.unfaya.houseServices.services.ServiceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServiceController {
  @Autowired
  private ServiceService serviceService;
 
 
  @GetMapping("/services")
  public List<Service> findAllServices(@RequestParam(defaultValue = "0") Integer pageNum,
                                       @RequestParam(defaultValue = "5") Integer pageSize,
                                       @RequestParam(defaultValue = "id") String sortBy) {
    List<Service> svcs = serviceService.findAll(pageNum, pageSize, sortBy);
    return svcs;
  }

}