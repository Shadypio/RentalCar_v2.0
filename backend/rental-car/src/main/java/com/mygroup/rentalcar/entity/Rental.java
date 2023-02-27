package com.mygroup.rentalcar.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Table(name="rental")
@Getter
@Setter
public class Rental {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.DATE)
    @Column(name = "start_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "end_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date endDate;

    @OneToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_referred_customer", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JsonManagedReference
    private Customer referredCustomer;

    @OneToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_rented_car", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JsonManagedReference
    private Car rentedCar;

}
