package com.example.Backend.controller;

import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.ProductDTO;
import com.example.Backend.service.impl.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/product")
@Tag(name="Product")
public class ProductController {

    @Autowired
    ProductService productService;

    @Operation(summary = "Crea un nuevo producto")
    @PostMapping("/create")
    public ResponseEntity<ProductDTO> create(@RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(productService.create(productDTO));
    }

    @Operation(summary = "Trae el producto pasado por id")
    @GetMapping("/find/{id}")
    public ResponseEntity<ProductDTO> find(@PathVariable Integer id) throws ResourceNotFoundException {
        return ResponseEntity.ok(productService.find(id));
    }

    @Operation(summary = "Lista todos los productos")
    @GetMapping("/findAll")
    public ResponseEntity<List<ProductDTO>> findAll() {
        return ResponseEntity.ok(productService.findAll());
    }

    @Operation(summary = "Filtra productos por ciudad")
    @GetMapping("/findByCity/{id}")
    public ResponseEntity<List<ProductDTO>> findByCity(@PathVariable Integer id){
        return ResponseEntity.ok(productService.findByCityId(id));
    }

    @Operation(summary = "Filtra productos por categoria")
    @GetMapping("/findByCategory/{id}")
    public ResponseEntity<List<ProductDTO>> findByCategory(@PathVariable Integer id){
        return ResponseEntity.ok(productService.findByCategoryId(id));
    }

    @Operation(summary = "Filtra productos por ciudad y fechas")
    @GetMapping("/findByCityAndDates")
    public ResponseEntity<List<ProductDTO>> findByCityAndDates(HttpServletRequest request) throws BadRequestException, ResourceNotFoundException {
        String start = request.getParameter("start");
        String end = request.getParameter("end");
        String idCity = request.getParameter("idCity");

        LocalDate startDay = LocalDate.parse(start);
        LocalDate endDay = LocalDate.parse(end);
        Integer id_City = Integer.parseInt(idCity);

        return ResponseEntity.ok(productService.findByCityAndDates(startDay, endDay, id_City));

    }

    @Operation(summary = "Actualiza el producto con los datos pasados en el body")
    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody ProductDTO productDTO) throws ResourceNotFoundException {
        return ResponseEntity.ok(productService.update(productDTO));
    }

    @Operation(summary = "Elimina el producto pasado por id")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Integer> delete(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.delete(id));
    }
    @GetMapping("/getRandom/{qty}")
    public ResponseEntity<List<ProductDTO>> getRand(@PathVariable Integer qty) {
        return ResponseEntity.ok(productService.getRandomProducts(qty));
    }
}

