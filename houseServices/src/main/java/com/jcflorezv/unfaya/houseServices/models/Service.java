package com.jcflorezv.unfaya.houseServices.models;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.Setter;
import me.xdrop.jrand.JRand;

@Entity
public class Service {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Getter @Setter private Long id;
  @Getter @Setter private String name;         // e.g. 'Corte de Cabello'
  @Getter @Setter private String description; // e.g. 'Se realizan cortes de cabello para las personas del sector...'
  @Getter @Setter private Integer avgStar;
  @Getter @Setter private Integer timesServed;
  @Getter @Setter private Integer hitCount;
  @Getter @Setter private Integer price;
  @Getter @Setter private String units;
  @Getter @Setter private Boolean publishPrice;

  @ManyToOne (
    fetch = FetchType.EAGER
  )
  @JoinColumn(name = "house_id")
  @Getter @Setter private House house;

  @ManyToMany( cascade = {
    CascadeType.PERSIST,
    CascadeType.MERGE
  }, fetch = FetchType.LAZY )
  @JoinTable(
    name = "service_tag",
    joinColumns = @JoinColumn(name = "service_id"),
    inverseJoinColumns = @JoinColumn(name = "tag_id")
  )
  @JsonManagedReference
  @Getter @Setter private Set<Tag> tags = new HashSet<>(); // https://vladmihalcea.com/the-best-way-to-use-the-manytomany-annotation-with-jpa-and-hibernate/

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "service_id")
  @Getter @Setter private List<Photo> photos;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "service_id")
  @Getter @Setter private List<CellPhone> cellphones;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "service_id")
  @Getter @Setter private List<WebURI> webUris;

  public Service() {
    Random rnd = new Random();
    this.name = JRand.sentence().words(1,5).gen();
    this.description = JRand.sentence().words(10, 20).gen();
    this.avgStar = rnd.nextInt(5) + 1;
    this.timesServed = rnd.nextInt(200);
    this.hitCount = rnd.nextInt(2000);
    this.price = (int) (rnd.nextDouble() * 10000);
    this.units = "svcunit" + rnd.nextInt(999);
    this.publishPrice = rnd.nextBoolean();
    this.photos = Arrays.asList(new Photo(), new Photo(), new Photo());
    this.cellphones = Arrays.asList(new CellPhone(), new CellPhone(), new CellPhone());
    this.webUris = Arrays.asList(new WebURI(), new WebURI(), new WebURI());
  }

  // https://vladmihalcea.com/jpa-hibernate-synchronize-bidirectional-entity-associations/
  public void addTag(Tag tag) {
    tags.add(tag);
    tag.getServices().add(this);
  }

  public void removeTag(Tag tag) {
      tags.remove(tag);
      tag.getServices().remove(this);
  }

  @Override
  public boolean equals(Object o) {
      if (this == o) return true;
      if (!(o instanceof Service)) return false;
      return id != null && id.equals(((Service) o).getId());
  }

  @Override
  public int hashCode() {
      return 31;
  }
}