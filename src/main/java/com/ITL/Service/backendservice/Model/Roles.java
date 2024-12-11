package com.ITL.Service.backendservice.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "users")
public class Roles {
        @Id
        private String userId;//
        private List<RolesList> rolesLists;

        public Roles() {}

        public Roles(String userId, List<RolesList> rolesLists) {
                this.userId = userId;
                this.rolesLists = rolesLists;
        }
}
