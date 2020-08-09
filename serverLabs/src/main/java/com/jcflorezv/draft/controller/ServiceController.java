package com.jcflorezv.draft.controller;

import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import com.jcflorezv.draft.dto.ServiceDto;
import com.jcflorezv.draft.entity.House;
import com.jcflorezv.draft.entity.Service;
import com.jcflorezv.draft.repository.HouseRepository;
import com.jcflorezv.draft.repository.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServiceController {

  @Autowired
  HouseRepository houseRepository;

  @Autowired
  ServiceRepository serviceRepository;;

  @PostMapping("/services")
  public Service createService(@RequestBody ServiceDto serviceDto) {
    Optional<House> result = houseRepository.findById(serviceDto.getHouseId());
    House house = result.get();
    Service service = new Service(serviceDto.getName(), house);
    return serviceRepository.save(service);
  }

  @GetMapping("/services")
  public List<Service> getServices() {
    List<Service> services = new LinkedList<>();
    return services;
  }
}