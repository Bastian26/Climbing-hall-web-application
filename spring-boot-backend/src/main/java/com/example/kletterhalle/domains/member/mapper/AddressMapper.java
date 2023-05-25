package com.example.kletterhalle.domains.member.mapper;

import com.example.kletterhalle.domains.member.dto.AddressDto;
import com.example.kletterhalle.domains.member.dto.MemberDto;
import com.example.kletterhalle.domains.member.model.Address;
import com.example.kletterhalle.domains.member.model.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    AddressDto toDto(Address address);
    Address ToModel(AddressDto addressDto);
}
