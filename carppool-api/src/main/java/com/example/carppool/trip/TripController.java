package com.example.carppool.trip;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TripController {
    
    private final TripRepository repository;

    TripController(TripRepository tripRepository) {
        this.repository = tripRepository;
    }

    @GetMapping("/trip")
    List<Trip> getTrip(@RequestParam(value = "trip_id", defaultValue = "null") String trip_id) {
        List<Trip> list = repository.findAll();
        if (trip_id.equals("null")) {
            return list;
        }
        else {
            for (final Trip t : list) {
                if (t.getTrip_id().equalsIgnoreCase(trip_id)) {
                    List<Trip> foundTrip = new ArrayList<Trip>();
                    foundTrip.add(t);
                    return foundTrip;
                }
            }
        }
        return null;
    }

    @PostMapping("/trip")
    Trip newTrip(@RequestBody Trip newTrip) {
        return repository.save(newTrip);
    }

    @PutMapping("/trip")
    Trip replaceTrip(@RequestParam(value = "trip_id", defaultValue = "null") String trip_id, @RequestBody Trip newTrip) {
        List<Trip> list = repository.findAll();
        if (trip_id.equals("null")) {
            return repository.save(newTrip);
        }
        else {
            for (final Trip t : list) {
                if (t.getTrip_id().equalsIgnoreCase(trip_id)) {
                    t.setTrip_id(newTrip.getTrip_id());
                    t.setDate(newTrip.getDate());
                    t.setName(newTrip.getName());
                    t.setDescription(newTrip.getDescription());
                    t.setOwner_id(newTrip.getOwner_id());
                    return repository.save(t);
                }
            }
        }
        return null;
    }
}

