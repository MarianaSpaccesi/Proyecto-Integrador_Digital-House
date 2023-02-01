package com.example.Backend.service.impl;

import com.example.Backend.config.ModelMapperConfig;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.ImageDTO;
import com.example.Backend.persistence.entities.Category;
import com.example.Backend.persistence.entities.Image;
import com.example.Backend.persistence.repository.ImageRepository;
import com.example.Backend.service.IService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService implements IService<ImageDTO> {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ModelMapperConfig mapper;

    @Autowired
    private ObjectMapper obmapper;

    @Override
    public ImageDTO create(ImageDTO imageDTO) {
        Image entity = mapper.getModelMapper().map(imageDTO, Image.class);
        return mapper.getModelMapper().map(imageRepository.save(entity), ImageDTO.class);
    }

    @Override
    public ImageDTO find(Integer id) throws ResourceNotFoundException {
        if(id == null) {
            throw new ResourceNotFoundException("Image not found");
        }
        return obmapper.convertValue(imageRepository.findById(id), ImageDTO.class);
    }

    @Override
    public List<ImageDTO> findAll() {
        List<Image> list = imageRepository.findAll();
        List<ImageDTO> listdto = new ArrayList<>();

        for(Image img : list){
            listdto.add(mapper.getModelMapper().map(img, ImageDTO.class));
        }
        return listdto;
    }

    @Override
    public String update(ImageDTO imageDTO) throws ResourceNotFoundException {
        Optional<Image> img = imageRepository.findById(imageDTO.getId());
        String response;
        if(img.isPresent()) {
            imageRepository.save(this.updateDb(img.get(), imageDTO));
            mapper.getModelMapper().map(imageDTO, Category.class);
            response = "Successful update";
        }else {
            throw new ResourceNotFoundException("Image could not be updated");
        }

        return response;
    }


    private Image updateDb(Image image, ImageDTO imageDTO){
        if(imageDTO.getTitle() != null){
            image.setTitle(imageDTO.getTitle());
        }

        if(imageDTO.getTitle() != null){
            image.setTitle(imageDTO.getTitle());
        }

        if(imageDTO.getUrlImage() != null){
            image.setUrlImage(imageDTO.getUrlImage());
        }

        return image;
    }

    @Override
    public Integer delete(Integer id) {
        if(imageRepository.findById(id).isPresent()){
            imageRepository.deleteById(id);
        }
        return id;
    }
}
