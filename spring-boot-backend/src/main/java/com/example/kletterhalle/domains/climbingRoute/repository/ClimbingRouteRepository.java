package com.example.kletterhalle.domains.climbingRoute.repository;

import com.example.kletterhalle.domains.climbingRoute.model.ClimbingRoute;
import com.example.kletterhalle.domains.member.model.Member;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ClimbingRouteRepository extends CrudRepository<ClimbingRoute, Long> {
    List<ClimbingRoute> findAll();
}
