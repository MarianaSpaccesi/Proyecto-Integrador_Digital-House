package com.example.Backend.persistence.entities;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@Entity
@Data
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {

    @Id @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    @NotNull(message = "name should not be empty")
    @Min(value = 1, message = "name should be at least 1 character long")
    @Max(64)
    private String name;
    @NotNull(message = "lastname should not be empty")
    @Min(value = 1, message = "lastname should be at least 1 character long")
    @Max(64)
    private String lastname;
    @Email
    @NotNull(message = "username must be a valid email")
    @Min(value = 6, message = "email should be at least 6 character long")
    @Max(64)
    private String username;
    @NotNull(message = "password should not be shorter than 6 not longer than 64")
    @Min(6)
    @Max(64)
    private String password;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;
    @ManyToMany
    @JoinColumn(name="rol_id")
    private Collection<Role> roles;
}
