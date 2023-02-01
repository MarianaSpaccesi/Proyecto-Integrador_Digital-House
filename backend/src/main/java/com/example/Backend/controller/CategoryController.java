package com.example.Backend.controller;

import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.CategoryDTO;
import com.example.Backend.service.impl.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@Tag(name="Category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @Operation(summary = "Crea una nueva categoría")
    @PostMapping("/create")
    public ResponseEntity<CategoryDTO> create (@RequestBody CategoryDTO categoryDTO){
        return ResponseEntity.ok(categoryService.create(categoryDTO));
    }

    @Operation(summary = "Trae la categoría pasada por id")
    @GetMapping("/find/{id}")
    public ResponseEntity<CategoryDTO> find(@PathVariable Integer id) throws ResourceNotFoundException {
        return ResponseEntity.ok(categoryService.find(id));
    }

    @Operation(summary = "Lista todas las categorías")
    @GetMapping("/findAll")
    public ResponseEntity<List<CategoryDTO>> findAll() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    @Operation(summary = "Elimina la categoría pasada por id")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Integer> delete(@PathVariable Integer id){
        return  ResponseEntity.ok(categoryService.delete(id));
    }

    @Operation(summary = "Actualiza la categoría con los datos pasados en el body")
    @PutMapping("/update")
    public ResponseEntity<String> update (@RequestBody CategoryDTO categoryDTO) throws ResourceNotFoundException {
        return ResponseEntity.ok(categoryService.update(categoryDTO));
    }


}
