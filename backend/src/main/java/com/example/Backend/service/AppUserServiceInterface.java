package com.example.Backend.service;

import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.AppUserDTO;
import com.example.Backend.persistence.dto.RoleDTO;
import com.example.Backend.persistence.entities.AppUser;
import com.example.Backend.persistence.entities.Role;

public interface AppUserServiceInterface extends IService<AppUserDTO> {
    public AppUserDTO addRoleToUser(String username, String roleName) throws ResourceNotFoundException;
}
