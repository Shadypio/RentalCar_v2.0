package com.mygroup.rentalcar.service;

import com.mygroup.rentalcar.dao.RentalRepository;
import com.mygroup.rentalcar.entity.Car;
import com.mygroup.rentalcar.entity.Customer;
import com.mygroup.rentalcar.entity.Rental;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RentalServiceImpl implements IRentalService{

    @Autowired
    private RentalRepository rentalRepository;

    @Override
    @Transactional
    public void placeRental(Rental rental) {
        this.rentalRepository.save(rental);

    }

    @Override
    public List<Rental> getAllRentals() {
        return this.rentalRepository.findAll();
    }

    @Override
    public ResponseEntity<Rental> getRentalById(Long id) {
        Optional<Rental> rental = rentalRepository.findById(id);

        if(rental.isPresent()) {
            return ResponseEntity.ok().body(rental.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public void delete(Long id) {
        this.rentalRepository.deleteById(id);
    }


}
