package com.example.Backend.service.impl;

import com.example.Backend.config.ModelMapperConfig;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.CityDTO;
import com.example.Backend.persistence.entities.City;
import com.example.Backend.persistence.repository.CityRepository;
import com.example.Backend.service.IService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CityService implements IService<CityDTO> {

    @Autowired
    private CityRepository citiRepository;

    @Autowired
    private ModelMapperConfig mapper;

    @Autowired
    private ObjectMapper obmapper;

    @Override
    public CityDTO create(CityDTO cityDTO) {
        City entity = mapper.getModelMapper().map(cityDTO, City.class);
        return mapper.getModelMapper().map(citiRepository.save(entity), CityDTO.class);
    }

    @Override
    public CityDTO find(Integer id) throws ResourceNotFoundException {
        if(id == null) {
            throw new ResourceNotFoundException("City not found");
        }
        return obmapper.convertValue(citiRepository.findById(id), CityDTO.class);
    }

    @Override
    public List<CityDTO> findAll() {
        List<City> list = citiRepository.findAll();
        List<CityDTO> listdto = new ArrayList<>();

        for(City city : list){
            listdto.add(mapper.getModelMapper().map(city, CityDTO.class));
        }
        return listdto;
    }

    @Override
    public String update(CityDTO cityDTO) throws ResourceNotFoundException {
        Optional<City> city = citiRepository.findById(cityDTO.getId());
        String response;
        if(city.isPresent()) {
            citiRepository.save(this.updateDb(city.get(), cityDTO));
            mapper.getModelMapper().map(cityDTO, CityDTO.class);
            response = "Successful update";
        }else {
            throw new ResourceNotFoundException("City could not be updated");
        }

        return response;
    }

    private City updateDb(City city, CityDTO cityDTO){
        if(cityDTO.getCity() != null){
            city.setCity(cityDTO.getCity());
        }

        if(cityDTO.getProvince() != null){
            city.setProvince(cityDTO.getProvince());
        }

        if(cityDTO.getCountry() != null){
            city.setCountry(cityDTO.getCountry());
        }

        return city;
    }

    @Override
    public Integer delete(Integer id) {
        if(citiRepository.findById(id).isPresent()){
            citiRepository.deleteById(id);
        }
        return id;
    }
}
