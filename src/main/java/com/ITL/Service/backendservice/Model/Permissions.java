package com.ITL.Service.backendservice.Model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "Roles")
public class Permissions {
    @Id
    private String role;
    private List<String> permissions;
}
