package com.jcflorezv.unfaya.houseServices.models;

import java.util.Arrays;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="\"User\"")
@NoArgsConstructor
public class User implements UserDetails {

  @Transient
  private static final long serialVersionUID = 1213659374143541774L;

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Getter @Setter private Long id;

  @Column(unique = true)
          @Setter private String username;
  @Getter @Setter private String password;

  @OneToOne(
    mappedBy = "user",
    cascade = CascadeType.ALL,
    fetch = FetchType.LAZY  
  )
  @JsonManagedReference 
  @Getter         private House house;

  public User(String username, String pwd) {
    this.username = username;
    this.password = pwd;
  }

  public User(String username, String password, House house) {
    this.username = username;
    this.password = password;
    this.house = house;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Arrays.asList();
  }

  @Override
  public String getUsername() {
    return this.username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public void setHouse(House house) {
    if (house == null) {
        if (this.house != null) {
            this.house.setUser(null);
        }
    }
    else {
        house.setUser(this);
    }
    this.house = house;
  }
}