package com.jcflorezv.unfaya.entities;

import java.io.Serializable;
import java.util.Random;

public class Address implements Serializable {
    private static final long serialVersionUID = 7956981289761781527L;
    
    public String way; // Cll
    public Integer main;       // 28
    public char    letter;     // C 
    public Integer intersect;  // 32
    public Integer position;   // 73
    public Boolean bis;        // 
    public Boolean sur;  

    /**
     * Instantiates a random Address
     */
    public Address() {
      String[] ways = {"Cl", "Cr", "Dg", "Tr"};
      Random rnd = new Random();

      this.way = ways[rnd.nextInt(ways.length)];
      this.main = rnd.nextInt(200) + 1;
      this.letter = (char) (rnd.nextInt(25) + 65);
      this.intersect = rnd.nextInt(100) + 1;
      this.position = rnd.nextInt(80) + 1;
      this.bis = rnd.nextInt(2) == 1;
      this.sur = rnd.nextInt(2) == 1;     
    }
    
    public static void main(String[] args) {
      for(int i = 0; i < 100; i++) 
        System.out.println(new Address());

    }

    @Override
    public String toString() {
      return "Direccion: " + this.way + " " + 
      this.main + " " + 
      this.letter + " " + 
      this.intersect + " - " + 
      this.position + " " +
      // (this.bis ? "bis" : "") + " " +
      (this.sur ? "sur" : "");
    }
    

}