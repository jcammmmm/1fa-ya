package com.jcflorezv.unfaya.houseServices.services;

import com.jcflorezv.unfaya.houseServices.models.HomeUser;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

  @Override
  public HomeUser loadUserByUsername(String userName) throws UsernameNotFoundException {
    return new HomeUser("user", "pass");
  }

}