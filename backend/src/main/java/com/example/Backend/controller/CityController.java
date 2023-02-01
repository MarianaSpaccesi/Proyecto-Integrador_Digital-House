package com.example.Backend.controller;


import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.CityDTO;
import com.example.Backend.service.impl.CityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/city")
@Tag(name="City")
public class CityController {

    @Autowired
    CityService cityService;

    @Operation(summary = "Crea una nueva ciudad")
    @PostMapping("/create")
    public ResponseEntity<CityDTO> create (@RequestBody CityDTO cityDTO){
        return ResponseEntity.ok(cityService.create(cityDTO));
    }

    @Operation(summary = "Trae la ciudad pasada por id")
    @GetMapping("/find/{id}")
    public ResponseEntity<CityDTO> find(@PathVariable Integer id) throws ResourceNotFoundException {
        return ResponseEntity.ok(cityService.find(id));
    }

    @Operation(summary = "Lista todas las ciudades")
    @GetMapping("/findAll")
    public ResponseEntity<List<CityDTO>> findAll() {
        return ResponseEntity.ok(cityService.findAll());
    }

    @Operation(summary = "Actualiza la ciudad con los datos pasados en el body")
    @PutMapping("/update")
    public ResponseEntity<String> update (@RequestBody CityDTO cityDTO) throws ResourceNotFoundException {
        return ResponseEntity.ok(cityService.update(cityDTO));
    }

    @Operation(summary = "Elimina la ciudad pasada por id")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Integer> delete(@PathVariable Integer id){
        return  ResponseEntity.ok(cityService.delete(id));
    }

}
