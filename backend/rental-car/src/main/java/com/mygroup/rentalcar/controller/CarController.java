package com.mygroup.rentalcar.controller;

import com.mygroup.rentalcar.entity.Car;
import com.mygroup.rentalcar.entity.Customer;
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
    public void placeCar(@RequestBody Car car) {
        this.carService.placeCar(car);
    }

    @PutMapping("/{id}/car")
    public void updateCar(@PathVariable(value="id") Long id, @RequestBody Car car){

        this.carService.updateCar(id, car);
    }

    @GetMapping
    public List<Car> getAllCars() {
        /*
        List<Car> cars = this.carService.getAllCars();
        for (Car car : cars) {
            System.out.println(car.toString());
        }*/
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
