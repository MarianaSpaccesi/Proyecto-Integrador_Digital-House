package com.example.Backend.service.impl;

import com.example.Backend.config.ModelMapperConfig;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.BusyDatesDTO;
import com.example.Backend.persistence.dto.FeatureDTO;
import com.example.Backend.persistence.dto.ImageDTO;
import com.example.Backend.persistence.dto.ProductDTO;

import com.example.Backend.persistence.entities.*;
import com.example.Backend.persistence.repository.BookingRepository;
import com.example.Backend.persistence.repository.ProductRepository;

import com.example.Backend.service.ProductServiceInterface;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ProductService implements ProductServiceInterface, com.example.Backend.service.impl.ProductServiceInterface {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ModelMapperConfig mapper;

    @Autowired
    private ObjectMapper obmapper;


    @Override
    public ProductDTO create(ProductDTO productDTO) {
        Product product = mapper.getModelMapper().map(productDTO, Product.class);
        return mapper.getModelMapper().map(productRepository.save(product), ProductDTO.class);
    }

    @Override
    public ProductDTO find(Integer id) throws ResourceNotFoundException {
        if(id == null) {
            throw new ResourceNotFoundException("Product not found");
        }
        Product p = productRepository.findById(id).get(); // try catch?
        return obmapper.convertValue(p, ProductDTO.class);
    }

    @Override
    public List<ProductDTO> findByCityId(Integer id){
        List<Product> products = productRepository.findByCityId(id);
        return mapper.getModelMapper().map(products, List.class);
    }

    @Override
    public List<ProductDTO> findByCategoryId(Integer id){
        List<Product> products = productRepository.findByCategoryId(id);
        return mapper.getModelMapper().map(products, List.class);
    }


    //Metodo para obtener las fechas ocupadas de un producto
    public BusyDatesDTO busyDates (Integer id) throws ResourceNotFoundException {
        Optional<Product> product = productRepository.findById(id);
        if (product.isEmpty()){
            throw new ResourceNotFoundException ("Producto con Id " + id + " no encontrado.");
        }
        List<Booking> bookings = bookingRepository.findByProductId(id);
        List<LocalDate> dates = new ArrayList<>();
        for (Booking booking: bookings){
            LocalDate in = booking.getBookingStartDate();
            LocalDate out = booking.getBookingEndDate();
            LocalDate actual = in;
            while (actual.isBefore(out) || actual.isEqual(out)) {
                dates.add(actual);
                actual = actual.plusDays(1);
            }
        }
        BusyDatesDTO busyDates = new BusyDatesDTO();
        busyDates.setNotAvailableDates(dates);
        return busyDates;
    }

    //Metodo que devuelve true si no hay ninguna fecha ocupada en el rango indicado
    public static boolean isValidRange(LocalDate bookingStartDate, LocalDate bookingEndDate, BusyDatesDTO busyDates) {
        boolean valid = true;
        LocalDate actualDate;
        List<LocalDate> dates = busyDates.getNotAvailableDates();
        while (valid && !dates.isEmpty()){
            actualDate = dates.remove(0);
            valid = actualDate.isBefore(bookingStartDate) || actualDate.isAfter(bookingEndDate);
        }
        return valid;
    }

    //Llamamos al metodo anterior de forma mas simplificada
    private boolean isValid(LocalDate in, LocalDate out, Product product) throws ResourceNotFoundException {
        return isValidRange(in, out, busyDates(product.getId()));
    }

    //Metodo para filtrar por ciudad y despues lo recorre y se fija cuales productos son validos
    public List<ProductDTO> findByCityAndDates (LocalDate start, LocalDate end, Integer idCity) throws ResourceNotFoundException, BadRequestException {
        LocalDate today  = LocalDate.now();
        if (start.isBefore(today) || end.isBefore(today)) {
            throw new BadRequestException("Las fechas no pueden ser anteriores a hoy");
        }
        City city = new City();
        city.setId(idCity);
        List<Product> products = productRepository.findByCityId(city.getId());
        List<ProductDTO> productsDTO = new ArrayList<>();
        for (Product product : products){
            if (isValid(start, end, product)) {
                productsDTO.add(mapper.getModelMapper().map(product, ProductDTO.class));
            }
        }
        return productsDTO;
    }


    @Override
    public List<ProductDTO> findAll() {
        List<Product> list = productRepository.findAll();
        List<ProductDTO> listdto = new ArrayList<>();

        for(Product product : list){
            listdto.add(mapper.getModelMapper().map(product, ProductDTO.class));
        }
        return listdto;
    }

    @Override
    public String update(ProductDTO productDTO) throws ResourceNotFoundException {
        Optional<Product> product = productRepository.findById(productDTO.getId());
        String response;
        if(product.isPresent()) {
            productRepository.save(this.updateDb(product.get(), productDTO));
            mapper.getModelMapper().map(productDTO, ProductDTO.class);
            response = "Successful update";
        } else {
            throw new ResourceNotFoundException("Product could not be updated");
        }

        return response;
    }

    private Product updateDb(Product product, ProductDTO productDTO) throws ResourceNotFoundException{
        if(productDTO.getTitle() != null){
            product.setTitle(productDTO.getTitle());
        }

        if(productDTO.getLatitude() != null){
            product.setLatitude(productDTO.getLatitude());
        }

        if(productDTO.getLength() != null){
            product.setLength(productDTO.getLength());
        }

        if(productDTO.getDescription() != null){
            product.setDescription(productDTO.getDescription());
        }

        if(productDTO.getAvailability() != null){
            product.setAvailability(productDTO.getAvailability());
        }

        if(productDTO.getPolitics() != null){
            product.setPolitics(productDTO.getPolitics());
        }

        if(productDTO.getPrice() != null){
            product.setPrice(productDTO.getPrice());
        }

        if(productDTO.getCategory() != null){
            product.setCategory(mapper.getModelMapper().map(productDTO.getCategory(), Category.class));
        }

        if(productDTO.getCity() != null){
            product.setCity(mapper.getModelMapper().map(productDTO.getCity(), City.class));
        }

        if(productDTO.getImages() != null){
            for (ImageDTO imDTO : productDTO.getImages()) {
                product.getImages().add(mapper.getModelMapper().map(imDTO, Image.class));
            }
        }

        if(productDTO.getFeatures() != null){
            for (FeatureDTO featDTO : productDTO.getFeatures()) {
                product.getFeatures().add(mapper.getModelMapper().map(featDTO, Feature.class));
            }
        }

        return product;
    }

    @Override
    public Integer delete(Integer id) {
        if(productRepository.findById(id).isPresent()){
            productRepository.deleteById(id);
        }
        return id;
    }

    public List<ProductDTO> getRandomProducts(Integer qty) {
        List<Product> list = productRepository.getRandom(qty);
        List<ProductDTO> listdto = new ArrayList<>();

        for(Product product : list){
            listdto.add(mapper.getModelMapper().map(product, ProductDTO.class));
        }
        return listdto;
    }

}

