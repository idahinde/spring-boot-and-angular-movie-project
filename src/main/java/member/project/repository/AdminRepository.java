package member.project.repository;

import member.project.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

    Admin findByEmailAddressAndPassword(String emailAddress, String password);
}
