package com.example.Backend.service;

import com.example.Backend.persistence.dto.ProductDTO;


import java.util.List;

public interface ProductServiceInterface extends IService<ProductDTO> {
    public List<ProductDTO> findByCityId(Integer id);
    public List<ProductDTO> findByCategoryId(Integer id);


}
