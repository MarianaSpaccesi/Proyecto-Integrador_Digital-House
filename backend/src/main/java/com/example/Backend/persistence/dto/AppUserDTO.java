package com.example.Backend.persistence.dto;

import com.example.Backend.persistence.entities.Role;
import lombok.*;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppUserDTO {
    private Integer id;
    private String name;
    private String lastname;
    private String username;
    private String password;
    private CityDTO city;
    private Collection<Role> roles;
}
