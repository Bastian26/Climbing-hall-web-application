package com.example.kletterhalle.domains.climbingRoute.controller;

import com.example.kletterhalle.domains.advice.NotFoundException;
import com.example.kletterhalle.domains.climbingRoute.dto.ClimbingRouteDto;
import com.example.kletterhalle.domains.climbingRoute.model.DifficultyLevelEnum;
import com.example.kletterhalle.domains.climbingRoute.service.ClimbingRouteService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

//@ExtendWith(SpringExtension.class)
@WebMvcTest(ClimbingRouteController.class)
public class ClimbingRouteControllerTest {

    @MockBean
    private ClimbingRouteService climbingRouteService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    static private ClimbingRouteDto climbingRoute1;
    static private ClimbingRouteDto climbingRoute2;
    static private List<ClimbingRouteDto> climbingRouteDtos;

    @BeforeAll
    static void setUp() {
        climbingRoute1 = new ClimbingRouteDto(1L, "Test route 1", DifficultyLevelEnum.EASY, null);
        climbingRoute2 = new ClimbingRouteDto(2L, "Test route 2", DifficultyLevelEnum.MEDIUM, null);
        climbingRouteDtos = List.of(climbingRoute1, climbingRoute2);
    }

    @Test
    void shouldreturnListOfClimbingRoutes() throws Exception {
        when(climbingRouteService.getAllClimbingRoutes()).thenReturn(climbingRouteDtos);
        mockMvc.perform(get("/climbingRoutes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(climbingRouteDtos.size()))
                .andDo(print());
    }


    @Test
    void shouldReturnOneClimbingRoute() throws Exception {
        when(climbingRouteService.getClimbingRouteById(1)).thenReturn(climbingRoute1);
        mockMvc.perform(get("/climbingRoute/1")).andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(climbingRoute1.getId()))
                .andExpect(jsonPath("$.name").value(climbingRoute1.getName()))
                .andExpect(jsonPath("$.difficultyLevelEnum").value(climbingRoute1.getDifficultyLevelEnum().toString()))
                .andDo(print());
    }

    /**
     * Negativtest für getClimbingRouteById
     * @throws Exception
     */
    @Test
    void shouldReturnRouteNotFound() throws Exception {
        long id = 3L;

        when(climbingRouteService.getClimbingRouteById(id)).thenReturn(null);
        mockMvc.perform(get("/climbingRoute/{id}", id))
                .andExpect(status().isBadRequest())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof NotFoundException))
                .andExpect(result -> assertEquals("Route not found", result.getResolvedException().getMessage()));
    }

    // todo: hier weitermachen
//    @Test
//    void shouldCreateClimbingRoute() throws Exception {
//        mockMvc.perform(post("/climbingRoute").contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(climbingRoute1))
//                .andExpect(status().isCreated())
//                .andDo(print());
//    }

//    @Test
//    void updateClimbingRoute() {
//        ClimbingRouteDto updatedClimbingRoute = new ClimbingRouteDto(1L, "Updated", DifficultyLevelEnum.HELL, true);
//
//        when(climbingRouteService.getClimbingRouteById(1L)).thenReturn(climbingRoute1);
//        when(climbingRouteService.createClimbingRoute(any(ClimbingRouteDto.class))).thenReturn(updatedClimbingRoute);
//
//        mockMvc.perform(put("climbingRoute/", 1L).contentType(MediaType.APPLICATION_JSON)
//                        .content(updatedClimbingRoute))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.title").value(updatedtutorial.getTitle()))
//                .andExpect(jsonPath("$.description").value(updatedtutorial.getDescription()))
//                .andExpect(jsonPath("$.published").value(updatedtutorial.isPublished()))
//                .andDo(print());
//    }
//
//    @Test
//    void deleteclimbingRoute() {
//        long id = 1L;
//
//        doNothing().when(tutorialRepository).deleteById(id);
//        mockMvc.perform(delete("/api/tutorials/{id}", id))
//                .andExpect(status().isNoContent())
//                .andDo(print());
//    }
//
//    @Test
//    void deleteAllclimbingRoutes() {
//        doNothing().when(tutorialRepository).deleteAll();
//        mockMvc.perform(delete("/api/tutorials"))
//                .andExpect(status().isNoContent())
//                .andDo(print());
//    }
}

