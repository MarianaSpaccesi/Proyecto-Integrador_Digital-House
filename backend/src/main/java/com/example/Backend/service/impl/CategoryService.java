package com.example.Backend.service.impl;

import com.example.Backend.config.ModelMapperConfig;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.CategoryDTO;
import com.example.Backend.persistence.entities.Category;
import com.example.Backend.persistence.repository.CategoryRepository;
import com.example.Backend.service.IService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements IService<CategoryDTO> {

    @Autowired
    private CategoryRepository repository;

    @Autowired
    private ModelMapperConfig mapper;

    @Autowired
    private ObjectMapper obmapper;


    @Override
    public CategoryDTO create(CategoryDTO categoryDTO) {
        Category entidad = mapper.getModelMapper().map(categoryDTO, Category.class);
        return mapper.getModelMapper().map(repository.save(entidad), CategoryDTO.class);
    }

    @Override
    public CategoryDTO find(Integer id) throws ResourceNotFoundException {
        if(id == null) {
            throw new ResourceNotFoundException("Category not found");
        }
        return obmapper.convertValue(repository.findById(id), CategoryDTO.class);

    }

    @Override
    public List<CategoryDTO> findAll() {
        List<Category> list = repository.findAll();
        List<CategoryDTO> listdto = new ArrayList<>();

        for(Category cat : list){
            listdto.add(mapper.getModelMapper().map(cat, CategoryDTO.class));
        }
        return listdto;
    }

    @Override
    public String update(CategoryDTO categoryDTO) throws ResourceNotFoundException {
        Optional<Category> cat = repository.findById(categoryDTO.getId());
        String response;
        if(cat.isPresent()) {
            repository.save(this.updateDb(cat.get(), categoryDTO));
            mapper.getModelMapper().map(categoryDTO, Category.class);
            response = "Successful update";
        }else {
            throw new ResourceNotFoundException("Category could not be updated");
        }

        return response;
    }

    private Category updateDb(Category category, CategoryDTO categoryDTO){
        if(categoryDTO.getTitle() != null){
            category.setTitle(categoryDTO.getTitle());
        }

        if(categoryDTO.getDescription() != null){
            category.setDescription(categoryDTO.getDescription());
        }

        if(categoryDTO.getUrlImage() != null){
            category.setUrlImage(categoryDTO.getUrlImage());
        }

        return category;
    }


    @Override
    public Integer delete(Integer id) {
        if(repository.findById(id).isPresent()){
            repository.deleteById(id);
        }
        return id;
    }
}
