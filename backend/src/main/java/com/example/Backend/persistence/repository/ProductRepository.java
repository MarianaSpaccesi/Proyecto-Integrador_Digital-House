package com.example.Backend.persistence.repository;


import com.example.Backend.persistence.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCityId(Integer id);

    List<Product> findByCategoryId(Integer id);

    @Query(value = "SELECT * FROM product ORDER BY RAND() LIMIT :qty", nativeQuery = true)
    // para mas eficiencia / flexibilidad https://stackoverflow.com/questions/24279186/fetch-random-records-using-spring-data-jpa
    List<Product> getRandom(Integer qty);



}
