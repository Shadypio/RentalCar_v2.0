package com.mygroup.rentalcar.service.rental;

import com.mygroup.rentalcar.entity.Car;
import com.mygroup.rentalcar.entity.Rental;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IRentalService {

    public void placeRental(Rental rental);
    public List<Rental> getAllRentals();
    public ResponseEntity<Rental> getRentalById(Long id);
    public void delete(Long id);

}
