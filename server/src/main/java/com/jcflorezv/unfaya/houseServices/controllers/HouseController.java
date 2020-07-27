package com.jcflorezv.unfaya.houseServices.controllers;

import java.util.List;
import java.util.Optional;

import com.jcflorezv.unfaya.houseServices.models.Service;
import com.jcflorezv.unfaya.houseServices.repositories.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HouseController {

  @Autowired
  private ServiceRepository serviceRepo;
  
  // TODO Replace this by House entities
  @GetMapping("/allServices")
  public List<Service> findAllServices() {
    List<Service> svcs = serviceRepo.findAll();
    return svcs;
  }
  
  // TODO Replace this by House entities
  @GetMapping("/firstService")
  public Service findFirstService() {
    Optional<Service> svc = serviceRepo.findById(1L);
    return svc.get();
  }
} 