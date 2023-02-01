package com.example.Backend.service.impl;

import com.example.Backend.config.ModelMapperConfig;
import com.example.Backend.persistence.dto.AppUserDTO;
import com.example.Backend.persistence.entities.AppUser;
import com.example.Backend.persistence.entities.Role;
import com.example.Backend.persistence.repository.AppUserRepository;
import com.example.Backend.persistence.repository.RoleRepository;
import com.example.Backend.service.AppUserServiceInterface;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.Backend.exceptions.ResourceNotFoundException;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class AppUserService implements AppUserServiceInterface {
    private final AppUserRepository appUserRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private ModelMapperConfig mapper;
    @Autowired
    private ObjectMapper obmapper;
    @Override
    public AppUserDTO addRoleToUser(String username, String roleName) throws ResourceNotFoundException {
        AppUser user = appUserRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        if(user!=null && role!=null) {
            log.info("Adding role {} to user {}.", roleName, username);
            user.getRoles().add(role);
            return mapper.getModelMapper().map(appUserRepository.save(user), AppUserDTO.class);
        } else {
            log.error("Failed to add role {} to user {}.", roleName, username);
            throw new ResourceNotFoundException("User or role not found");
        }

    }

    @Override
    public AppUserDTO create(AppUserDTO userDto) {
        AppUser user = mapper.getModelMapper().map(userDto, AppUser.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        appUserRepository.save(user);
        return(userDto);
    }

    @Override
    public AppUserDTO find(Integer id) throws ResourceNotFoundException {
        Optional<AppUser> user = appUserRepository.findById(id);
        if(user.isPresent()) {
            return(obmapper.convertValue(user.get(), AppUserDTO.class));
        } else {
            throw new ResourceNotFoundException("User not found");
        }
    }

    public AppUser findByUsername(String username) throws ResourceNotFoundException {
        AppUser user = appUserRepository.findByUsername(username);
        if(user != null) {
            return user;
        } else {
            throw new ResourceNotFoundException("User not found");
        }
    }

    @Override
    public List<AppUserDTO> findAll() {
        List<AppUser> userList = appUserRepository.findAll();
        List<AppUserDTO> userDTOList = new ArrayList<>();
        for(AppUser user: userList){
            userDTOList.add(mapper.getModelMapper().map(user, AppUserDTO.class));
        }
        return userDTOList;
    }

    @Override
    public String update(AppUserDTO appUserDTO) throws ResourceNotFoundException{
        AppUser user = appUserRepository.findByUsername(appUserDTO.getUsername());
        if(user != null){
            mapper.getModelMapper().map(appUserDTO, user);
            appUserRepository.save(user);
            return("Successful update");
        }else{
            throw new ResourceNotFoundException("User not found");
        }
    }

    @Override
    public Integer delete(Integer id) {
        appUserRepository.deleteById(id);
        return id;
    }

}