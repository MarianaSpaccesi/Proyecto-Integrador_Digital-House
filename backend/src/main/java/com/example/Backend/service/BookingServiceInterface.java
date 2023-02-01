package com.example.Backend.service;

import com.example.Backend.persistence.dto.BookingDTO;

import java.util.List;

public interface BookingServiceInterface extends IService<BookingDTO>{
    public List<BookingDTO> findByProductId(Integer id);
    public List<BookingDTO> findByUserId(Integer id);
}
