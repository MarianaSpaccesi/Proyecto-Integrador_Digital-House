package com.example.Backend.persistence.entities;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter @Setter
@Entity
@Table(name = "product")
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="id")
    private Integer id;

    @Column(name="title", nullable = false)
    private String title;

    @Column(name="latitude", nullable = false)
    private Double latitude;

    @Column(name="length", nullable = false)
    private Double length;

    @Column(name="description", nullable = false)
    private String description;

    @Column(name="availability", nullable = false)
    private String availability;

    @Column(name="politics", nullable = false)
    private String politics;

    @Column(name="price", nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name="category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "city_id",nullable = false)
    private City city;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch=FetchType.EAGER, orphanRemoval = true)
    private Set<Image> images;

    @ManyToMany(cascade = {
            CascadeType.MERGE,
    })
    @JoinTable(
            name = "product_feature",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id")
    )
    private Set<Feature> features;
    public void addFeature(Feature feature) {
        features.add(feature);
        feature.getProducts().add(this);
    }
    public void removeFeature(Feature feature) {
        features.remove(feature);
        feature.setProducts(null);
    }
    public void addImage(Image image) {
        image.setProduct(this);
        images.add(image);
    }
    public void removeImage(Image image) {
        images.remove(image);
        image.setProduct(null);
    }
    public void setImages(Set<Image> images) {
        for (Image image : images) {
            image.setProduct(this);
        }
        this.images = images;
    }
}

    