package com.jcflorezv.unfaya.houseServices.models;

import java.util.Random;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
public class WebURI {
  
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Getter @Setter private Long id;
  @Getter @Setter private String uri;

  public WebURI() {
    Random rnd = new Random();
    this.uri = "rnd://url.content/" + rnd.nextInt(999);
  }
}