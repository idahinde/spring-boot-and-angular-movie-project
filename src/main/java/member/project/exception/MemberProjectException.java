package member.project.exception;

public class MemberProjectException extends Exception {

    public MemberProjectException() {
        super();
    }

    public MemberProjectException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public MemberProjectException(String message, Throwable cause) {
        super(message, cause);
    }

    public MemberProjectException(String message) {
        super(message);
    }

    public MemberProjectException(Throwable cause) {
        super(cause);
    }

}
