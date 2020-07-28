package com.jcflorezv.unfaya.houseServices;

import java.util.Arrays;

import javax.transaction.Transactional;

import com.jcflorezv.unfaya.houseServices.models.House;
import com.jcflorezv.unfaya.houseServices.models.Service;
import com.jcflorezv.unfaya.houseServices.models.Tag;
import com.jcflorezv.unfaya.houseServices.repositories.HouseRepository;
import com.jcflorezv.unfaya.houseServices.repositories.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

// @Component
public class DatabaseLoader implements CommandLineRunner {

  private final HouseRepository hrepo;
  private final ServiceRepository srepo;

  @Autowired
  public DatabaseLoader(HouseRepository hrepo, ServiceRepository srepo) {
    this.hrepo = hrepo;
    this.srepo = srepo;
  }

  @Override
  @Transactional // https://stackoverflow.com/questions/40247030/detached-entity-passed-to-persist-in-spring-data
  public void run(String... args) throws Exception {
    // Service svc1 = new Service();
    // Service svc2 = new Service();

    // Tag tag1 = new Tag();
    // Tag tag2 = new Tag();

    // svc1.addTag(tag1);
    // svc1.addTag(tag2);
    // svc2.addTag(tag1);

    // srepo.save(svc1);
    // srepo.save(svc2);
    

    
    Tag tag1 = new Tag();
    Tag tag2 = new Tag();
    Tag tag3 = new Tag();

    Service[] svcs = new Service[9];
    for(int i = 0; i < svcs.length; i++) {
      svcs[i] = new Service();
      svcs[i].addTag(tag1);
      svcs[i].addTag(tag2);
      svcs[i].addTag(tag3);
    }

    for(Service s : svcs)
      srepo.save(s);
    
    
    hrepo.save(new House(Arrays.asList(svcs[0], svcs[1], svcs[2])));
    hrepo.save(new House(Arrays.asList(svcs[3], svcs[4], svcs[5])));
    hrepo.save(new House(Arrays.asList(svcs[6], svcs[7], svcs[8])));

    
  }
  
}