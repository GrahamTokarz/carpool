package com.example.carppool.trip;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Trip {
    
    private String trip_id;
    private String date; //TEMP
    private String name; 
    private String description;
    private @Id String owner_id;

    Trip() {}

    public Trip(String trip_id, String date, String name, String description, String owner_id) {
        this.trip_id = trip_id;
        this.date = date;
        this.name = name;
        this.description = description;
        this.owner_id = owner_id;
    }

    public String getTrip_id() {
        return trip_id;
    }

    public void setTrip_id(String trip_id) {
        this.trip_id = trip_id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
        if (!(o instanceof Trip)) {
            return false;
        }
        Trip trip = (Trip) o;
        return Objects.equals(this.trip_id, trip.trip_id) &&
            Objects.equals(this.date, trip.date) && Objects.equals(this.name, trip.name) &&
            Objects.equals(this.description, trip.description) && Objects.equals(this.owner_id, trip.owner_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.trip_id, this.date, this.name, this.description, this.owner_id);
    }

    @Override
    public String toString() {
        return "Trip{" + "trip_id='" + this.trip_id + '\'' +
            ", date='" + this.date + '\'' +
            ", name='" + this.name + '\'' +
            ", description='" + this.description + '\'' +
            ", owner_id='" + this.owner_id + '\'' + '}';
    }
}
