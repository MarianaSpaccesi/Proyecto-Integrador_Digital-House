package com.example.Backend.service.impl;

import com.example.Backend.persistence.entities.AppUser;
import com.example.Backend.persistence.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class SecurityUserService implements UserDetailsService {
    @Autowired
    AppUserRepository appUserRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = appUserRepository.findByUsername(username);
        if(user != null) {
            log.info("User found in the database");
        } else {
            log.error("No associated user to the email: {}", username);
            throw new UsernameNotFoundException("User not found");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        // Adds our business roles as authorities of spring security
        user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));
        // Notice this is returning User not AppUser
        return new User(user.getUsername(), user.getPassword(), authorities);
    }
}
