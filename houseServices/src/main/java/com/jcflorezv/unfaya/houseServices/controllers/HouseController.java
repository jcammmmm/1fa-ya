package com.jcflorezv.unfaya.houseServices.controllers;

import java.util.List;

import com.jcflorezv.unfaya.houseServices.models.Service;
import com.jcflorezv.unfaya.houseServices.repositories.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
public class HouseController {

  @Autowired
  private ServiceRepository serviceRepo;

  @GetMapping("/allServices")
  public List<Service> findAllServices() {
    List<Service> svcs = serviceRepo.findAll();
    return svcs;
  }

  @GetMapping("/firstService")
  public Service findFirstService() {
    Service svc = serviceRepo.findById(1L);
    return svc;
  }
} 