package com.jcflorezv.unfaya.houseServices.models;

import java.util.Random;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
public class Service {

  @Id @GeneratedValue
  @Getter @Setter private Long id;
  @Getter @Setter private String name;        // e.g. 'Corte de Cabello'
  @Getter @Setter private String description; // e.g. 'Se realizan cortes de cabello para las personas del sector...'

  public Service() {
    Random rnd = new Random();
    this.name = "svcname" + rnd.nextInt(999);
    this.description = "svcdescr" + rnd.nextInt(999);
  }
}