package com.example.Backend.persistence.repository;

import com.example.Backend.persistence.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository <AppUser, Integer> {
    AppUser findByUsername(String username);
}
