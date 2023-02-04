package com.example.carppool.people;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class People {
    
    private String trip_id;
    private String name;
    private String address;
    private @Id String user_id;

    People() {}

    public People(String trip_id, String name, String address, String user_id) {
        this.trip_id = trip_id;
        this.name = name;
        this.address = address;
        this.user_id = user_id;
    }

    public String getTrip_id() {
        return trip_id;
    }

    public void setTrip_id(String trip_id) {
        this.trip_id = trip_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof People)) {
            return false;
        }
        People people = (People) o;
        return Objects.equals(this.trip_id, people.trip_id) && Objects.equals(this.name, people.name) && 
            Objects.equals(this.address, people.address) && Objects.equals(this.user_id, people.user_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.trip_id, this.name, this.address, this.user_id);
    }

    @Override
    public String toString() {
        return "Person{" + "trip_id='" + this.trip_id + '\'' +
            ", name='" + this.name + '\'' +
            ", address='" + this.address + '\'' +
            ", user_id='" + this.user_id + '\'' + '}';
    }
}
