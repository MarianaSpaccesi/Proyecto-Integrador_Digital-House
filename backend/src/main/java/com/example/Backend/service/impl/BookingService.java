package com.example.Backend.service.impl;

import com.example.Backend.config.ModelMapperConfig;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.BookingDTO;
import com.example.Backend.persistence.entities.AppUser;
import com.example.Backend.persistence.entities.Booking;
import com.example.Backend.persistence.repository.AppUserRepository;
import com.example.Backend.persistence.repository.BookingRepository;
import com.example.Backend.service.BookingServiceInterface;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService implements BookingServiceInterface {

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    AppUserRepository userRepository;
    @Autowired
    private ModelMapperConfig mapper;

    @Autowired
    private ObjectMapper obmapper;

    @Override
    public BookingDTO create(BookingDTO bookingDTO) {
        Booking bk = mapper.getModelMapper().map(bookingDTO, Booking.class);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        bk.setUser(userRepository.findByUsername(username));
        return mapper.getModelMapper().map(bookingRepository.save(bk), BookingDTO.class);
    }

    @Override
    public BookingDTO find(Integer id) throws ResourceNotFoundException {
        if(id == null) {
            throw new ResourceNotFoundException("Booking not found");
        }
        return obmapper.convertValue(bookingRepository.findById(id), BookingDTO.class);
    }

    @Override
    public List<BookingDTO> findByProductId(Integer id){
        List<Booking> bookings = bookingRepository.findByProductId(id);
        return mapper.getModelMapper().map(bookings, List.class);
    }

    @Override
    public List<BookingDTO> findByUserId(Integer id) {
        List<Booking> bookings = bookingRepository.findByUserId(id);
        return mapper.getModelMapper().map(bookings, List.class);
    }

    @Override
    public List<BookingDTO> findAll() {
        List<Booking> list = bookingRepository.findAll();
        List<BookingDTO> listdto = new ArrayList<>();

        for(Booking booking : list){
            listdto.add(mapper.getModelMapper().map(booking, BookingDTO.class));
        }
        return listdto;
    }

    @Override
    public String update(BookingDTO bookingDTO) throws ResourceNotFoundException {
        Optional<Booking> booking = bookingRepository.findById(bookingDTO.getId());
        String response;
        if(booking.isPresent()) {
            bookingRepository.save(this.updateDb(booking.get(), bookingDTO));
            mapper.getModelMapper().map(bookingDTO, BookingDTO.class);
            response = "Successful update";
        }else {
            throw new ResourceNotFoundException("Booking could not be updated");
        }

        return response;
    }

    private Booking updateDb(Booking booking, BookingDTO bookingDTO){
        if(bookingDTO.getStartTime() != null){
            booking.setStartTime(bookingDTO.getStartTime());
        }

        if(bookingDTO.getBookingStartDate() != null){
            booking.setBookingStartDate(bookingDTO.getBookingStartDate());
        }

        if(bookingDTO.getBookingEndDate() != null){
            booking.setBookingEndDate(bookingDTO.getBookingEndDate());
        }


        return booking;
    }

    @Override
    public Integer delete(Integer id) {
        if(bookingRepository.findById(id).isPresent()){
            bookingRepository.deleteById(id);
        }
        return id;
    }
}
