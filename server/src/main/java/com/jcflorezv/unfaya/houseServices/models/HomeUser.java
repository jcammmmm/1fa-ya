package com.jcflorezv.unfaya.houseServices.models;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.Setter;

public class HomeUser implements UserDetails {

  private static final long serialVersionUID = 1213659374143541774L;

  @Setter
  private String userName;

  @Getter
  @Setter
  private String password;

  @Getter
  @Setter
  private Long houseId;

  public HomeUser(String userName, String pwd) {
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