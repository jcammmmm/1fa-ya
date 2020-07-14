package com.jcflorezv.unfaya.houseServices.controllers;

import com.jcflorezv.unfaya.houseServices.repositories.HouseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
public class HouseController {

  @Autowired
  private HouseRepository houseRepo;


} 