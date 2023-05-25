package com.example.kletterhalle.domains.member.repository;

import com.example.kletterhalle.domains.member.model.Member;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MemberRepository extends CrudRepository<Member, Long> {
    List<Member> findAll();
}
