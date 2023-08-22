package member.project.controller;

import lombok.AllArgsConstructor;
import member.project.entity.Member;
import member.project.exception.MemberProjectException;
import member.project.repository.MemberRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@AllArgsConstructor
public class MemberController {

    private MemberRepository memberRepository;

    @PostMapping("/registerMember")
    public ResponseEntity<?> registerMember(@ModelAttribute Member member) throws MemberProjectException {

        Random rand = new Random();
        int num = ((rand.nextInt(9) + 1) * 100) + ((rand.nextInt(7) + 1) * 10) + (rand.nextInt(9) + 1) + (rand.nextInt(9) + 1) + (rand.nextInt(9) + 1);
        String memberId = String.format("R-%s", num);

        member.setMemberId(memberId);
        member.setIsActivated('N');
        member.setRegistrationDate(Date.valueOf(LocalDate.now()));
        member.setActivationDate(Date.valueOf(LocalDate.now()));

        memberRepository.save(member);
        return ResponseEntity.ok(Map.of("message", "Member Register was Successful. Member: " + memberId, "title", "Post Success"));
    }

    // User login
    @PostMapping(value = "/loginMember")
    public ResponseEntity<Map<String, Object>> register(@RequestParam("username") String username,
                                                        @RequestParam("password") String password) throws MemberProjectException {
        Map<String, Object> map = new HashMap<>();
        Member member = memberRepository.findByEmailAddressAndPassword(username, password);
        if (member == null) {
            map.put("message", "Invalid Email Address or Password");
            map.put("title", "Login Error");
            return ResponseEntity.badRequest().body(map);
        } else if (member.getIsActivated().toString().equals("N")) {
            map.put("message", "Member Account Has not been Activated! Contact Admin.");
            map.put("title", "Account Error");
            return ResponseEntity.badRequest().body(map);
        } else {
            map.put("userid", member.getMemberId());
            map.put("fullname", member.getFirstName() + " " + member.getLastName());
            map.put("emailaddress", member.getEmailAddress());
            map.put("phone", member.getPhoneNumber());
            map.put("message", "Login Was Successful");
            map.put("title", "Login Successful");
            return ResponseEntity.ok(map);
        }
    }

    // User login
    @PostMapping(value = "/activateMember")
    public ResponseEntity<?> activateMember(@RequestParam("memberid") String memberId) throws MemberProjectException {
        Member member = memberRepository.getById(memberId);
        member.setIsActivated('Y');
        member.setActivationDate(Date.valueOf(LocalDate.now()));
        memberRepository.save(member);
        return ResponseEntity.ok(Map.of("message", "Member Activation was Successful.", "title", "Update Success"));
    }

}
