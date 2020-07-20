package com.jcflorezv.draft;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

public class User {
  public User(int i, String string) {
    this.id = i;
    this.name = string;
    this.userItems = new ArrayList<Item>();
  }

  public int id;
  public String name;
  
  @JsonBackReference
  public List<Item> userItems;

  public void addItem(Item item) {
    this.userItems.add(item);
  }
}