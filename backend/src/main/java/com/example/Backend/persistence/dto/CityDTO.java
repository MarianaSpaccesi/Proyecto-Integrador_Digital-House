package com.example.Backend.persistence.dto;

import lombok.*;
import org.springframework.boot.context.properties.ConstructorBinding;

@Data
@NoArgsConstructor @AllArgsConstructor
public class CityDTO {

    private Integer id;
    private String city;
    private String province;
    private String country;
    public CityDTO(Integer id) {
        this.id = id;
    }
}

