package com.example.kletterhalle.domains.climbingRoute.dto;

import com.example.kletterhalle.domains.climbingRoute.model.DifficultyLevelEnum;
import com.example.kletterhalle.domains.member.model.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class ClimbingRouteDto {
    private Long id;
    private String name;
    @Enumerated(EnumType.STRING)
    private DifficultyLevelEnum difficultyLevelEnum;
    private Set<Member> members = new HashSet<>();
}
