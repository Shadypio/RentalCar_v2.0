package com.mygroup.rentalcar.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Table(name="customer")
@Getter
@Setter
@ToString
public class Customer {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "username", unique=true)
    private String username;

    @Column(name = "password")
    private String password;

    @Temporal(TemporalType.DATE)
    @Column(name = "date_of_birth")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dateOfBirth;

    @Column(name = "enabled")
    private Boolean enabled;

    @OneToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_id_role", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private Role role;

    @OneToOne(mappedBy = "referredCustomer", orphanRemoval = true)
    @JsonBackReference
    private Rental rentalMade;
}
