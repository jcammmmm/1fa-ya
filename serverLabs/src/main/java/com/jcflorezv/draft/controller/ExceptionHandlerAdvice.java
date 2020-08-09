package com.jcflorezv.draft.controller;

import java.util.NoSuchElementException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerAdvice {
  
  @ExceptionHandler(NoSuchElementException.class)
  public ResponseEntity<?> handleException(NoSuchElementException esee) {
    return ResponseEntity
              .status(501)
              .body("No entity was found." + esee.toString());
  }
}