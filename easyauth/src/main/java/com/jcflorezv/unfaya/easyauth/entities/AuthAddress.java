package com.jcflorezv.unfaya.easyauth.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name = "address")
@Table(name = "address")
public class AuthAddress {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "\"ID\"")
  private long      id;
  private String    way;
  private int       main;
  private char      letter;
  private int       sub;
  private int       pos;
  private boolean   bis;
  private boolean   sur;
  private String    sha;
  private String    firstPwd;

  public AuthAddress() {}

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getWay() {
    return way;
  }

  public void setWay(String way) {
    this.way = way;
  }

  public int getMain() {
    return main;
  }

  public void setMain(int main) {
    this.main = main;
  }

  public char getLetter() {
    return letter;
  }

  public void setLetter(char letter) {
    this.letter = letter;
  }

  public int getSub() {
    return sub;
  }

  public void setSub(int sub) {
    this.sub = sub;
  }

  public int getPos() {
    return pos;
  }

  public void setPos(int pos) {
    this.pos = pos;
  }

  public boolean isBis() {
    return bis;
  }

  public void setBis(boolean bis) {
    this.bis = bis;
  }

  public boolean isSur() {
    return sur;
  }

  public void setSur(boolean sur) {
    this.sur = sur;
  }

  public String getSha() {
    return sha;
  }

  public void setSha(String sha) {
    this.sha = sha;
  }

  public String getFirstPwd() {
    return firstPwd;
  }

  public void setFirstPwd(String firstPwd) {
    this.firstPwd = firstPwd;
  }
}