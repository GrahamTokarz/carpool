package com.example.carppool.people;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PeopleController {
    
    private final PeopleRepository repository;

    PeopleController(PeopleRepository peopleRepository) {
        this.repository = peopleRepository;
    }
    
    @GetMapping("/people")
    List<People> getPeople(@RequestParam(value = "user_id", defaultValue = "null") String user_id) {
        List<People> list = repository.findAll();
        if (user_id.equals("null")) {
            return list;
        }
        else {
            for (final People p : list) {
                if (p.getUser_id().equals(user_id)) {
                    List<People> foundPerson = new ArrayList<People>();
                    foundPerson.add(p);
                    return foundPerson;
                }
            }
        }
        return null;
    }

    @PostMapping("/people")
    People newPeople(@RequestBody People newPeople) {
        return repository.save(newPeople);
    }

    @PutMapping("/people")
    People replacePeople(@RequestParam(value = "user_id", defaultValue = "null") String user_id, @RequestBody People newPeople) {
        List<People> list = repository.findAll();
        if (user_id.equals("null")) {
            return repository.save(newPeople);
        }
        else {
            for (final People p : list) {
                if (p.getUser_id().equals(user_id)) {
                    p.setTrip_id(newPeople.getTrip_id());
                    p.setName(newPeople.getName());
                    p.setAddress(newPeople.getAddress());
                    return repository.save(p);
                }
            }
        }
        return null;
    }

}
