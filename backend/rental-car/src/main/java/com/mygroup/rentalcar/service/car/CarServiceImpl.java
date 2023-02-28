package com.mygroup.rentalcar.service.car;

import com.mygroup.rentalcar.dao.CarRepository;
import com.mygroup.rentalcar.entity.Car;
import com.mygroup.rentalcar.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CarServiceImpl implements ICarService {

    @Autowired
    private CarRepository carRepository;


    @Override
    @Transactional
    public void placeCar(Car car) {
        this.carRepository.save(car);
    }

    @Override
    public void updateCar(Long id, Car carModified) {
        Optional<Car> carToModifyResponseEntity = this.carRepository.findById(id);
        if(carToModifyResponseEntity.isPresent()) {
            Car carToModify = ResponseEntity.ok().body(carToModifyResponseEntity.get()).getBody();
            this.carRepository.save(carToModify);

        } else {
            System.out.println("errore update car");
        }
    }

    @Override
    public List<Car> getAllCars() {
        return this.carRepository.findAll();
    }

    @Override
    public ResponseEntity<Car> getCarById(Long id) {
        Optional<Car> car = carRepository.findById(id);

        if(car.isPresent()) {
            return ResponseEntity.ok().body(car.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public void delete(Long id) {
        this.carRepository.deleteById(id);
    }


}
