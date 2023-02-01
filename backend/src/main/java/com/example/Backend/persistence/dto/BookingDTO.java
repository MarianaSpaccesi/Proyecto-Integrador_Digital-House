package com.example.Backend.persistence.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    private Integer id;
    private LocalTime startTime;
    private LocalDate bookingStartDate;
    private LocalDate bookingEndDate;
    private ProductDTO product;
}
