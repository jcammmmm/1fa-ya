package com.jcflorezv.draft.entity;

import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;

// @Entity
public class User {
  @Getter @Setter private String usename;
  @Getter @Setter private String password;
}