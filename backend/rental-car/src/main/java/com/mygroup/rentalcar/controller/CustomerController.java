package com.mygroup.rentalcar.controller;

import com.mygroup.rentalcar.entity.Customer;
import com.mygroup.rentalcar.entity.Rental;
import com.mygroup.rentalcar.service.customer.CustomerServiceImpl;
import com.mygroup.rentalcar.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private ICustomerService customerService;

    @PostMapping
    public void placeCustomer(@RequestBody Customer customer){

        this.customerService.placeCustomer(customer);
    }

    @PutMapping("/{id}/customer")
    public void updateCustomer(@PathVariable(value="id") Long id, @RequestBody Customer customer){

        this.customerService.updateCustomer(id, customer);
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return this.customerService.getAllCustomers();
    }

    @GetMapping(produces = "application/json")
    @RequestMapping({ "/validateLogin" })
    public Customer validateLogin() {
        return new Customer();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> findCustomerById(@PathVariable(value="id") Long id) {
        return this.customerService.getCustomerById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable(value="id") Long id) {
        this.customerService.delete(id);

    }




}
