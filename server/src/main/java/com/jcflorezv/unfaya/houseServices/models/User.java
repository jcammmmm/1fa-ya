package com.jcflorezv.unfaya.houseServices.models;

import java.util.Arrays;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="\"User\"")
public class User implements UserDetails {

  @Transient
  private static final long serialVersionUID = 1213659374143541774L;

  @Id
  @Getter @Setter private Long id;
          @Setter private String userName;
  @Getter @Setter private String password;

  @OneToOne(fetch = FetchType.LAZY)
  @MapsId
  @Getter @Setter private House house;

  public User(String userName, String pwd) {
    this.userName = userName;
    this.password = pwd;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Arrays.asList();
  }

  @Override
  public String getUsername() {
    return this.userName;
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
}