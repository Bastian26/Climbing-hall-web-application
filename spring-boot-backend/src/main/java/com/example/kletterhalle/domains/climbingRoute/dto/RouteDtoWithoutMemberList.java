package com.example.kletterhalle.domains.climbingRoute.dto;

import com.example.kletterhalle.domains.climbingRoute.model.DifficultyLevelEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
public class RouteDtoWithoutMemberList {
    private Long id;
    private String name;
    @Enumerated(EnumType.STRING)
    private DifficultyLevelEnum difficultyLevelEnum;

}
