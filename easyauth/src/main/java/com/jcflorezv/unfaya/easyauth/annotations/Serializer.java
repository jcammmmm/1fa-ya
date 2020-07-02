package com.jcflorezv.unfaya.easyauth.annotations;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

public class Serializer {
  private void checkIfSerializable(Object obj) throws JsonSerializationException {
    if (Objects.isNull(obj)) {
      throw new JsonSerializationException("The object intended to serialize is null!");
    }

    Class<?> cls = obj.getClass();
    if (!cls.isAnnotationPresent(JsonSerializable.class)) {
      throw new JsonSerializationException("The provided class " + cls.getSimpleName() + " is not annotated with the JsonSerializable annotation!");
    }
  }

  private void initializeObject(Object obj) throws  IllegalAccessException, IllegalArgumentException, InvocationTargetException {
    Class<?> cls = obj.getClass();
    for(Method mthd : cls.getDeclaredMethods()) {
      if(mthd.isAnnotationPresent(Init.class)) {
        mthd.setAccessible(true);
        mthd.invoke(obj);
      }
    }
  }

  private String getJsonString(Object o) throws IllegalArgumentException, IllegalAccessException {
    Class<?> c = o.getClass();
    Map<String, String> jsonTransliteration = new HashMap<>();
    for(Field f : c.getDeclaredFields()) {
      f.setAccessible(true);
      if(f.isAnnotationPresent(JsonElement.class)) {
        jsonTransliteration.put(getKey(f), (String) f.get(o));
      }
    }

    String jsonString = jsonTransliteration.entrySet()
                            .stream()
                            .map(entry -> "\"" + entry.getKey() + "\":\"" + entry.getValue() + "\"")
                            .collect(Collectors.joining(","));
    return "{" + jsonString + "}";
  }

  private String convertToJson(Object o) {
    String json = "";
    try {
      checkIfSerializable(o);
      initializeObject(o);
      json = getJsonString(o);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return json;
  }

  private String getKey(Field field) {
    String value = field.getAnnotation(JsonElement.class)
        .key();
    return value.isEmpty() ? field.getName() : value;
  }
  
  public static void main(String[] args) {
    Person p = new Person();
    p.setAddress("122341234");
    p.setAge("34");
    p.setFirstName("juju");
    p.setLastName("jaja");

    Serializer s = new Serializer();

    System.out.println(s.convertToJson(p));
  }
}