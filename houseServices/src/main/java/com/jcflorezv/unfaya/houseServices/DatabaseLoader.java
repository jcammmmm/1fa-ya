package com.jcflorezv.unfaya.houseServices;

import java.util.Arrays;

import com.jcflorezv.unfaya.houseServices.models.House;
import com.jcflorezv.unfaya.houseServices.models.Service;
import com.jcflorezv.unfaya.houseServices.repositories.HouseRepository;
import com.jcflorezv.unfaya.houseServices.repositories.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

  private final HouseRepository hrepo;
  private final ServiceRepository srepo;

  @Autowired
  public DatabaseLoader(HouseRepository hrepo, ServiceRepository srepo) {
    this.hrepo = hrepo;
    this.srepo = srepo;
  }

  @Override
  public void run(String... args) throws Exception {
    hrepo.save(new House(Arrays.asList(new Service(), new Service(), new Service())));
    hrepo.save(new House(Arrays.asList(new Service(), new Service(), new Service())));
    hrepo.save(new House(Arrays.asList(new Service(), new Service(), new Service())));
  }
  
}