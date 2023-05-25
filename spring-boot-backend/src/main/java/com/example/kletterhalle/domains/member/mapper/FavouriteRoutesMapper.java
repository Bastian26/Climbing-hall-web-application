package com.example.kletterhalle.domains.member.mapper;

import com.example.kletterhalle.domains.climbingRoute.dto.ClimbingRouteDto;
import com.example.kletterhalle.domains.climbingRoute.mapper.ClimbingRouteMapper;
import com.example.kletterhalle.domains.climbingRoute.model.ClimbingRoute;
import org.mapstruct.Mapper;

import java.util.HashSet;
import java.util.Set;

@Mapper(componentModel = "spring", uses = ClimbingRouteMapper.class)
public interface FavouriteRoutesMapper {

    Set<ClimbingRouteDto> ToDto(Set<ClimbingRoute> favouriteRoutes);
    Set<ClimbingRoute> ToModel(Set<ClimbingRouteDto> favouriteRoutesDto);

}
