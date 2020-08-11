package com.jcflorezv.draft.controller;

import java.lang.reflect.Field;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.jcflorezv.draft.entity.House;
import com.jcflorezv.draft.repository.HouseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HouseController {
  @Autowired
  HouseRepository houseRepository;

  @GetMapping("/houses")
  public List<House> allHouse() {
    List<House> result = new LinkedList<>();
    houseRepository.findAll().forEach(result::add);
    return result;
  }

  /**
   * TODO: 
   * This must be performed by an authorized user
   *
   * - We do not allow repeated houses by address. Address in house is an unique
   *   constraint.
   * @param house
   * @return
   */
  @PostMapping("/houses")
  public House newHouse(@RequestBody House house) {
    return houseRepository.save(house);
  }

  /**
   * TODO:
   * Handle NoSuchElementException here please...
   * Handle the null when field is not found...
   * @param id
   * @param updates
   * @return
   */
  @PatchMapping("/houses/{id}")
  public House modHouse(@PathVariable("id") Long id, @RequestBody Map<String, Object> updates) {
    Optional<House> result = houseRepository.findById(id);
    House house = result.get();

    updates.forEach((k, v) -> {
      Field field = ReflectionUtils.findField(House.class, k);
      field.setAccessible(true);
      ReflectionUtils.setField(field, house, v);
    });

    return houseRepository.save(house);
  }

  /**
   * TODO: 
   * This must be performed by an authorized user
   *
   * @param id
   * @return
   */
  @DeleteMapping("/houses/{id}")
  public void delHouse(@PathVariable("id") Long id) {
    houseRepository.deleteById(id);
  }
}