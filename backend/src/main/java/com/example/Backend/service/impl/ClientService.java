/*package com.example.Backend.service.impl;

import com.example.Backend.config.ModelMapperConfig;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.ClientDTO;
import com.example.Backend.persistence.entities.Client;
import com.example.Backend.persistence.entities.User;
import com.example.Backend.persistence.repository.ClientRepository;
import com.example.Backend.service.IService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClientService implements IService<ClientDTO> {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ModelMapperConfig mapper;

    @Autowired
    private ObjectMapper obmapper;


    @Override
    public ClientDTO create(ClientDTO clientDTO) {
        Client cl = mapper.getModelMapper().map(clientDTO, Client.class);
        return mapper.getModelMapper().map(clientRepository.save(cl), ClientDTO.class);
    }

    @Override
    public ClientDTO find(Integer id) throws ResourceNotFoundException {
        if(id == null) {
            throw new ResourceNotFoundException("Client not found");
        }
        return obmapper.convertValue(clientRepository.findById(id), ClientDTO.class);
    }

    @Override
    public List<ClientDTO> findAll() {
        List<Client> list = clientRepository.findAll();
        List<ClientDTO> listdto = new ArrayList<>();

        for(Client cl : list){
            listdto.add(mapper.getModelMapper().map(cl, ClientDTO.class));
        }
        return listdto;
    }

    @Override
    public String update(ClientDTO clientDTO) throws ResourceNotFoundException {
        Optional<Client> cl = clientRepository.findById(clientDTO.getId());
        String response;
        if(cl.isPresent()) {
            clientRepository.save(this.updateDb(cl.get(), clientDTO));
            mapper.getModelMapper().map(clientDTO, User.class);
            response = "Successful update";
        }else {
            throw new ResourceNotFoundException("Client could not be updated");
        }

        return response;
    }

    private Client updateDb(Client client, ClientDTO clientDTO){
        if(clientDTO.getName() != null){
            client.setName(clientDTO.getName());
        }

        if(clientDTO.getLastname() != null){
            client.setLastname(clientDTO.getLastname());
        }

        if(clientDTO.getEmail() != null){
            client.setEmail(clientDTO.getEmail());
        }

        if(clientDTO.getPassword() != null){
            client.setPassword(clientDTO.getPassword());
        }

        return client;
    }

    @Override
    public Integer delete(Integer id) {
        if(clientRepository.findById(id).isPresent()){
            clientRepository.deleteById(id);
        }
        return id;
    }
}*/
