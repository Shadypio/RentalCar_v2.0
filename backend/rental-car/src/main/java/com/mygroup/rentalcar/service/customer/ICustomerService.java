package com.mygroup.rentalcar.service.customer;

import com.mygroup.rentalcar.entity.Customer;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ICustomerService {

    public void placeCustomer(Customer customer);
    public List<Customer> getAllCustomers();
    public ResponseEntity<Customer> getCustomerById(Long id);
    public void delete(Long id);

    void updateCustomer(Long id, Customer customerModified);
}
