package com.example.kletterhalle.domains;

import com.example.kletterhalle.domains.climbingRoute.model.ClimbingRoute;
import com.example.kletterhalle.domains.climbingRoute.model.DifficultyLevelEnum;
import com.example.kletterhalle.domains.climbingRoute.repository.ClimbingRouteRepository;
import com.example.kletterhalle.domains.member.model.Address;
import com.example.kletterhalle.domains.member.model.Member;
import com.example.kletterhalle.domains.member.repository.MemberRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class BootStrapData implements CommandLineRunner {

    private final MemberRepository memberRepository;
    private final ClimbingRouteRepository climbingRouteRepository;

    public BootStrapData(MemberRepository memberRepository, ClimbingRouteRepository climbingRouteRepository) {
        this.memberRepository = memberRepository;
        this.climbingRouteRepository = climbingRouteRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println("Started in Bootstrap");

        // Member creation
        Member member = new Member(
                "Anton",
                "Karton",
                new Address("Eisenbahnstr.", 7, "12345")
                );

        Member member2 = new Member(
                "Max",
                "Mustermann",
                new Address("Musterstraße", 72, "64345")
        );

        Member member3 = new Member(
                "Bea",
                "Bohne",
                new Address("Bohnenstraße", 66, "75345")
        );

        Member member4 = new Member(
                "Tina",
                "Ton",
                new Address("Tonstraße", 7, "33345")
        );

        Member member5 = new Member(
                "Georg",
                "Guse",
                new Address("Hauptstraße", 99, "44345")
        );

        Member member6 = new Member(
                "Anna",
                "Auerbach",
                new Address("Heegstraße", 78, "99345")
        );

        // save member
        memberRepository.saveAll(Arrays.asList(member, member2, member3, member4, member5, member6));


        // Climbing route creation
        ClimbingRoute climbingRoute = new ClimbingRoute("Highway to Hell", DifficultyLevelEnum.EASY);
        ClimbingRoute climbingRoute2 = new ClimbingRoute("Weg nach Norden", DifficultyLevelEnum.HARD);
        ClimbingRoute climbingRoute3 = new ClimbingRoute("Gänsemarsch", DifficultyLevelEnum.HELL);
        ClimbingRoute climbingRoute4 = new ClimbingRoute("Fliegende Willy", DifficultyLevelEnum.MEDIUM);
        ClimbingRoute climbingRoute5 = new ClimbingRoute("Fingerzerstörer", DifficultyLevelEnum.HELL);
        ClimbingRoute climbingRoute6 = new ClimbingRoute("Endlos", DifficultyLevelEnum.EASY);

        climbingRouteRepository.saveAll(Arrays.asList(climbingRoute, climbingRoute2, climbingRoute3, climbingRoute4, climbingRoute5, climbingRoute6));

        // add favourite routes
        member.addFavouriteRoute(climbingRoute);
        member.addFavouriteRoute(climbingRoute2);
        member2.addFavouriteRoute(climbingRoute5);
        member3.addFavouriteRoute(climbingRoute);
        member3.addFavouriteRoute(climbingRoute3);
        member4.addFavouriteRoute(climbingRoute4);
        member4.addFavouriteRoute(climbingRoute2);
        member5.addFavouriteRoute(climbingRoute4);
        member6.addFavouriteRoute(climbingRoute6);
        member6.addFavouriteRoute(climbingRoute5);

        // save member again
        memberRepository.saveAll(Arrays.asList(member, member2, member3, member4, member5, member6));

    }
}
