package com.example.kletterhalle.domains.climbingRoute.controller;

import com.example.kletterhalle.domains.climbingRoute.dto.ClimbingRouteDto;
import com.example.kletterhalle.domains.climbingRoute.model.ClimbingRoute;
import com.example.kletterhalle.domains.climbingRoute.model.DifficultyLevelEnum;
import com.example.kletterhalle.domains.climbingRoute.service.ClimbingRouteService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(ClimbingRouteController.class)
class ClimbingRouteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        ClimbingRoute climbingRoute = new ClimbingRoute("Highway to Hell", DifficultyLevelEnum.EASY);
    }

    @AfterEach
    void tearDown() {

    }

    @Test
    void getAllClimbingRoutes() throws Exception {
        /*ClimbingRouteController climbingRouteController = new ClimbingRouteController(climbingRouteService); //Arrange
        ResponseEntity<List<ClimbingRouteDto>> response = climbingRouteController.getAllClimbingRoutes(); //Act
        System.out.println(climbingRouteController.getAllClimbingRoutes());
        assertEquals(response, response);//Assert*/

//        RequestBuilder request = MockMvcRequestBuilders.get("/climbingRoutes");
//        MvcResult result = mockMvc.perform(request).andReturn();
//        assertEquals("dsds", result.getResponse().getContentAsString());
//        this.mockMvc.perform(get("/climbingRoutes")).andDo(print()).andExpect(status().isOk());

        mockMvc.perform(get("/climbingRoutes")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getClimbingRouteById() throws Exception {
//        mockMvc.perform(get("/climbingRoutes/1")).andExpect(content().string("Hello, Dan"));
        this.mockMvc.perform(get("/climbingRoutes/1")).andDo(print()).andExpect(status().isNotFound());
    }

    @Test
    void createclimbingRoute() {
    }

    @Test
    void updateClimbingRoute() {
    }

    @Test
    void deleteclimbingRoute() {
    }

    @Test
    void deleteAllclimbingRoutes() {
    }
}