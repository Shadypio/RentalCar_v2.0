package com.mygroup.rentalcar.service.customer;

import com.mygroup.rentalcar.dao.CustomerRepository;
import com.mygroup.rentalcar.entity.Customer;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements ICustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    @Transactional
    public void placeCustomer(Customer customer) {
        this.customerRepository.save(customer);
    }

    @Override
    public void updateCustomer(Long id, Customer customerModified) {
        Optional<Customer> customerToModifyResponseEntity = this.customerRepository.findById(id);
        if(customerToModifyResponseEntity.isPresent()) {
            Customer customerToModify = ResponseEntity.ok().body(customerToModifyResponseEntity.get()).getBody();
            this.customerRepository.save(customerToModify);

        } else {
            System.out.println("errore update customer");
        }

    }

    @Override
    public List<Customer> getAllCustomers() {
        return this.customerRepository.findAll();
    }

    @Override
    public ResponseEntity<Customer> getCustomerById(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);

        if(customer.isPresent()) {
            return ResponseEntity.ok().body(customer.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public Customer getCustomerByUsername(String username) {
        return this.customerRepository.findCustomerByUsername(username);
    }

    @Override
    public void delete(Long id) {
        this.customerRepository.deleteById(id);
    }


}
