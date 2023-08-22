package member.project.controller;

import lombok.AllArgsConstructor;
import member.project.entity.BookDetail;
import member.project.entity.Member;
import member.project.entity.PurchaseBook;
import member.project.exception.MemberProjectException;
import member.project.repository.BookRepository;
import member.project.repository.MemberRepository;
import member.project.repository.PurchaseBookRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class PurchaseBookController {

    private BookRepository bookRepository;
    private MemberRepository memberRepository;
    private PurchaseBookRepository purchaseBookRepository;

    @PostMapping("/savePurchaseBook")
    public ResponseEntity<?> savePurchaseBook(@RequestParam("bookId") int bookId, @RequestParam("memberId") String memberId,
                                              @RequestParam("cardType") String c_type, @RequestParam("cardNumber") String c_no,
                                              @RequestParam("cardCVVNumber") String c_cvv) throws MemberProjectException {

        Member member = memberRepository.getById(memberId);
        BookDetail book = bookRepository.getById(bookId);

        PurchaseBook purchaseBook = new PurchaseBook();
        purchaseBook.setBookDetail(book);
        purchaseBook.setMember(member);
        purchaseBook.setCardType(c_type);
        purchaseBook.setCardNumber(c_no);
        purchaseBook.setCardCVV(c_cvv);
        purchaseBook.setRate(book.getRate());
        purchaseBook.setPurchasedDate(Date.valueOf(LocalDate.now()));
        purchaseBookRepository.save(purchaseBook);

        return ResponseEntity.ok(Map.of("message", "Book Purchase was Successful.", "title", "Post Successful"));
    }

    @GetMapping("/fetchMemberPurchaseBooks")
    public ResponseEntity<?> fetchPurchaseBook(@RequestParam("memberId") String id) throws MemberProjectException {
        return ResponseEntity.ok(purchaseBookRepository.fetchMemberPurchase(id).stream()
                .map(t -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("author", t.get("author"));
                    map.put("book_name", t.get("book_name"));
                    map.put("image", t.get("image"));
                    map.put("rate", t.get("rate"));
                    map.put("purchase_book_id", t.get("purchase_book_id"));
                    map.put("purchased_date", t.get("purchased_date"));
                    return map;
                }).collect(Collectors.toList()));
    }

}
