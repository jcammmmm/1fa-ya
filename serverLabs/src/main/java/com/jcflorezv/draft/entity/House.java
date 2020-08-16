package com.jcflorezv.draft.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})  // TODO: read about this
public class House {

  @Id
  @Getter
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Getter
  @Setter
  @Column(unique = true)
  private String address;

  @Getter
  @OneToMany(
    mappedBy = "house",
    fetch = FetchType.LAZY
  )
  @JsonIgnore
  private List<Service> services;

  public void addService(Service service) {
    this.services.add(service);
    service.setHouse(this);
  }

  public void removeService(Service service) {
    services.remove(service);
    service.setHouse(null);
  }
}