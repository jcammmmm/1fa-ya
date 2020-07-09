package com.jcflorezv.unfaya.easyauth.repositories;

import java.util.List;
import java.util.Optional;

import com.jcflorezv.unfaya.easyauth.entities.AuthAddress;
import org.springframework.data.repository.CrudRepository;

public interface AuthAddressRepository extends CrudRepository<AuthAddress, Long> {
  Optional<AuthAddress> findById(Long id);
  Optional<AuthAddress> findBySha(String sha);
  List<AuthAddress> findAll();
}