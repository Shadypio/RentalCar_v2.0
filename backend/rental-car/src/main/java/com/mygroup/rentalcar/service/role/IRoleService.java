package com.mygroup.rentalcar.service.role;

import com.mygroup.rentalcar.entity.Rental;
import com.mygroup.rentalcar.entity.Role;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IRoleService {


    public Role getRoleById(Long id);
}
