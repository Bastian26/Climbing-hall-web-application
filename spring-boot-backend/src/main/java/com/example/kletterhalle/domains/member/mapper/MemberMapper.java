package com.example.kletterhalle.domains.member.mapper;

import com.example.kletterhalle.domains.climbingRoute.mapper.ClimbingRouteMapper;
import com.example.kletterhalle.domains.member.dto.MemberDto;
import com.example.kletterhalle.domains.member.model.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {AddressMapper.class, FavouriteRoutesMapper.class})
public interface MemberMapper {

    @Mapping(source = "address", target = "addressDto")
    MemberDto toDto(Member member);

    @Mapping(source = "addressDto", target = "address")
    Member toModel(MemberDto memberDto);
}
