package member.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Data
@Entity
public class PurchaseBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int purchaseBookId;
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Member.class)
    private Member member;
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = BookDetail.class)
    private BookDetail bookDetail;
    private Double rate;
    @Column(columnDefinition = " date not null ")
    private Date purchasedDate;
    private String cardType;
    private String cardNumber;
    private String cardCVV;

}
