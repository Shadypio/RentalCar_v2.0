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
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEnabled(true);
        newUser.setDateOfBirth(user.getDateOfBirth());
        // create Admin (1L) or User (2L)
        // change with user.getRole();
        // newUser.setRole(user.getRole());
        newUser.setRole(roleRepository.findById(2L).get());

        return customerRepository.save(newUser);
    }

    public Customer signup(CustomerDTO user) {
        Customer newUser = new Customer();

        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEnabled(true);
        newUser.setDateOfBirth(user.getDateOfBirth());
        // create Admin (1L) or User (2L)
        newUser.setRole(roleRepository.findById(2L).get());

        return customerRepository.save(newUser);
    }

    public Customer saveAdmin(CustomerDTO user) {
        Customer newUser = new Customer();

        newUser.setUsername("ADMIN");
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setFirstName("AdminFirstName");
        newUser.setLastName("AdminLastName");
        newUser.setEnabled(true);
        newUser.setDateOfBirth(new Date());
        // create Admin (1L) or User (2L)
        newUser.setRole(roleRepository.findById(1L).get());

        return customerRepository.save(newUser);
    }
}

