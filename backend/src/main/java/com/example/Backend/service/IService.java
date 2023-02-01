package com.example.Backend.service;


import com.example.Backend.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IService <T> {

    T create (T t); //crear
    T find (Integer id) throws Exception; //leer
    List<T> findAll (); //leer todos
    String update (T t) throws Exception; //actualizar
    Integer delete (Integer id); //eliminar

}
