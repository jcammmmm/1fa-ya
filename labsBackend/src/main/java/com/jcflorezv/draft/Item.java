package com.jcflorezv.draft;

import com.fasterxml.jackson.annotation.JsonManagedReference;

public class Item {
  public Item(int i, String string, User user) {
    this.id = i;
    this.itemName = string;
    this.owner = user;
  }

  public int id;
  public String itemName;

  @JsonManagedReference
  public User owner;
}