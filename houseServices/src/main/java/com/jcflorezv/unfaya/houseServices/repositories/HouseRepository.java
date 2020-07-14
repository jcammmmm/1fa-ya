package com.jcflorezv.unfaya.houseServices.repositories;

import java.util.List;

import com.jcflorezv.unfaya.houseServices.models.House;

import org.springframework.data.repository.Repository;

public interface HouseRepository extends Repository<House, Long> {
  House save(House h);
  List<House> findAll();
  House findById(Long id);
}