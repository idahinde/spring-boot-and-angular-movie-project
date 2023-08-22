package member.project.controller;

import lombok.AllArgsConstructor;
import member.project.entity.BookDetail;
import member.project.exception.MemberProjectException;
import member.project.repository.BookRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Map;

@RestController
@AllArgsConstructor
public class BookController {

    private BookRepository bookRepository;

    @PostMapping("/saveBook")
    public ResponseEntity<?> addBook(@ModelAttribute BookDetail bookDetail) throws MemberProjectException {
        bookDetail.setAddedDate(Date.valueOf(LocalDate.now()));
        bookRepository.save(bookDetail);
        return ResponseEntity.ok(Map.of("message", "Book was Successfully Added!", "title", "Post Successful"));
    }

    // Fetch All Books
    @GetMapping("/fetchAllBooks")
    private ResponseEntity<?> fetchAllBooks() throws MemberProjectException {
        return ResponseEntity.ok(bookRepository.findAll());
    }

}
