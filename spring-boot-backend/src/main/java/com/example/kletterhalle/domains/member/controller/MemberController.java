package com.example.kletterhalle.domains.member.controller;


import com.example.kletterhalle.domains.advice.NotFoundException;
import com.example.kletterhalle.domains.member.dto.MemberDto;
import com.example.kletterhalle.domains.member.model.Member;
import com.example.kletterhalle.domains.member.repository.MemberRepository;
import com.example.kletterhalle.domains.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping()
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService, MemberRepository memberRepository) {
        this.memberService = memberService;
    }

    /** Bei get all kann man einfache Liste zurückgeben, da es immer 200 sein sollte. **/
    @GetMapping("/members")
    public ResponseEntity<List<MemberDto>> getAllMembers() throws NotFoundException {
        List<MemberDto> members = memberService.getAllMembers();
        if (members == null) {
            throw new NotFoundException("No Members found");
        }  else {
            return new ResponseEntity<>(members, HttpStatus.OK);
        }
    }

    @GetMapping("/member/{id}")
    public ResponseEntity<MemberDto> getMemberById(@PathVariable("id") long id) {
        MemberDto member = memberService.getMemberById(id);
        if (member == null) {
            throw new NotFoundException("Member not found");
        }  else {
            return new ResponseEntity<>(member, HttpStatus.OK);
        }
    }

    @PostMapping("/member")
    public ResponseEntity<Member> createMember(@Valid @RequestBody MemberDto memberDto) {
        Member member = memberService.createMember(memberDto);
        return new ResponseEntity<>(member, HttpStatus.CREATED);
    }

    @PutMapping("/member/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable("id") long id, @Valid @RequestBody MemberDto memberDto) {
        Member member = memberService.updateMember(id, memberDto);
        if (member == null) {
            throw new NotFoundException(String.format("No member with id %d found", id));
        } else {
            return new ResponseEntity<>(member, HttpStatus.OK);
        }
    }

    @DeleteMapping("/member/{id}")
    public ResponseEntity<HttpStatus> deleteMember(@PathVariable("id") long id) {
        var removed = memberService.deleteMember(id);
        if (!removed) {
            throw new NotFoundException(String.format("No member with id %d found", id));
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/members")
    public ResponseEntity<HttpStatus> deleteAllMembers() {
        var removed = memberService.deleteAllMembers();
        if (!removed) {
            throw new NotFoundException(String.format("No members found"));
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
