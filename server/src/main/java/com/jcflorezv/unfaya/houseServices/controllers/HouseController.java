package com.jcflorezv.unfaya.houseServices.controllers;

import com.jcflorezv.unfaya.houseServices.models.House;
import com.jcflorezv.unfaya.houseServices.models.User;
import com.jcflorezv.unfaya.houseServices.repositories.HouseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HouseController {

  @Autowired
  private HouseRepository houseRepo;

  @GetMapping("/houses/my")
  public House currentUserHouseData() {
    User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return null;
  }
  
} 