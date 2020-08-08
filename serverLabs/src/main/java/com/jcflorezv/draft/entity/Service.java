package com.jcflorezv.draft.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
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
  @ManyToOne
  private House house;
}