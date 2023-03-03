package com.mygroup.rentalcar.service.role;


import com.mygroup.rentalcar.dao.RoleRepository;
import com.mygroup.rentalcar.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements IRoleService{

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role getRoleById(Long id) {
        return this.roleRepository.getOne(id);
    }
}
