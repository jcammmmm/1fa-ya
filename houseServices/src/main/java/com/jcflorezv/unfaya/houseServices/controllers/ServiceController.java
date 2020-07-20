package com.jcflorezv.unfaya.houseServices.controllers;

import java.util.List;

import com.jcflorezv.unfaya.houseServices.models.Service;
import com.jcflorezv.unfaya.houseServices.repositories.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServiceController {
  @Autowired
  private ServiceRepository serviceRepo;
 
 
  @GetMapping("/services")
  public List<Service> findAllServices() {
    List<Service> svcs = serviceRepo.findAll();
    return svcs;
  }

}