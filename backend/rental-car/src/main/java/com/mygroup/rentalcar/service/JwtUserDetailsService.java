package com.mygroup.rentalcar.service;
import java.util.ArrayList;
import java.util.Date;

import com.mygroup.rentalcar.dao.CustomerRepository;
import com.mygroup.rentalcar.dao.RoleRepository;
import com.mygroup.rentalcar.dto.CustomerDTO;
import com.mygroup.rentalcar.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Customer user = customerRepository.findCustomerByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        // check role
        User.UserBuilder builder = null;
        builder = User.withUsername(user.getUsername());
        builder.disabled(false);
        builder.password(user.getPassword());
        builder.disabled((user.getEnabled() ? false : true ));
        builder.authorities("ROLE_" + user.getRole().getRoleName());
        return builder.build();
    }

    public Customer save(CustomerDTO user) {
        Customer newUser = new Customer();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));

        // to replace
        newUser.setFirstName(user.getUsername()+"FirstName");
        newUser.setLastName(user.getUsername()+"LastName");
        newUser.setEnabled(true);
        newUser.setDateOfBirth(new Date());
        // create Admin (1L) or User (2L)
        newUser.setRole(roleRepository.findById(1L).get());
        // newUser.setRole(roleRepository.findById(2L).get());

        newUser.toString();


        return customerRepository.save(newUser);
    }
}

