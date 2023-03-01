package com.mygroup.rentalcar.controller;

import com.mygroup.rentalcar.entity.Rental;
import com.mygroup.rentalcar.service.rental.IRentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    @Autowired
    private IRentalService rentalService;

    @PostMapping
    public void placeRental(@RequestBody Rental rental){
        this.rentalService.placeRental(rental);
    }


    @GetMapping
    public List<Rental> getAllRentals() {
        return this.rentalService.getAllRentals();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rental> findRentalById(@PathVariable(value="id") Long id) {
        return this.rentalService.getRentalById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteRental(@PathVariable(value="id") Long id) {
        this.rentalService.delete(id);
    }

}
