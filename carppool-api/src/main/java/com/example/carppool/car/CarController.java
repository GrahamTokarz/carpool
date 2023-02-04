package com.example.carppool.car;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CarController {
    
    private final CarRepository repository;

    CarController(CarRepository carRepository) {
        this.repository = carRepository;
    }

    @GetMapping("/car")
    List<Car> getCar(@RequestParam(value = "owner_id", defaultValue = "null") String owner_id) {
        List<Car> list = repository.findAll();
        if (owner_id.equals("null")) {
            return list;
        }
        else {
            for (final Car c : list) {
                if (c.getOwner_id().equals(owner_id)) {
                    List<Car> foundCar = new ArrayList<Car>();
                    foundCar.add(c);
                    return foundCar;
                }
            }
        }
        return null;
    }

    @PostMapping("/car")
    Car newCar(@RequestBody Car newCar) {
        return repository.save(newCar);
    }

    @PutMapping("/car")
    Car replaceCar(@RequestParam(value = "owner_id", defaultValue = "null") String owner_id, @RequestBody Car newCar) {
        List<Car> list = repository.findAll();
        if (owner_id.equals("null")) {
            return repository.save(newCar);
        }
        else {
            for (final Car c : list) {
                if (c.getOwner_id().equals(owner_id)) {
                    c.setTrip_id(newCar.getTrip_id());
                    c.setModel(newCar.getModel());
                    c.setCapacity(newCar.getCapacity());
                    c.setRiders(newCar.getRiders());
                    c.setLocation(newCar.getLocation());
                    c.setNotes(newCar.getNotes());
                    c.setOwner_id(newCar.getOwner_id());
                    return repository.save(c);
                }
            }
        }
        return null;
    }

}
