package com.jcflorezv.unfaya.houseServices;

import java.util.Arrays;

import javax.transaction.Transactional;

import com.jcflorezv.unfaya.houseServices.models.House;
import com.jcflorezv.unfaya.houseServices.models.Service;
import com.jcflorezv.unfaya.houseServices.models.Tag;
import com.jcflorezv.unfaya.houseServices.models.User;
import com.jcflorezv.unfaya.houseServices.repositories.HouseRepository;
import com.jcflorezv.unfaya.houseServices.repositories.ServiceRepository;
import com.jcflorezv.unfaya.houseServices.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

  private final HouseRepository hrepo;
  private final ServiceRepository srepo;
  private final UserRepository urepo;

  @Autowired
  public DatabaseLoader(HouseRepository hrepo, ServiceRepository srepo, UserRepository urepo) {
    this.hrepo = hrepo;
    this.srepo = srepo;
    this.urepo = urepo;
  }

  @Override
  @Transactional // https://stackoverflow.com/questions/40247030/detached-entity-passed-to-persist-in-spring-data
  public void run(String... args) throws Exception {

    User user1 = new User("user1", "pass1");
    User user2 = new User("user2", "pass2");
    User user3 = new User("user3", "pass3");

    House house1 = new House();
    House house2 = new House();
    House house3 = new House();
    
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
    
    house1.setServices(Arrays.asList(svcs[0], svcs[1], svcs[2]));
    house2.setServices(Arrays.asList(svcs[3], svcs[4], svcs[5]));
    house3.setServices(Arrays.asList(svcs[6], svcs[7], svcs[8]));

    user1.setHouse(house1);
    user2.setHouse(house2);
    user3.setHouse(house3);
    
    urepo.save(user1);
    urepo.save(user2);
    urepo.save(user3);
  }
  
}