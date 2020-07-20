package com.jcflorezv.unfaya.houseServices.models;

import java.util.HashSet;
import java.util.Objects;
import java.util.Random;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

import org.hibernate.annotations.NaturalId;

import lombok.Getter;
import lombok.Setter;

@Entity
public class Tag {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Getter @Setter private Long id;

  @NaturalId
  @Getter @Setter private String name;

  @ManyToMany(mappedBy = "tags")
  @JsonBackReference
  @Getter @Setter private Set<Service> services = new HashSet<>(); // https://vladmihalcea.com/the-best-way-to-use-the-manytomany-annotation-with-jpa-and-hibernate/

  public Tag() {
    Random rnd = new Random();
    this.name = "rnd_tag_name_" + rnd.nextInt(999);
  }

  @Override
  public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      Tag tag = (Tag) o;
      return Objects.equals(name, tag.name);
  }

  @Override
  public int hashCode() {
      return Objects.hash(name);
  }
}