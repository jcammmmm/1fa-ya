package com.jcflorezv.draft.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
public class Phonenumber {

  @Id
  @Getter
  @GeneratedValue(strategy = GenerationType.AUTO)
  @JsonIgnore
  private Long id;

  @Getter
  @Setter
  private String number;

  @Getter
  @Setter
  @ManyToOne(
    fetch = FetchType.LAZY
  )
  @JsonIgnore
  private Service service;

  @Override
  public boolean equals(Object o) {
    if (o == this)
      return true;

    if (!(o instanceof Service))
      return false;

    return id != null && id.equals(((Service) o).getId());
  }

  @Override
  public int hashCode() {
    return 31;
  }
}