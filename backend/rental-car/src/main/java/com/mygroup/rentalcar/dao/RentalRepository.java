package com.mygroup.rentalcar.dao;


import com.mygroup.rentalcar.entity.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

//@CrossOrigin("http://localhost:4200")
public interface RentalRepository extends JpaRepository<Rental, Long> {
}
