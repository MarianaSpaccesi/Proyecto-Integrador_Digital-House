package com.example.Backend.persistence.repository;
import com.example.Backend.persistence.entities.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Set;

@Repository
public interface FeatureRepository extends JpaRepository<Feature, Integer> {
    Set<Feature> findByType(String type);
}

