package com.jcflorezv.unfaya.houseServices.controllers;

import com.jcflorezv.unfaya.houseServices.models.HomeUser;
import com.jcflorezv.unfaya.houseServices.models.Auth.AuthenticationRequest;
import com.jcflorezv.unfaya.houseServices.models.Auth.AuthenticationResponse;
import com.jcflorezv.unfaya.houseServices.services.UserService;
import com.jcflorezv.unfaya.houseServices.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserService userService;

  @Autowired
  JwtUtil jwtUtil;
  
  @GetMapping("/auth")
  public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
      throws Exception {
    try {
      authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
      );
    } catch (AuthenticationException e) { 
      throw new Exception("Incorrect username or password.");
    }

    final HomeUser user = userService.loadUserByUsername(authenticationRequest.getUsername());
    final String jwt = jwtUtil.generateToken(user);
    return ResponseEntity.ok(new AuthenticationResponse(jwt));
  }
}