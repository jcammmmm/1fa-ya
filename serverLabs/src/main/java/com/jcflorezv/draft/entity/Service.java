package com.jcflorezv.draft.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@AllArgsConstructor
public class Service {

  @Id
  @Getter
  @JsonIgnore
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Getter
  @Setter
  private String name;

  @Getter
  @Setter
  @ManyToOne(
    fetch = FetchType.LAZY
  )
  private House house;

  public Service(String name, House house) {
    this.name = name;
    this.house = house; 
  }

  @Override
  public boolean equals(Object o) {
      if (this == o)
          return true;
           
      if (!(o instanceof Service))
          return false;
           
      return
          id != null && id.equals(((Service) o).getId());
  }
  
  @Override
  public int hashCode() {
      return 31;
  }
}