package com.example.kletterhalle.domains.member.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
@Table(name = "address")
public class Address {

    @NotBlank(message = "Street is mandatory")
    private String street;

    @Min(value = 1, message = "House number is mandatory")
    @Column(name = "house_number")
    private int houseNumber;

    @Pattern(regexp = "^\\d{5}$", message = "Postcode must have 5 digits")
    @Column(name = "post_code")
    private String postCode;
}
