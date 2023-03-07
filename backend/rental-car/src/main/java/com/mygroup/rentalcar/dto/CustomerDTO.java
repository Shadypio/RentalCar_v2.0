package com.mygroup.rentalcar.dto;

import com.mygroup.rentalcar.entity.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CustomerDTO {

    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private Date dateOfBirth;

    private Role role;

    /*
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    */

}