package com.example.kletterhalle.domains.member.model;

import com.example.kletterhalle.domains.climbingRoute.model.ClimbingRoute;
import lombok.*;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "First name is mandatory")
    private String firstName;

    @NotBlank(message = "Last name is mandatory")
    private String lastName;

    @Valid
    @Embedded
    private Address address;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "member_routes",
            joinColumns = {
                    @JoinColumn(name = "member_id", referencedColumnName = "id",
                            nullable = false, updatable = false)},
            inverseJoinColumns = {
                    @JoinColumn(name = "route_id", referencedColumnName = "id",
                            nullable = false, updatable = false)})

    private Set<ClimbingRoute> favouriteRoutes = new HashSet<>();

    public Member(String firstName, String lastName, Address address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
    }

    public void addFavouriteRoute(ClimbingRoute favouriteRoute) {
        favouriteRoutes.add(favouriteRoute);
        favouriteRoute.getMembers().add(this);
    }

    public void removeFavouriteRoute(ClimbingRoute favouriteRoute) {
        favouriteRoutes.remove(favouriteRoute);
        favouriteRoute.getMembers().remove(this);
    }

//    public Set<ClimbingRoute> getFavouriteRoutes() {
//        return favouriteRoutes;
//    }
//
//    public void setFavouriteRoutes(Set<ClimbingRoute> favouriteRoutes) {
//        this.favouriteRoutes = favouriteRoutes;
//    }
}
