package com.example.kletterhalle.domains.climbingRoute.mapper;

import com.example.kletterhalle.domains.climbingRoute.dto.ClimbingRouteDto;
import com.example.kletterhalle.domains.climbingRoute.model.ClimbingRoute;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClimbingRouteMapper {

    ClimbingRouteDto toDto(ClimbingRoute climbingRoute);
    ClimbingRoute toModel(ClimbingRouteDto climbingRouteDto);
}
