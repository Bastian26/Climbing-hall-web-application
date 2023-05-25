package com.example.kletterhalle.domains.climbingRoute.service;

import com.example.kletterhalle.domains.climbingRoute.dto.ClimbingRouteDto;
import com.example.kletterhalle.domains.climbingRoute.mapper.ClimbingRouteMapper;
import com.example.kletterhalle.domains.climbingRoute.model.ClimbingRoute;
import com.example.kletterhalle.domains.climbingRoute.repository.ClimbingRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClimbingRouteService {

    private final ClimbingRouteRepository climbingRouteRepository;

    private final ClimbingRouteMapper mapper;

    @Autowired
    public ClimbingRouteService(ClimbingRouteRepository climbingRouteRepository, ClimbingRouteMapper mapper) {
        this.climbingRouteRepository = climbingRouteRepository;
        this.mapper = mapper;
    }

    @Cacheable(cacheNames = "routes")
    public List<ClimbingRouteDto> getAllClimbingRoutes() {

        List<ClimbingRouteDto> climbingRoutesDto = climbingRouteRepository.findAll().stream()
                .filter(Objects::nonNull)
                .map(climbingRoute -> mapper.toDto(climbingRoute))
                .collect(Collectors.toList());

        return climbingRoutesDto;
    }

    @Cacheable(cacheNames = "routes", key="#id")
    public ClimbingRouteDto getClimbingRouteById(long id) {
        Optional<ClimbingRoute> climbingRouteData = climbingRouteRepository.findById(id);
        ClimbingRouteDto climbingRouteDto = null;
        if (climbingRouteData.isPresent()) {
            climbingRouteDto = mapper.toDto(climbingRouteData.get());
        }
        return climbingRouteDto;
    }

    public ClimbingRoute createClimbingRoute(ClimbingRouteDto climbingRouteDto) {
        return climbingRouteRepository.save(mapper.toModel(climbingRouteDto));
    }

    public ClimbingRoute updateClimbingRoute(long id, ClimbingRouteDto climbingRouteDto) {
        Optional<ClimbingRoute> climbingRouteData = climbingRouteRepository.findById(id);
        ClimbingRoute climbingRoute = null;
        if (climbingRouteData.isPresent()) {
            climbingRoute = mapper.toModel(climbingRouteDto);
            climbingRouteRepository.save(climbingRoute);
        }
        return climbingRoute;
    }

    public boolean deleteClimbingRoute(long id) {
        var isRemoved = false;
        Optional<ClimbingRoute> ClimbingRouteForDeletion = climbingRouteRepository.findById(id);
        if (ClimbingRouteForDeletion.isPresent()) {
            climbingRouteRepository.deleteById(id);
            isRemoved = true;
        }
        return isRemoved;
    }

    public boolean deleteAllclimbingRoutes() {
        var isRemoved = false;
        if (climbingRouteRepository.count() > 0) {
            climbingRouteRepository.deleteAll();
            isRemoved = true;
        }
        return isRemoved;
    }
}
