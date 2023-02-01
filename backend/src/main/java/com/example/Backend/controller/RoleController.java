package com.example.Backend.controller;

import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.RoleDTO;
import com.example.Backend.service.impl.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/role")
@Tag(name="Rol")
public class RoleController {

    @Autowired
    RoleService roleService;

    @Operation(summary = "Crea un rol nuevo")
    @PostMapping("/create")
    public ResponseEntity<RoleDTO> create (@RequestBody RoleDTO rolDTO){
        return ResponseEntity.ok(roleService.create(rolDTO));
    }

    @Operation(summary = "Trae el rol pasado por id")
    @GetMapping("/find/{id}")
    public ResponseEntity<RoleDTO> find(@PathVariable Integer id) throws ResourceNotFoundException {
        return ResponseEntity.ok(roleService.find(id));
    }

    @Operation(summary = "Lista todos los roles")
    @GetMapping("/findAll")
    public ResponseEntity<List<RoleDTO>> findAll() {
        return ResponseEntity.ok(roleService.findAll());
    }

    @Operation(summary = "Actualiza el usuario con los datos pasados en el body")
    @PutMapping("/update")
    public ResponseEntity<String> update (@RequestBody RoleDTO rolDTO) throws ResourceNotFoundException {
        return ResponseEntity.ok(roleService.update(rolDTO));
    }

    @Operation(summary = "Elimina el usuario indicado por id")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Integer> delete(@PathVariable Integer id){
        return  ResponseEntity.ok(roleService.delete(id));
    }
}
