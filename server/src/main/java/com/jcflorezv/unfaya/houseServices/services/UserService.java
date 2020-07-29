package com.jcflorezv.unfaya.houseServices.services;

import com.jcflorezv.unfaya.houseServices.models.User;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

  @Override
  public User loadUserByUsername(String userName) throws UsernameNotFoundException {
    return new User("user", "pass");
  }

}