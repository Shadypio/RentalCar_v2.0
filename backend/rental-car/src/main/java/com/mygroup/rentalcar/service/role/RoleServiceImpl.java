package com.mygroup.rentalcar.service.role;


import com.mygroup.rentalcar.dao.RoleRepository;
import com.mygroup.rentalcar.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements IRoleService{

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<Role> getAllRoles() {
        return this.roleRepository.findAll();
    }

    @Override
    public Role getRoleById(Long id) {
        return this.roleRepository.findById(id).get();
    }
}
