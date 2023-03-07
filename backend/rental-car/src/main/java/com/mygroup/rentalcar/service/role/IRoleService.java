package com.mygroup.rentalcar.service.role;

import com.mygroup.rentalcar.entity.Role;

import java.util.List;

public interface IRoleService {


    public List<Role> getAllRoles();
    public Role getRoleById(Long id);
}
