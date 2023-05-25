package com.example.kletterhalle.domains.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDto {

    private String street;
    private int houseNumber;
    private String postCode;
}
