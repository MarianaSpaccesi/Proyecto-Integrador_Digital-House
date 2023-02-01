package com.example.Backend.persistence.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class BusyDatesDTO {
    private Integer id;
    private List<LocalDate> notAvailableDates;
}
