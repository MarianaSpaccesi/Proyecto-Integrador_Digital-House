package com.example.Backend.controller;

/*import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.ClientDTO;
import com.example.Backend.service.impl.ClientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/client")
@Tag(name="Client")
public class ClientController {
    @Autowired
    ClientService clientService;

    @Operation(summary = "Crea un usuario nuevo")
    @PostMapping("/create")
    public ResponseEntity<ClientDTO> create (@RequestBody ClientDTO clientDTO){
        return ResponseEntity.ok(clientService.create(clientDTO));
    }

    @Operation(summary = "Trae el usuario pasado por id")
    @GetMapping("/find/{id}")
    public ResponseEntity<ClientDTO> find(@PathVariable Integer id) throws ResourceNotFoundException {
        return ResponseEntity.ok(clientService.find(id));
    }

    @Operation(summary = "Lista todos los usuarios")
    @GetMapping("/findAll")
    public ResponseEntity<List<ClientDTO>> findAll() {
        return ResponseEntity.ok(clientService.findAll());
    }

    @Operation(summary = "Actualiza el usuario con los datos pasados en el body")
    @PutMapping("/update")
    public ResponseEntity<String> update (@RequestBody ClientDTO clientDTO) throws ResourceNotFoundException {
        return ResponseEntity.ok(clientService.update(clientDTO));
    }

    @Operation(summary = "Elimina el usuario indicado por id")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Integer> delete(@PathVariable Integer id){
        return  ResponseEntity.ok(clientService.delete(id));
    }
}
*/