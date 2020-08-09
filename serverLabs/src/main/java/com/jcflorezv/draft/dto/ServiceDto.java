package com.jcflorezv.draft.dto;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ServiceDto {
  private String name;
  private Long houseId;
  private List<Long> phones;
}