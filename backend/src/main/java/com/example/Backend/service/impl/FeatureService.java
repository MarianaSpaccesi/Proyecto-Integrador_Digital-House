package com.example.Backend.service.impl;

import com.example.Backend.config.ModelMapperConfig;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.FeatureDTO;
import com.example.Backend.persistence.entities.Feature;
import com.example.Backend.persistence.repository.FeatureRepository;
import com.example.Backend.service.IService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FeatureService implements IService<FeatureDTO> {

    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private ModelMapperConfig mapper;

    @Autowired
    private ObjectMapper obmapper;


    @Override
    public FeatureDTO create(FeatureDTO featureDTO) {
        Feature entity = mapper.getModelMapper().map(featureDTO, Feature.class);
        return mapper.getModelMapper().map(featureRepository.save(entity), FeatureDTO.class);
    }

    @Override
    public FeatureDTO find(Integer id) throws ResourceNotFoundException {
        if(id == null) {
            throw new ResourceNotFoundException("Feature not found");
        }
        return obmapper.convertValue(featureRepository.findById(id), FeatureDTO.class);
    }

    @Override
    public List<FeatureDTO> findAll() {
        List<Feature> list = featureRepository.findAll();
        List<FeatureDTO> listdto = new ArrayList<>();

        for(Feature ft : list){
            listdto.add(mapper.getModelMapper().map(ft, FeatureDTO.class));
        }
        return listdto;
    }

    @Override
public String update(FeatureDTO featureDTO) throws ResourceNotFoundException {
        Optional<Feature> ft = featureRepository.findById(featureDTO.getId());
        String response;
        if(ft.isPresent()) {
            featureRepository.save(this.updateDb(ft.get(), featureDTO));
            mapper.getModelMapper().map(featureDTO, Feature.class);
            response = "Successful update";
        }else {
            throw new ResourceNotFoundException("Feature could not be updated");
        }

        return response;
    }

    private Feature updateDb(Feature feature, FeatureDTO featureDTO){

        if(featureDTO.getType() != null){
            feature.setType(featureDTO.getType());
        }
        if(featureDTO.getValue() != null){
            feature.setValue(featureDTO.getValue());
        }

        return feature;
    }

    @Override
    public Integer delete(Integer id) {
        if(featureRepository.findById(id).isPresent()){
            featureRepository.deleteById(id);
        }
        return id;
    }
}
