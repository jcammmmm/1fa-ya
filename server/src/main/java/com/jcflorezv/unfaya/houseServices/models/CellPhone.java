package com.jcflorezv.unfaya.houseServices.models;

import java.util.Random;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
public class CellPhone {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Getter @Setter private Long id;
  @Getter @Setter private String number;

  public CellPhone() {
    Random rnd = new Random();
    this.number = 3 + "" + (rnd.nextInt(2)) + "" + (rnd.nextInt(2)) + "" + (rnd.nextInt(999999) + 1000000);
  }
}