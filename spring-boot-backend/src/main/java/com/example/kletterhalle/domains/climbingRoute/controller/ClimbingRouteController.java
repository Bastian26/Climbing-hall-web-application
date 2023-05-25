package com.example.kletterhalle.domains.climbingRoute.controller;

import com.example.kletterhalle.domains.advice.NotFoundException;
import com.example.kletterhalle.domains.climbingRoute.dto.ClimbingRouteDto;
import com.example.kletterhalle.domains.climbingRoute.model.ClimbingRoute;
import com.example.kletterhalle.domains.climbingRoute.service.ClimbingRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping()
public class ClimbingRouteController {

    private final ClimbingRouteService climbingRouteService;

    @Autowired
    public ClimbingRouteController(ClimbingRouteService climbingRouteService) {
        this.climbingRouteService = climbingRouteService;
    }

    @GetMapping("/climbingRoutes")
    public ResponseEntity<List<ClimbingRouteDto>> getAllClimbingRoutes() throws NotFoundException {
        List<ClimbingRouteDto> climbingRoutes = climbingRouteService.getAllClimbingRoutes();
        if (climbingRoutes == null) {
            throw new NotFoundException("No Routes found");
        }  else {
            return new ResponseEntity<>(climbingRoutes, HttpStatus.OK);
        }
    }

    @GetMapping("/climbingRoute/{id}")
    public ResponseEntity<ClimbingRouteDto> getClimbingRouteById(@PathVariable("id") long id) {
        ClimbingRouteDto climbingRoute = climbingRouteService.getClimbingRouteById(id);
        if (climbingRoute == null) {
            throw new NotFoundException("Route not found");
        }  else {
            return new ResponseEntity<>(climbingRoute, HttpStatus.OK);
        }
    }

    @PostMapping("/climbingRoute")
    public ResponseEntity<ClimbingRoute> createClimbingRoute(@Valid @RequestBody ClimbingRouteDto climbingRouteDto) {
        ClimbingRoute climbingRoute = climbingRouteService.createClimbingRoute(climbingRouteDto);
        return new ResponseEntity<>(climbingRoute, HttpStatus.CREATED);
    }

    @PutMapping("/climbingRoute/{id}")
    public ResponseEntity<ClimbingRoute> updateClimbingRoute(@PathVariable("id") long id, @Valid @RequestBody ClimbingRouteDto climbingRouteDto) {
        ClimbingRoute climbingRoute = climbingRouteService.updateClimbingRoute(id, climbingRouteDto);
        if (climbingRoute == null) {
            throw new NotFoundException(String.format("No Route with id %d found", id));
        } else {
            return new ResponseEntity<>(climbingRoute, HttpStatus.OK);
        }
    }

    @DeleteMapping("/climbingRoute/{id}")
    public ResponseEntity<HttpStatus> deleteClimbingRoute(@PathVariable("id") long id) {
        var removed = climbingRouteService.deleteClimbingRoute(id);
        if (!removed) {
            throw new NotFoundException(String.format("No Route with id %d found", id));
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/climbingRoutes")
    public ResponseEntity<HttpStatus> deleteAllClimbingRoutes() {
        var removed = climbingRouteService.deleteAllclimbingRoutes();
        if (!removed) {
            throw new NotFoundException(String.format("No climbingRoutes found"));
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
