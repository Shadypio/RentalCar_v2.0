package com.mygroup.rentalcar.controller;

import com.mygroup.rentalcar.entity.Car;
import com.mygroup.rentalcar.entity.Customer;
import com.mygroup.rentalcar.entity.Rental;
import com.mygroup.rentalcar.entity.User;
import com.mygroup.rentalcar.service.customer.CustomerServiceImpl;
import com.mygroup.rentalcar.service.customer.ICustomerService;
import com.mygroup.rentalcar.service.role.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private ICustomerService customerService;

    @Autowired
    private IRoleService roleService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    /*
    @PostMapping
    public ResponseEntity<Void> placeCustomer(@RequestBody Customer customer) {
        this.customerService.placeCustomer(customer);
        return ResponseEntity.ok().build();
    }*/

    @PostMapping
    public void placeCustomer(@RequestBody Customer customer) {

        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        //customer.setRole(this.roleService.getRoleById(2L));
        System.out.println("nn va");
        System.out.println(customer.toString());
        this.customerService.placeCustomer(customer);

    }

    @PutMapping("/{id}")
    public void updateCustomer(@PathVariable(value="id") Long id, @RequestBody Customer customer){
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        this.customerService.updateCustomer(id, customer);
    }

    @GetMapping
    public List<Customer> getAllCustomers() {

        return this.customerService.getAllCustomers();
    }

    @GetMapping(produces = "application/json")
    @RequestMapping({ "/validateLogin" })
    public User validateLogin() {
        return new User("User successfully authenticated");
    }

    @GetMapping("/{id}")
    public Customer findCustomerById(@PathVariable(value="id") Long id) {

        return this.customerService.getCustomerById(id).getBody();
    }

    @GetMapping("/{id}/rentalMade")
    public Rental findRentalMade(@PathVariable(value="id") Long id) {

        return this.customerService.getCustomerById(id).getBody().getRentalMade();
    }

    //@GetMapping("?username={username}")
    @RequestMapping({ "/username/{username}" })
    public Customer findCustomerByUsername(@PathVariable("username") String username) {

        return this.customerService.getCustomerByUsername(username);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable(value="id") Long id) {
        this.customerService.delete(id);

    }




}
