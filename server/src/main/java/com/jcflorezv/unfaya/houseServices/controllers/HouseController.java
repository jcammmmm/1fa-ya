package com.jcflorezv.unfaya.houseServices.controllers;

import com.jcflorezv.unfaya.houseServices.models.House;
import com.jcflorezv.unfaya.houseServices.models.User;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HouseController {
  
  @GetMapping("/houses/my")
  public House currentUserHouseData() {
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return user.getHouse();
  }
} 