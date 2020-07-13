package com.jcflorezv.unfaya.houseServices.models;

import java.util.Random;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import lombok.Getter;
import lombok.Setter;

@Entity
public class Tag {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Getter @Setter private Long id;
  @Getter @Setter private String name;
  @ManyToMany(mappedBy = "tags")
  private Set<Service> services; // https://vladmihalcea.com/the-best-way-to-use-the-manytomany-annotation-with-jpa-and-hibernate/

  public Tag() {
    Random rnd = new Random();
    this.name = "rnd_tag_name_" + rnd.nextInt(999);
  }
}