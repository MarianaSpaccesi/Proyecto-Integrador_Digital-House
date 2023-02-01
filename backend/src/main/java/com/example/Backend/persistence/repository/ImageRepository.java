package com.example.Backend.persistence.repository;

import com.example.Backend.persistence.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
    //@Query("from Image img where img.product.id like %:id%")
    Set<Image> findByProductId(Integer id);
}
