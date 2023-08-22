package member.project.repository;

import member.project.entity.PurchaseBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Tuple;
import java.util.List;

@Repository
public interface PurchaseBookRepository extends JpaRepository<PurchaseBook, Integer> {

    @Query(value = "select b.author, b.book_name, b.image, p.rate, p.purchased_date, p.purchase_book_id from purchase_book p " +
            " inner join book_detail b on p.book_detail_book_id=b.book_id where p.member_member_id=:memberId ", nativeQuery = true)
    List<Tuple> fetchMemberPurchase(@Param("memberId") String id);

    @Query(value = "select b.author, b.book_name, b.image, p.rate, p.purchased_date, p.purchase_book_id, m.first_name, m.last_name from purchase_book p " +
            " inner join book_detail b on p.book_detail_book_id=b.book_id " +
            " inner join member m on p.member_member_id=m.member_id ", nativeQuery = true)
    List<Tuple> fetchAllPurchases();

}
