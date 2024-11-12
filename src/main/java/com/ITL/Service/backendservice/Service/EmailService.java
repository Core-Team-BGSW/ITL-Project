package com.ITL.Service.backendservice.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmailWithAttachment(String toEmail, List<String> ccRecipients, String subject, String text, File attachment) {
         try {
             MimeMessage mimeMessage = mailSender.createMimeMessage();
             MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true); // true for multipart

             helper.setFrom(fromEmail);
             helper.setTo(toEmail);
             helper.setSubject(subject);
             helper.setText(text);
             if (ccRecipients != null && !ccRecipients.isEmpty()) {
                 String[] ccArray = ccRecipients.toArray(new String[0]);
                 helper.setCc(ccArray);
             }

             // Attach the file
             helper.addAttachment(attachment.getName(), attachment);

             mailSender.send(mimeMessage);
         }
         catch(MailException | MessagingException e)
         {
             System.out.println("Failed to send email.");
         }
    }
}
