package com.jcflorezv.unfaya.houseServices;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import javax.transaction.Transactional;

import com.jcflorezv.unfaya.houseServices.models.House;
import com.jcflorezv.unfaya.houseServices.models.Service;
import com.jcflorezv.unfaya.houseServices.models.Tag;
import com.jcflorezv.unfaya.houseServices.models.User;
import com.jcflorezv.unfaya.houseServices.repositories.HouseRepository;
import com.jcflorezv.unfaya.houseServices.repositories.ServiceRepository;
import com.jcflorezv.unfaya.houseServices.repositories.TagRepository;
import com.jcflorezv.unfaya.houseServices.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

  @Autowired private HouseRepository hrepo;
  @Autowired private ServiceRepository srepo;
  @Autowired private UserRepository urepo;
  @Autowired private TagRepository trepo;

  @Override
  @Transactional // https://stackoverflow.com/questions/40247030/detached-entity-passed-to-persist-in-spring-data
  public void run(String... args) throws Exception {
    storeTags();
    storeUsersAndHouses();
    storeEverythingElse();    
  }

  /**
   * This method will be called on each restart, so we check if the wanted tags
   * already exists in database.
   */
  private void storeTags() {
    ArrayList<String> tagNames = getTagNames();

    for(String tagName : tagNames) {
      if (trepo.findByName(tagName) == null) { trepo.save(new Tag(tagName)); }
    }
  }

  private void storeUsersAndHouses() {
    User user1 = new User("user1", "pass");
    User user2 = new User("user2", "pass");
    User user3 = new User("user3", "pass");

    House house1 = new House();
    House house2 = new House();
    House house3 = new House();

    user1.setHouse(house1);
    user2.setHouse(house2);
    user3.setHouse(house3);
    
    urepo.save(user1);
    urepo.save(user2);
    urepo.save(user3);
  }

  private void storeEverythingElse() {

    Random rnd = new Random();
    ArrayList<String> tagNames = getTagNames();

    Tag tag1 = trepo.findByName(tagNames.get(rnd.nextInt(tagNames.size())));
    Tag tag2 = trepo.findByName(tagNames.get(rnd.nextInt(tagNames.size())));
    Tag tag3 = trepo.findByName(tagNames.get(rnd.nextInt(tagNames.size())));
  
    Service[] svcs = new Service[9];
    for(int i = 0; i < svcs.length; i++) {
      svcs[i] = new Service();
      svcs[i].addTag(tag1);
      svcs[i].addTag(tag2);
      svcs[i].addTag(tag3);
    }

    for(Service svc : svcs)
      srepo.save(svc);

    House house1 = hrepo.findById(1L);
    House house2 = hrepo.findById(2L);
    House house3 = hrepo.findById(3L);

    house1.addService(svcs[0]);
    house1.addService(svcs[1]);
    house1.addService(svcs[2]);
    house2.addService(svcs[3]);
    house2.addService(svcs[4]);
    house2.addService(svcs[5]);
    house3.addService(svcs[6]);
    house3.addService(svcs[7]);
    house3.addService(svcs[8]);
  }

  private ArrayList<String> getTagNames() {
    ArrayList<String> tagNames = new ArrayList<>();
    tagNames.add("Restauración Calzado");
    tagNames.add("Fabricación Calzado");
    tagNames.add("Calzado a la Medida");
    tagNames.add("Paseo Perros");
    tagNames.add("Ropa a la Medida");
    tagNames.add("Domicilios");
    tagNames.add("Mandado");
    tagNames.add("Voy haciendo fila");
    tagNames.add("Corresponsal Mammi");
    tagNames.add("Software a la Medida");
    tagNames.add("Arreglos Modistería");
    tagNames.add("Arreglos Computadores");
    tagNames.add("Arreglos Electrodomésticos");
    tagNames.add("Arreglos Mecánica");
    tagNames.add("Almuerzos");
    tagNames.add("Almuerzos Caseros");
    tagNames.add("Cocinar platos demás");
    tagNames.add("Cuidar Niños");
    tagNames.add("Carnicería");
    tagNames.add("Asesorías Metemáticas");
    tagNames.add("Asesorías Física");
    tagNames.add("Asesorías Química");
    tagNames.add("Asesorías Académicas");
    tagNames.add("Lavado Carros");
    tagNames.add("Conductor Taxi");
    tagNames.add("Conductor Plataforma");
    tagNames.add("Yoga");
    tagNames.add("Panadería");
    tagNames.add("Arreglo Bicicletas");
    tagNames.add("Aseo Casas");
    tagNames.add("Pintura Casas");
    tagNames.add("Fruver");
    tagNames.add("Arepas");
    tagNames.add("Arepas y Chorizos");
    tagNames.add("Comidas Rápidas");
    tagNames.add("Mango Biches");
    tagNames.add("Helados");
    tagNames.add("Fotocopias");
    tagNames.add("Servicio de abogado");
    tagNames.add("Ayuda Espiritual");
    tagNames.add("Alquilo Carro");
    tagNames.add("Alquilo Moto");
    tagNames.add("Asesoría Inglés");
    tagNames.add("Arreglos Eléctricos");
    tagNames.add("Instalaciones Eléctricas");
    tagNames.add("Ferretería");
    tagNames.add("Pañalera y Bebes");
    tagNames.add("Salsamentaria");
    tagNames.add("Pollería");
    tagNames.add("Pollos Asados");
    tagNames.add("Bar");
    tagNames.add("Rock");
    tagNames.add("Salsa");
    tagNames.add("Regge");
    tagNames.add("Sala de Ensayos");
    tagNames.add("Instructor Guitarra");
    tagNames.add("Instructor Piano");
    tagNames.add("Instructor Violín");
    tagNames.add("Ornamentación");
    tagNames.add("Acarreos");

    return tagNames;
  }
 
  private ArrayList<User> getSampleUsers() {
    ArrayList<User> users = new ArrayList<User>();
    users.add(new User());
    return users;
  }
}