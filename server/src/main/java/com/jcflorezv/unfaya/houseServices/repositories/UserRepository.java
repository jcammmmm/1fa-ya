package com.jcflorezv.unfaya.houseServices.repositories;

import com.jcflorezv.unfaya.houseServices.models.User;

import org.springframework.data.repository.Repository;

public interface UserRepository extends Repository<User, Long> {
  User save(User u);
}