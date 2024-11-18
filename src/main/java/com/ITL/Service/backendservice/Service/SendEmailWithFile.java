package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SendEmailWithFile {
    private final RestTemplate restTemplate;
    private final EmailService emailService;

    public void emailWithFile(File file,String local_itl, String kam, String dh) {
        String kamEmail = getUserEmail(kam);
        String dhEmail = getUserEmail(dh);
        String localItlEmail = getUserEmail(local_itl);
        List<String> ccRecipients = Arrays.asList(kamEmail,dhEmail);

        String subject = "Lab Data Submission";
        String body = "Please find the attached Lab Data Excel file.";
        emailService.sendEmailWithAttachment(localItlEmail,ccRecipients,subject,body,file);
    }
    private String getUserEmail(String userId) {
        // Construct the URL to fetch user details
        String url = "http://localhost:8080/userinfo/" + userId;

        try {
            // Make the REST API call using RestTemplate
            User user = restTemplate.getForObject(url, User.class);
            System.out.println("Response: " + user);

            if (user!=null) {
                return user.getEmail();
            }

            // Handle error if the response is not successful
            throw new RuntimeException("User not found with ID: " + userId);
        } catch (HttpClientErrorException e) {
            System.err.println("Error calling the user info API: " + e.getMessage());
            throw new RuntimeException("HTTP Error: " + e.getStatusCode() + " - " + e.getMessage());
        }
    }
}
