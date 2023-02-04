package com.example.carppool;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.carppool.car.Car;
import com.example.carppool.car.CarRepository;
import com.example.carppool.people.People;
import com.example.carppool.people.PeopleRepository;
import com.example.carppool.trip.Trip;
import com.example.carppool.trip.TripRepository;

@Configuration
public class LoadDatabase {
    
    public static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initPeopleDatabase(PeopleRepository peopleRepository) {
        return args -> {
            log.info("Preloading " + peopleRepository.save(new People("TRIP01", "Bret", "123 House", "USER01")));
            log.info("Preloading " + peopleRepository.save(new People("TRIP01", "Garm", "321 House", "USER02")));
            log.info("Preloading " + peopleRepository.save(new People("TRIP01", "Simon", "985 House", "USER03")));
        };
    }

    @Bean
    CommandLineRunner initTripDatabase(TripRepository tripRepository) {
        return args -> {
            log.info("Preloading " + tripRepository.save(new Trip("TRIP01", "Tomorrow", "Example Trip", "An example trip for testing", "USER01")));
        };
    }

    @Bean
    CommandLineRunner initCarDatabase(CarRepository carRepository) {
        return args -> {
            log.info("Preloading " + carRepository.save(new Car("TRIP01", "98 Honda Civic", 5, "USER01, USER02", "MLC", "No room in trunk", "USER01")));
            log.info("Preloading " + carRepository.save(new Car("TRIP01", "Bicycle", 1, "USER03", "Garage", "Riding solo", "USER03")));
        };
    }
}
