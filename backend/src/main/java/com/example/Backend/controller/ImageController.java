package com.example.Backend.controller;

import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.ImageDTO;
import com.example.Backend.service.impl.ImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/image")
@Tag(name="Image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @Operation(summary = "Crea una nueva imagen")
    @PostMapping("/create")
    public ResponseEntity<ImageDTO> create (@RequestBody ImageDTO imageDTO){
        return ResponseEntity.ok(imageService.create(imageDTO));
    }

    @Operation(summary = "Trae la imagen pasada por id")
    @GetMapping("/find/{id}")
    public ResponseEntity<ImageDTO> find(@PathVariable Integer id) throws ResourceNotFoundException {
        return ResponseEntity.ok(imageService.find(id));
    }

    @Operation(summary = "Lista todas las imágenes")
    @GetMapping("/findAll")
    public ResponseEntity<List<ImageDTO>> findAll() {
        return ResponseEntity.ok(imageService.findAll());
    }

    @Operation(summary = "Actualiza la imagen con los datos pasados en el body")
    @PutMapping("/update")
    public ResponseEntity<String> update (@RequestBody ImageDTO imageDTO) throws ResourceNotFoundException {
        return ResponseEntity.ok(imageService.update(imageDTO));
    }

    @Operation(summary = "Elimina la imagen pasada por id")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Integer> delete(@PathVariable Integer id){
        return  ResponseEntity.ok(imageService.delete(id));
    }

}
