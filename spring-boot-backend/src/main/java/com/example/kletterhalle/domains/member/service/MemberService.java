package com.example.kletterhalle.domains.member.service;

import com.example.kletterhalle.domains.member.dto.MemberDto;
import com.example.kletterhalle.domains.member.mapper.MemberMapper;
import com.example.kletterhalle.domains.member.model.Member;
import com.example.kletterhalle.domains.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    private final MemberMapper mapper;

    @Autowired
    public MemberService(MemberRepository memberRepository, MemberMapper mapper) {
        this.memberRepository = memberRepository;
        this.mapper = mapper;
    }

    @Cacheable(cacheNames = "members")
    public List<MemberDto> getAllMembers() {
        List<MemberDto> membersDto = memberRepository.findAll().stream()
                .filter(Objects::nonNull)
                .map(member -> mapper.toDto(member))
                .collect(Collectors.toList());

        return membersDto;
    }

    @Cacheable(cacheNames = "members", key="#id")
    public MemberDto getMemberById(long id) {
        Optional<Member> memberData = memberRepository.findById(id);
        MemberDto memberDto = null;
        if (memberData.isPresent()) {
            memberDto = mapper.toDto(memberData.get());
        }
        return memberDto;
    }

    public Member createMember(MemberDto memberDto) {
        return memberRepository.save(mapper.toModel(memberDto));
    }

//    @CachePut(cacheNames = "members", key="#memberDto.id")
    public Member updateMember(long id, MemberDto memberDto) {
        Optional<Member> memberData = memberRepository.findById(id);
        Member member = null;
        if (memberData.isPresent()) {
            member = mapper.toModel(memberDto);
            memberRepository.save(member);
        }
        return member;
    }

//    @CacheEvict(cacheNames = "members", key = "#id")
    public boolean deleteMember(long id) {
        var isRemoved = false;
        Optional<Member> memberForDeletion = memberRepository.findById(id);
        if (memberForDeletion.isPresent()) {
            memberRepository.deleteById(id);
            isRemoved = true;
        }
        return isRemoved;
    }

    public boolean deleteAllMembers() {
        var isRemoved = false;
        if (memberRepository.count() > 0) {
            memberRepository.deleteAll();
            isRemoved = true;
        }
        return isRemoved;
    }
}
