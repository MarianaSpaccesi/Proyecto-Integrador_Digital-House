package com.example.Backend.service.impl;

        import com.example.Backend.config.ModelMapperConfig;
        import com.example.Backend.exceptions.ResourceNotFoundException;
        import com.example.Backend.persistence.dto.RoleDTO;
        import com.example.Backend.persistence.dto.AppUserDTO;
        import com.example.Backend.persistence.entities.Role;
        import com.example.Backend.persistence.entities.AppUser;
        import com.example.Backend.persistence.repository.RoleRepository;
        import com.example.Backend.service.IService;
        import com.fasterxml.jackson.databind.ObjectMapper;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;

        import java.util.ArrayList;
        import java.util.List;
        import java.util.Optional;

@Service
public class RoleService implements IService<RoleDTO> {

    @Autowired
    RoleRepository rolRepository;

    @Autowired
    private ModelMapperConfig mapper;

    @Autowired
    private ObjectMapper obmapper;


    @Override
    public RoleDTO create(RoleDTO rolDTO) {
        Role rol = mapper.getModelMapper().map(rolDTO, Role.class);
        return mapper.getModelMapper().map(rolRepository.save(rol), RoleDTO.class);
    }

    @Override
    public RoleDTO find(Integer id) throws ResourceNotFoundException {
        if(id == null) {
            throw new ResourceNotFoundException("Rol not found");
        }
        return obmapper.convertValue(rolRepository.findById(id), RoleDTO.class);
    }

    @Override
    public List<RoleDTO> findAll() {
        List<Role> list = rolRepository.findAll();
        List<RoleDTO> listdto = new ArrayList<>();

        for(Role rol : list){
            listdto.add(mapper.getModelMapper().map(rol, RoleDTO.class));
        }
        return listdto;
    }

    @Override
    public String update(RoleDTO rolDTO) throws ResourceNotFoundException {
        Optional<Role> rol = rolRepository.findById(rolDTO.getId());
        String response;
        if(rol.isPresent()) {
            rolRepository.save(this.updateDb(rol.get(), rolDTO));
            mapper.getModelMapper().map(rolDTO, Role.class);
            response = "Successful update";
        }else {
            throw new ResourceNotFoundException("This rol could not be updated");
        }

        return response;
    }

    private Role updateDb(Role rol, RoleDTO rolDTO){
        if(rolDTO.getName() != null){
            rol.setName(rolDTO.getName());
        }
        return rol;
    }

    @Override
    public Integer delete(Integer id) {
        if(rolRepository.findById(id).isPresent()){
            rolRepository.deleteById(id);
        }
        return id;
    }
}
