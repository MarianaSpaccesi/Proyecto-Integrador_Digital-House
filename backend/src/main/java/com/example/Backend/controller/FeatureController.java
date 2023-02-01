package com.example.Backend.controller;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.FeatureDTO;
import com.example.Backend.service.impl.FeatureService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feature")
@Tag(name="Feature")
public class FeatureController {

    @Autowired
    private FeatureService featureService;

    @PostMapping("/create")
    public ResponseEntity<FeatureDTO> create (@RequestBody FeatureDTO featureDTO){
        return ResponseEntity.ok(featureService.create(featureDTO));
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<FeatureDTO> find(@PathVariable Integer id) throws ResourceNotFoundException {
        return ResponseEntity.ok(featureService.find(id));
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<FeatureDTO>> findAll() {
        return ResponseEntity.ok(featureService.findAll());
    }

    @PutMapping("/update")
    public ResponseEntity<String> update (@RequestBody FeatureDTO featureDTO) throws ResourceNotFoundException {
        return ResponseEntity.ok(featureService.update(featureDTO));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Integer> delete(@PathVariable Integer id){
        return  ResponseEntity.ok(featureService.delete(id));
    }


}

