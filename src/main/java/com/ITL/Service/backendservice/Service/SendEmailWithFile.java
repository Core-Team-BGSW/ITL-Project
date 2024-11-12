package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.UserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SendEmailWithFile {
    private final RestTemplate restTemplate;
    private final EmailService emailService;
    @Value("${api.url}")
    private String userServiceUrl;
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
        String url = userServiceUrl + "/userinfo/" + userId;

        // Make the REST API call using RestTemplate
        ResponseEntity<UserDetails> response = restTemplate.getForEntity(url, UserDetails.class);

        // Extract and return the email from the response body
        UserDetails userDetails = response.getBody();
        if (userDetails != null) {
            return userDetails.getEmail();
        }
        // If user not found, return a default or handle error
        throw new RuntimeException("User not found with ID: " + userId);
    }
}
