package com.jcflorezv.unfaya.easyauth.controller;

import com.jcflorezv.unfaya.easyauth.entities.AuthAddress;
import com.jcflorezv.unfaya.easyauth.repositories.AuthAddressRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
public class AuthController {

  @Autowired
  AuthAddressRepository addrRepo;
  
  @GetMapping("uniqueIDAuth")
  public AuthAddress uniqueSHAIdAuth(@RequestParam String addrSHA) {
    AuthAddress addr = addrRepo.findBySha(addrSHA).orElse(new AuthAddress());
    return addr;
  }

  @PostMapping("otpAuth")
  public ResponseEntity<String> otpAuth(@RequestBody String str) {
    return new ResponseEntity<String>(str, HttpStatus.OK);
  }

  @GetMapping("getAuthAddr")
  public AuthAddress getAuthAddress(@RequestParam Long id) {
    return addrRepo.findById(id).get();
  }
}