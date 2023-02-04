package com.example.carppool.car;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Car {
    
    private String trip_id;
    private String model;
    private Integer capacity;
    private String riders;
    private String location;
    private String notes;
    private @Id String owner_id;

    Car() {}

    public Car(String trip_id, String model, Integer capacity, String riders, String location, String notes,
            String owner_id) {
        this.trip_id = trip_id;
        this.model = model;
        this.capacity = capacity;
        this.riders = riders;
        this.location = location;
        this.notes = notes;
        this.owner_id = owner_id;
    }

    public String getTrip_id() {
        return trip_id;
    }

    public void setTrip_id(String trip_id) {
        this.trip_id = trip_id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getRiders() {
        return riders;
    }

    public void setRiders(String riders) {
        this.riders = riders;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getOwner_id() {
        return owner_id;
    }

    public void setOwner_id(String owner_id) {
        this.owner_id = owner_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Car)) {
            return false;
        }
        Car car = (Car) o;
        return Objects.equals(this.trip_id, car.trip_id) &&
            Objects.equals(this.model, car.model) && Objects.equals(this.capacity, car.capacity) &&
            Objects.equals(this.riders, car.riders) && Objects.equals(this.location, car.location) &&
            Objects.equals(this.notes, car.notes) && Objects.equals(this.owner_id, car.owner_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.trip_id, this.model, this.capacity, this.riders, this.location, this.notes, this.owner_id);
    }

    @Override
    public String toString() {
        return "Car{" + "trip_id='" + this.trip_id + '\'' + 
            ", model='" + this.model + '\'' +
            ", capacity=" + this.capacity + 
            ", riders='" + this.riders + '\'' +
            ", location='" + this.location + '\'' +
            ", notes='" + this.notes + '\'' +
            ", owner_id='" + this.owner_id + '\'' + '}';
    }
}
