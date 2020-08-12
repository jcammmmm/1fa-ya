package com.jcflorezv.draft;

import java.util.ArrayList;

import com.jcflorezv.draft.entity.House;
import com.jcflorezv.draft.entity.Tag;
import com.jcflorezv.draft.repository.HouseRepository;
import com.jcflorezv.draft.repository.TagRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

  @Autowired
  HouseRepository houseRepository;

  @Autowired
  TagRepository tagRepository;

  public void run(String... args) {
    House house1 = new House();
    house1.setAddress("Cr 81 B # 56 A 65");

    houseRepository.save(house1);

    for(String name : getTagNames()) {
      tagRepository.save(new Tag(name));
    }
  }


  private static ArrayList<String> getTagNames() {
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