package com.jcflorezv.unfaya.easyauth.controller;

import com.jcflorezv.unfaya.easyauth.entities.AuthAddress;
import com.jcflorezv.unfaya.easyauth.repositories.AuthAddressRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

  @Autowired
  AuthAddressRepository addrRepo;
  
  @GetMapping("uniqueIDAuth")
  public AuthAddress uniqueSHAIdAuth(@RequestParam String addrSHA) {
    AuthAddress addr = addrRepo.findBySha(addrSHA).orElse(new AuthAddress());
    return addr;
  }

  @GetMapping("getAuthAddr")
  public AuthAddress getAuthAddress(@RequestParam Long id) {
    return addrRepo.findById(id).get();
  }
}