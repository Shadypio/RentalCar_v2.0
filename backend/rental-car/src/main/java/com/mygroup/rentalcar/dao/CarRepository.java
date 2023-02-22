package com.mygroup.rentalcar.dao;

import com.mygroup.rentalcar.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Long> {
}
