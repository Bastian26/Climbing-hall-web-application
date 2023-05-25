//package com.example.kletterhalle.domains.climbingRoute.controller;
//
//import com.example.kletterhalle.domains.climbingRoute.dto.ClimbingRouteDto;
//import com.example.kletterhalle.domains.climbingRoute.model.DifficultyLevelEnum;
//import com.example.kletterhalle.domains.climbingRoute.service.ClimbingRouteService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.Mock;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.util.List;
//import java.util.Optional;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.when;
//import static org.springframework.http.RequestEntity.put;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@ExtendWith(SpringExtension.class)
//@WebMvcTest(ClimbingRouteController.class)
//public class ClimbingRouteControllerTest {
//
//    @MockBean
//    private ClimbingRouteService climbingRouteService;
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    static private ClimbingRouteDto climbingRoute1;
//    static private ClimbingRouteDto climbingRoute2;
//    static private List<ClimbingRouteDto> climbingRouteDtos;
//
//    @BeforeAll
//    static void setUp() {
//        climbingRoute1 = new ClimbingRouteDto(1L, "Test route 1", DifficultyLevelEnum.EASY, null);
//        climbingRoute2 = new ClimbingRouteDto(2L, "Test route 2", DifficultyLevelEnum.MEDIUM, null);
//        climbingRouteDtos = List.of(climbingRoute1, climbingRoute2);
//    }
//
//    @Test
//    void getAllClimbingRoutes() throws Exception {
//        when(climbingRouteService.getAllClimbingRoutes()).thenReturn(c);
//        mockMvc.perform(get("/climbingRoutes"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.size()").value(climbingRouteDtos.size()))
//                .andDo(print());
//    }
//
//
//    @Test
//    void getClimbingRouteById() throws Exception {
//        when(climbingRouteService.getClimbingRouteById(1)).thenReturn(climbingRoute1);
//        mockMvc.perform(get("/climbingRoute/1")).andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(climbingRoute1.getId()))
//                .andExpect(jsonPath("$.name").value(climbingRoute1.getName()))
//                .andExpect(jsonPath("$.difficultyLevelEnum").value(climbingRoute1.getDifficultyLevelEnum()))
//                .andDo(print());
//    }
//
//    @Test
//    void createclimbingRoute() throws Exception {
//        mockMvc.perform(post("/climbingRoute").contentType(MediaType.APPLICATION_JSON)
//                        .content(String.valueOf(climbingRoute1)))
//                .andExpect(status().isCreated())
//                .andDo(print());
//    }
//
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
//    }
//}
//
