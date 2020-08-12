package com.jcflorezv.draft.controller;

import java.util.LinkedList;
import java.util.List;

import com.jcflorezv.draft.entity.Tag;
import com.jcflorezv.draft.repository.TagRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TagController {
  @Autowired
  TagRepository tagRepository;

  @GetMapping("/tags")
  public List<Tag> allTags() {
    List<Tag> tags = new LinkedList<>();
    tagRepository.findAll().forEach(tags::add);
    return tags;
  }
}