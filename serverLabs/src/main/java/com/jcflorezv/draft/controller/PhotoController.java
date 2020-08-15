package com.jcflorezv.draft.controller;

import java.util.LinkedList;
import java.util.List;

import com.jcflorezv.draft.entity.Photo;
import com.jcflorezv.draft.repository.PhotoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PhotoController {
  
  @Autowired
  PhotoRepository photoRepository;


  @GetMapping("/photos")
  public List<Photo> allServicePhotos() {
    List<Photo> servicesAlbum = new LinkedList<>();
    photoRepository.findAll().forEach(servicesAlbum::add);
    return servicesAlbum;
  }
}