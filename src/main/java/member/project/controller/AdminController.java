package member.project.controller;

import lombok.AllArgsConstructor;
import member.project.entity.Admin;
import member.project.exception.MemberProjectException;
import member.project.repository.AdminRepository;
import member.project.repository.MemberRepository;
import member.project.repository.PurchaseBookRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class AdminController {

    private AdminRepository adminRepository;
    private MemberRepository memberRepository;
    private PurchaseBookRepository purchaseBookRepository;

    // Admin Login
    @PostMapping(value = "/loginAdmin")
    public ResponseEntity<Map<String, Object>> loginEvent(@RequestParam("username") String username,
                                                          @RequestParam("password") String password) {
        Map<String, Object> map = new HashMap<>();
        Admin details = adminRepository.findByEmailAddressAndPassword(username, password);
        if (details != null) {
            map.put("userid", details.getAdminId());
            map.put("fullname", details.getFirstName() + " " + details.getLastName());
            map.put("emailaddress", details.getEmailAddress());
            map.put("message", "Login Was Successful");
            map.put("title", "Login Successful");
            return ResponseEntity.ok(map);
        } else {
            map.put("message", "Invalid Email Address or Password");
            map.put("title", "Login Error");
            return ResponseEntity.badRequest().body(map);
        }
    }

    // Fetch All Member
    @GetMapping("/fetchAllMembers")
    private ResponseEntity<?> fetchMembers() {
        return ResponseEntity.ok(memberRepository.findAll());
    }

    @GetMapping("/fetchAllPurchaseBooks")
    public ResponseEntity<?> fetchPurchaseBook() throws MemberProjectException {
        return ResponseEntity.ok(purchaseBookRepository.fetchAllPurchases().stream()
                .map(t -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("author", t.get("author"));
                    map.put("last_name", t.get("last_name"));
                    map.put("first_name", t.get("first_name"));
                    map.put("book_name", t.get("book_name"));
                    map.put("image", t.get("image"));
                    map.put("rate", t.get("rate"));
                    map.put("purchase_book_id", t.get("purchase_book_id"));
                    map.put("purchased_date", t.get("purchased_date"));
                    return map;
                }).collect(Collectors.toList()));
    }

}
