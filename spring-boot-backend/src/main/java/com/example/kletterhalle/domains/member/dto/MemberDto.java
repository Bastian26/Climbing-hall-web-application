package com.example.kletterhalle.domains.member.dto;


import com.example.kletterhalle.domains.climbingRoute.dto.RouteDtoWithoutMemberList;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class MemberDto {

    @Id
    private Long id;
    private String firstName;
    private String lastName;
    private AddressDto addressDto;
    private Set<RouteDtoWithoutMemberList> favouriteRoutes = new HashSet<>();

}
