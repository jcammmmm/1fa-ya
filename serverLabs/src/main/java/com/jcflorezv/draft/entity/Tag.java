package com.jcflorezv.draft.entity;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
public class Tag {

  @Id
  @Getter
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Getter
  @Setter
  private String name;

  @Getter
  @ManyToMany(
    mappedBy = "tags"
  )
  @JsonIgnore
  private Set<Service> services = new HashSet<>();

  public Tag(String name) { this.name = name; }

  @Override
  public boolean equals(Object o) {
      if (this == o)
          return true;
           
      if (!(o instanceof Tag))
          return false;
       
      Tag tag = (Tag) o;
      return Objects.equals(name, tag.name);
  }

  @Override
  public int hashCode() {
      return Objects.hash(name);
  }
}