package com.mygroup.rentalcar.controller;

import com.mygroup.rentalcar.entity.Car;
import com.mygroup.rentalcar.service.car.ICarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private ICarService carService;

    @PostMapping
    public ResponseEntity<Void> placeCar(@RequestBody Car car) {
        this.carService.placeCar(car);
        return ResponseEntity.ok().build();
    }

    // to review
    @PutMapping("/{id}/car")
    public void updateCar(@PathVariable(value="id") Long id, @RequestBody Car car){

        this.carService.updateCar(id, car);
    }

    @GetMapping
    public List<Car> getAllCars() {
        return this.carService.getAllCars();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> findCarById(@PathVariable(value="id") Long id) {
        return this.carService.getCarById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable(value="id") Long id) {
        this.carService.delete(id);

    }


}
