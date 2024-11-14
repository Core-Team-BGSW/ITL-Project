package com.ITL.Service.backendservice.Service;

import com.azure.identity.ClientSecretCredential;
import com.azure.identity.ClientSecretCredentialBuilder;
import com.microsoft.graph.authentication.TokenCredentialAuthProvider;
import com.microsoft.graph.models.*;
import com.microsoft.graph.requests.AttachmentCollectionPage;
import com.microsoft.graph.requests.GraphServiceClient;
import lombok.RequiredArgsConstructor;
import okhttp3.Request;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailService {
    @Value("${email}")
    private String senderEmail;

    @Value("${azure.client-id}")
    private String clientId;

    @Value("${azure.client-secret}")
    private String clientSecret;

    @Value("${azure.tenant-id}")
    private String tenantId;

    private GraphServiceClient<Request> graphClient;


    public void sendEmailWithAttachment(String toEmail, List<String> ccMails, String subject, String body, File attachment) {
         try {
             initializeGraphForAppOnlyAuth();
         }
         catch(Exception e) {
             System.out.println("Facing some error while initializing the Microsoft API" +  e.getMessage());
         }
         try {
             Message message = new Message();
             message.subject = subject;
             message.body = new ItemBody();
             message.body.contentType = BodyType.TEXT;
             message.body.content = body;
             EmailAddress emailAddress = new EmailAddress();
             emailAddress.address = toEmail;
             Recipient recipient = new Recipient();
             recipient.emailAddress = emailAddress;
             message.toRecipients = Collections.singletonList(recipient);

             message.ccRecipients = createCcRecipients(ccMails);
             FileAttachment fileattachment= createFileAttachment(attachment);
             message.attachments = (AttachmentCollectionPage) Collections.singletonList(fileattachment);
             graphClient.users(senderEmail).sendMail(UserSendMailParameterSet.newBuilder()
                     .withMessage(message)
                     .build())
                     .buildRequest()
                     .post();
         }
         catch(MailException e)
         {
             System.out.println("Failed to send email." + e.getMessage());
         }
    }

    private void initializeGraphForAppOnlyAuth() {
        ClientSecretCredential clientSecretCredential = new ClientSecretCredentialBuilder().clientId(clientId).tenantId(tenantId).clientSecret(clientSecret).build();
        if(graphClient == null)
        {
            final TokenCredentialAuthProvider authProvider = new TokenCredentialAuthProvider(List.of("https://graph.microsoft.com/.default"), clientSecretCredential);
            graphClient = GraphServiceClient.builder().authenticationProvider(authProvider).buildClient();
        }
    }

    private FileAttachment createFileAttachment(File file) {
        FileAttachment attachment = new FileAttachment();
        attachment.name = file.getName();  // Get the name of the file
        attachment.contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";  // MIME type (adjust based on the file type, e.g., "application/pdf")
        attachment.contentBytes = getFileBytes(file);  // Get the file bytes

        return attachment;
    }
    private static byte[] getFileBytes(File file) {
        try (FileInputStream fileInputStream = new FileInputStream(file)) {
            return new byte[(int) file.length()];
        } catch (IOException e) {
            e.printStackTrace();
            return new byte[0];
        }
    }

    private static List<Recipient> createCcRecipients(List<String> ccEmails) {
        // Convert the list of CC emails to a list of Recipient objects
        List<Recipient> ccRecipients = new java.util.ArrayList<>();
        for (String ccEmail : ccEmails) {
            EmailAddress ccEmailAddress = new EmailAddress();
            ccEmailAddress.address = ccEmail;

            Recipient ccRecipient = new Recipient();
            ccRecipient.emailAddress = ccEmailAddress;

            ccRecipients.add(ccRecipient);
        }
        return ccRecipients;
    }
}
