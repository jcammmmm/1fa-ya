package com.jcflorezv.unfaya.houseServices.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
public class House {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Getter @Setter private Long id;
  @Getter @Setter private String name;
  @Getter @Setter private String mainPhoto; // image url
  @Getter @Setter private String location;  // image url
  
  // https://vladmihalcea.com/the-best-way-to-map-a-onetomany-association-with-jpa-and-hibernate/
  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "house_id")
  private List<Service> services = new ArrayList<>();

  public House(List<Service> services) {
    Random rnd = new Random();
    this.name = "name" + rnd.nextInt(999);
    this.mainPhoto = "proto://cnd.uri/" + rnd.nextInt(999);
    this.location = "proto://map.uri/" + rnd.nextInt(999);
    this.services = services;
  }
}