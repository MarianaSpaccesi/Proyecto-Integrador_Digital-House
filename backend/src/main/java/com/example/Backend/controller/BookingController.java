package com.example.Backend.controller;


import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.BookingDTO;
import com.example.Backend.persistence.dto.ProductDTO;
import com.example.Backend.service.impl.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
@Tag(name="Booking")
public class BookingController {

    @Autowired
    BookingService bookingService;

    @Operation(summary = "Crea una reserva nueva")
    @PostMapping("/create")
    public ResponseEntity<BookingDTO> create(@RequestBody BookingDTO bookingDTO) {
        return ResponseEntity.ok(bookingService.create(bookingDTO));
    }

    @Operation(summary = "Trae la reserva segun su id")
    @GetMapping("/find/{id}")
    public ResponseEntity<BookingDTO> find(@PathVariable Integer id) throws ResourceNotFoundException {
        return ResponseEntity.ok(bookingService.find(id));
    }

    @Operation(summary = "Lista todas las reservas")
    @GetMapping("/findAll")
    public ResponseEntity<List<BookingDTO>> findAll() {
        return ResponseEntity.ok(bookingService.findAll());
    }

    @Operation(summary = "Filtra las reservas hechas con un id de producto")
    @GetMapping("/findByProduct/{id}")
    public ResponseEntity<List<BookingDTO>> findByProductId(@PathVariable Integer id){
        return ResponseEntity.ok(bookingService.findByProductId(id));
    }

    @Operation(summary = "Filtra las reservas hechas con un id de usuario")
    @GetMapping("/findByUser/{id}")
    public ResponseEntity<List<BookingDTO>> findByUserId(@PathVariable Integer id){
        return ResponseEntity.ok(bookingService.findByUserId(id));
    }

    @Operation(summary = "Actualiza la reserva con los datos indicados por body")
    @PutMapping("/update")
    public ResponseEntity<String> update (@RequestBody BookingDTO bookingDTO) throws ResourceNotFoundException {
        return ResponseEntity.ok(bookingService.update(bookingDTO));
    }

    @Operation(summary = "Elimina la reserva")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Integer> delete(@PathVariable Integer id){
        return  ResponseEntity.ok(bookingService.delete(id));
    }


}
