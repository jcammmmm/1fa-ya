package com.jcflorezv.draft.controller;

import java.util.LinkedList;
import java.util.List;

import com.jcflorezv.draft.entity.Service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServiceController {

    @PostMapping("/services")
    public Service createService(@RequestBody Service service) {
        return service;
    }

    @GetMapping("/services")
    public List<Service> getServices() {
      List<Service> services = new LinkedList<>();
      return services;
    }
}