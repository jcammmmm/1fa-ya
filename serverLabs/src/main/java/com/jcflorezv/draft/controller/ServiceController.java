package com.jcflorezv.draft.controller;

import java.lang.reflect.Field;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.jcflorezv.draft.dto.ServiceDto;
import com.jcflorezv.draft.entity.House;
import com.jcflorezv.draft.entity.Phonenumber;
import com.jcflorezv.draft.entity.Service;
import com.jcflorezv.draft.repository.HouseRepository;
import com.jcflorezv.draft.repository.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServiceController {

  @Autowired
  HouseRepository houseRepository;

  @Autowired
  ServiceRepository serviceRepository;

  /**
   * This method assumes that the underlying house related entity exists. This house
   * is obtained through the authentication context.
   * @param serviceDto
   * @return
   */
  @PostMapping("/services")
  public Service createService(@RequestBody Service service) {
    Long houseId = 3L; // getCurrentContext().getAuthentication().getPersonal().getHouse().getHouseId();
    // Optional<House> result = houseRepository.findById(houseId);
    // House house = result.get();
    House house = houseRepository.findAll().iterator().next();
    house.addService(service);

    return serviceRepository.save(service);
  }

  @GetMapping("/services")
  public List<Service> getServices() {
    List<Service> services = new LinkedList<>();
    serviceRepository.findAll().forEach(services::add);
    return services;
  }
  
  /**
   * Implement this using something like http://jsonpatch.com/.
   * https://github.com/kubernetes/kubernetes/issues/68861
   * The kubernetes API implementation is based on jsonpatch. Please refer to
   * https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#replace-cronjob-v1beta1-batch
   * https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#patch-v1-meta
   * @param id
   * @param updates
   * @return
   */
  @PatchMapping("/services/{id}")
  public Service modService(@PathVariable("id") Long id, @RequestBody Map<String, Object> updates) {
    Optional<Service> result = serviceRepository.findById(id);
    Service service = result.get();
    updates.forEach((k, v) -> {
      Field field = ReflectionUtils.findField(Service.class, k);
      field.setAccessible(true);
      switch (k) {
        case "name":
          // pass
          break;
        case "phonenumbers":
          break;
        default:
          break;
      }

      ReflectionUtils.setField(field, service, v);
    });
    return serviceRepository.save(service);
  }

  @PutMapping("/services/{id}")
  public Service repService(@PathVariable("id") Long id, @RequestBody Service newService) {
    Service oldService = serviceRepository.findById(id).get();
    Service updatedService = oldService.updateService(newService);  
    return serviceRepository.save(updatedService);
  }

  @GetMapping("/services/{id}/house") 
  public House getHouse(@PathVariable("id") Long serviceId) {
    Optional<Service> result = serviceRepository.findById(serviceId);
    House house = result.get().getHouse();
    return house;
  }

}