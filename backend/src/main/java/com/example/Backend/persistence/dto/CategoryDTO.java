package com.example.Backend.persistence.dto;

import lombok.*;

@Data
@NoArgsConstructor @AllArgsConstructor
public class CategoryDTO {

    private Integer id;
    private String title;
    private String description;
    private String urlImage;

}
