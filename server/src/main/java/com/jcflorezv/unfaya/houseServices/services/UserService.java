package com.jcflorezv.unfaya.houseServices.services;

import java.util.List;

import com.jcflorezv.unfaya.houseServices.models.User;
import com.jcflorezv.unfaya.houseServices.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

  @Autowired
  UserRepository userRepo;

  @Override
  public User loadUserByUsername(String username) throws UsernameNotFoundException {
    List<User> result = userRepo.findByUsername(username);
    if (result.size() == 0) {
      return new User();
    } else {
      return result.get(0);
    }
  }

}