package com.jcflorezv.draft;

import com.jcflorezv.draft.entity.House;
import com.jcflorezv.draft.repository.HouseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

  @Autowired
  HouseRepository houseRepository;

  public void run(String... args) {
    House house1 = new House();
    house1.setAddress("Cr 81 B # 56 A 65");

    houseRepository.save(house1);
  }
}