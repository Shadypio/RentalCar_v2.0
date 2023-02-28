package com.mygroup.rentalcar.service.car;

import com.mygroup.rentalcar.entity.Car;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ICarService {

    public void placeCar(Car car);
    public List<Car> getAllCars();
    public ResponseEntity<Car> getCarById(Long id);
    public void delete(Long id);

    void updateCar(Long id, Car carModified);
}
