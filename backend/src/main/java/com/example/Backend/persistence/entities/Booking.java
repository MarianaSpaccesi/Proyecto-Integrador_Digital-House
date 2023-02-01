package com.example.Backend.persistence.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.*;

@Getter @Setter
@Entity
@Table(name = "booking")
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="startTime", nullable = false)
    @JsonFormat(pattern = "hh:mm:ss")
    private LocalTime startTime;

    @Column(name="bookingStartDate", nullable = false)
    private LocalDate bookingStartDate;

    @Column(name="bookingEndDate", nullable = false)
    private LocalDate bookingEndDate;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="product_id", nullable = false, referencedColumnName = "id")
    private Product product;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="user_id")
    private AppUser user;

}
