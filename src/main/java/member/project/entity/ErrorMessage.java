package member.project.entity;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ErrorMessage {

    private String message;
    private String type;
    private String desc;
    private LocalDate date;

    public ErrorMessage() {
        super();
    }

    public ErrorMessage(String message, String type, String desc, LocalDate date) {
        super();
        this.message = message;
        this.type = type;
        this.desc = desc;
        this.date = date;
    }

    public ErrorMessage(String message, String type, String desc) {
        super();
        this.message = message;
        this.type = type;
        this.desc = desc;
        this.date = LocalDate.now();
    }

    public String getMessage() {
        return message;
    }

}
