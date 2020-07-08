package com.jcflorezv.unfaya.easyauth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
  
  @GetMapping("uniqueIDAuth")
  public Double getDouble(@RequestParam Double number) {
    return number;
  }
}