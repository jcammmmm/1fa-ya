package com.jcflorezv.draft;

import static org.junit.Assert.assertTrue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.Test;

/**
 * Unit test for simple App.
 */
public class AppTest {
  /**
   * Rigorous Test :-)
   */
  @Test
  public void shouldAnswerWithTrue() {
    assertTrue(true);
  }

  @Test(expected = JsonMappingException.class)
  public static void givenBidirectionRelation_whenSerializing_thenException() throws JsonProcessingException {

    User user = new User(1, "John");
    Item item = new Item(2, "book", user);
    user.addItem(item);

    String str = new ObjectMapper().writeValueAsString(item);
    System.out.println(str);
  }

  public static void main(String[] args) throws JsonProcessingException {
    givenBidirectionRelation_whenSerializing_thenException();
  }
}
