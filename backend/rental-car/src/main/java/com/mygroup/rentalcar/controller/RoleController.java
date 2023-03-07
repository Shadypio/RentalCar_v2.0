package com.mygroup.rentalcar.controller;

import com.mygroup.rentalcar.entity.Car;
import com.mygroup.rentalcar.entity.Role;
import com.mygroup.rentalcar.service.role.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private IRoleService roleService;

    @GetMapping
    public List<Role> getAllRoles() {
        return this.roleService.getAllRoles();
    }

    @GetMapping("/{id}")
    public Role findRoleById(@PathVariable(value = "id") Long id) {
        return this.roleService.getRoleById(id);
    }
}
