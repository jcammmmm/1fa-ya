package com.jcflorezv.unfaya.houseServices.models;

import java.util.Random;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
public class Photo {
  
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Getter @Setter private Long id;
  @Getter @Setter private String photoURL;

  public Photo() {
    Random rnd = new Random();
    this.photoURL = "rnd://url.photo/" + rnd.nextInt(999);
  }
}