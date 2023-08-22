package member.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import java.sql.Date;
import java.util.List;

@Data
@Entity
public class Member {

    @Id
    @Column(columnDefinition = " varchar(5) not null ")
    private String memberId = "null";
    @Column(columnDefinition = " varchar(55) not null ")
    private String firstName;
    @Column(columnDefinition = " varchar(55) not null ")
    private String lastName;
    @Column(columnDefinition = " varchar(10) not null ")
    private String phoneNumber;
    @Email(message = "email is required and must be valid mail id")
    @Column(columnDefinition = " varchar(85) not null ")
    private String emailAddress;
    @Column(columnDefinition = " varchar(125) not null")
    private String password;
    @Column(columnDefinition = " date not null ")
    private Date dateOfBirth;
    @Column(columnDefinition = " date not null ")
    private Date registrationDate;
    @Column(columnDefinition = " enum('N','Y') not null default 'N' ")
    private Character isActivated;
    @Column(columnDefinition = " date not null ")
    private Date activationDate;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(targetEntity = PurchaseBook.class, mappedBy = "member")
    private List<PurchaseBook> purchaseBookList;

}
