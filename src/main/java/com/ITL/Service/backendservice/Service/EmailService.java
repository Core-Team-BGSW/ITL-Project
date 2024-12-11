package com.ITL.Service.backendservice.Service;

import com.azure.identity.ClientSecretCredential;
import com.azure.identity.ClientSecretCredentialBuilder;
import com.microsoft.graph.authentication.TokenCredentialAuthProvider;
import com.microsoft.graph.models.*;
import com.microsoft.graph.requests.AttachmentCollectionPage;
import com.microsoft.graph.requests.AttachmentCollectionResponse;
import com.microsoft.graph.requests.GraphServiceClient;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;
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

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);


    GraphServiceClient graphClient;


    public void sendEmailWithAttachment(String toEmail, List<String> ccMails, String subject, String body, File attachment) {
         try {
             initializeGraphForAppOnlyAuth();
         }
         catch(Exception e) {
             logger.error("Error while initializing the Microsoft API! {}", e.getMessage());
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
             FileAttachment fileattachment;
             fileattachment = createFileAttachment(attachment);
             LinkedList<Attachment> attachmentsList = new LinkedList<>();
             attachmentsList.add(fileattachment);
             AttachmentCollectionResponse attachmentCollectionResponse = new AttachmentCollectionResponse();
             attachmentCollectionResponse.value = attachmentsList;
             message.attachments = new AttachmentCollectionPage(attachmentCollectionResponse,null);
             graphClient.users(senderEmail).sendMail(UserSendMailParameterSet.newBuilder()
                     .withMessage(message)
                     .build())
                     .buildRequest()
                     .post();
             logger.info("Successfully Send the Email to All the Users");
         }
         catch(MailException e)
         {
             logger.error("Failed to Send the email to Users! {} " , e.getMessage());
         }
    }

    private void initializeGraphForAppOnlyAuth() {
        final ClientSecretCredential clientSecretCredential = new ClientSecretCredentialBuilder()
                .clientId(clientId)
                .clientSecret(clientSecret)
                .tenantId(tenantId)
                .build();

        List<String> scopes = new ArrayList<>();
        scopes.add("https://graph.microsoft.com/.default");

        final TokenCredentialAuthProvider tokenCredentialAuthProvider = new TokenCredentialAuthProvider(scopes, clientSecretCredential);

         graphClient =
                GraphServiceClient
                        .builder()
                        .authenticationProvider(tokenCredentialAuthProvider)
                        .buildClient();
    }

    private FileAttachment createFileAttachment(File file) {
        FileAttachment attachment = new FileAttachment();
        attachment.oDataType = "#microsoft.graph.fileAttachment";
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
