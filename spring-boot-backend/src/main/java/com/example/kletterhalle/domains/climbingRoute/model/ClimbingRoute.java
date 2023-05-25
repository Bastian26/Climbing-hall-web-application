package com.example.kletterhalle.domains.climbingRoute.model;

import com.example.kletterhalle.domains.member.model.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
@EqualsAndHashCode
@Entity
@Table(name = "climbing_route")
public class ClimbingRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "difficulty_level")
    private DifficultyLevelEnum difficultyLevelEnum;

    // Without @OnDelete it would create an Constraint Violation Exception - no Cascade on both sides
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToMany(mappedBy = "favouriteRoutes", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Member> members = new HashSet<>();

    public ClimbingRoute(String name, DifficultyLevelEnum difficultyLevelEnum) {
        this.name = name;
        this.difficultyLevelEnum = difficultyLevelEnum;
    }
}
