package com.jcflorezv.draft.entity;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
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

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Service {

  @Id
  @Getter
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
  @JsonIgnore
  private House house;

  @Getter
  @OneToMany(
    fetch = FetchType.LAZY,
    mappedBy = "service",
    cascade = CascadeType.ALL
  )
  private List<Phonenumber> phonenumbers = new LinkedList<>();

  @Getter
  @OneToMany(
    fetch = FetchType.LAZY,
    mappedBy = "service",
    cascade = CascadeType.ALL
  )
  private List<Photo> photos = new LinkedList<>();

  @Getter
  @Setter
  @ManyToMany(
    cascade = {CascadeType.PERSIST, CascadeType.MERGE}
  )
  @JoinTable(
    joinColumns = @JoinColumn(name = "service_id"),
    inverseJoinColumns = @JoinColumn(name = "tag_id")
  )
  private Set<Tag> tags = new HashSet<>();

  public void setPhonenumbers(List<Phonenumber> phonenumbers) {
    // since this is a setter method we clean the field and set 
    // to a new one. Here we clear the field carefully, removing the phonenumber's
    // parent link and clearing the phonenumber list.
    this.phonenumbers.forEach(phonenumber -> phonenumber.setService(null)); 
    this.phonenumbers.clear();

    // Then we add the phone numbers using the hibernate sync method addPhone.
    phonenumbers.forEach(this::addPhoneNumber);
  }

  public void addPhoneNumber(Phonenumber phonenumber) {
    this.phonenumbers.add(phonenumber);
    phonenumber.setService(this);
  }

  public void removePhonenumber(Phonenumber phonenumber) {
    this.phonenumbers.remove(phonenumber);
    phonenumber.setService(null);
  }
  
  public void addTag(Tag tag) {
    tags.add(tag);
    tag.getServices().add(this);
  }

  public void removeTag(Tag tag) {
      tags.remove(tag);
      tag.getServices().remove(this);
  }

  public void setPhotos(List<Photo> photos) {
    // since this is a setter method we clean the field and set 
    // to a new one. Here we clear the field carefully, removing the phonenumber's
    // parent link and clearing the phonenumber list.
    this.photos.forEach(photo -> photo.setService(null)); 
    this.photos.clear();

    // Then we add the phone numbers using the hibernate sync method addPhone.
    photos.forEach(this::addPhoto);
  }

  public void addPhoto(Photo photo) {
    photos.add(photo);
    photo.setService(this);
  }

  public void removePhoto(Photo photo) {
    photos.remove(photo);
    photo.setService(null);
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