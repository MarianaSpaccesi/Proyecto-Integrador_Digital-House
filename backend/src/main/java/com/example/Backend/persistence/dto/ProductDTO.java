package com.example.Backend.persistence.dto;

import java.util.Set;

import lombok.*;
@Data
@NoArgsConstructor @AllArgsConstructor
public class ProductDTO {

    private Integer id;
    private String title;
    private Double latitude;
    private Double length;
    private String description;
    private String availability;
    private String politics;
    private Double price;
    private CategoryDTO category;
    private CityDTO city;
    private Set<ImageDTO> images;
    private Set<FeatureDTO> features;


}

