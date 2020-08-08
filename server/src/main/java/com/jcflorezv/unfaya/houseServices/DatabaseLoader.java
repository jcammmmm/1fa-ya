package com.jcflorezv.unfaya.houseServices;

import java.util.ArrayList;
import java.util.Arrays;
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

  private void storeEverythingElse() {

    Random rnd = new Random();
    ArrayList<String> tagNames = getTagNames();

    User user1 = new User("user" + rnd.nextInt(999999), "pass");
    User user2 = new User("user" + rnd.nextInt(999999), "pass");
    User user3 = new User("user" + rnd.nextInt(999999), "pass");

    House house1 = new House();
    House house2 = new House();
    House house3 = new House();
  
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

    for(Service s : svcs)
      srepo.save(s);
    
    house1.setServices(Arrays.asList(svcs[0], svcs[1], svcs[2]));
    house2.setServices(Arrays.asList(svcs[3], svcs[4], svcs[5]));
    house3.setServices(Arrays.asList(svcs[6], svcs[7], svcs[8]));

    house1.setUser(user1);
    house2.setUser(user2);
    house3.setUser(user3);

    hrepo.save(house1);
    hrepo.save(house2);
    hrepo.save(house3);
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
  
}