package member.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Data
@Entity
public class BookDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookId;
    private String bookName;
    private String author;
    private Double rate;
    @Column(columnDefinition = " date not null ")
    private Date publishDates;
    @Column(columnDefinition = " longtext not null ")
    private String image;
    @Column(columnDefinition = " date not null ")
    private Date addedDate;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(targetEntity = PurchaseBook.class,mappedBy = "bookDetail")
    List<PurchaseBook> purchaseBookList;
}
