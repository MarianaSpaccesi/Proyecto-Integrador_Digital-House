package com.example.Backend.persistence.repository;

import com.example.Backend.persistence.dto.BookingDTO;
import com.example.Backend.persistence.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findByProductId(Integer id);

    public List<Booking> findByUserId(Integer id);
}
