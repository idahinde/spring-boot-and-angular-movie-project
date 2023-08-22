package member.project.advice;

import member.project.entity.ErrorMessage;
import member.project.exception.MemberProjectException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(MemberProjectException.class)
    public ResponseEntity<ErrorMessage> handleAuthorException(MemberProjectException ae) {
        return new ResponseEntity<ErrorMessage>(new ErrorMessage(
                "AuthorException:" + ae.getMessage(),
                ae.getClass().toString(),
                "Exception has occurred,Please check"), HttpStatus.OK);

    }

}
