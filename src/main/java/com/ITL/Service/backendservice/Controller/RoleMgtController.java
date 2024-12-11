package com.ITL.Service.backendservice.Controller;



import com.ITL.Service.backendservice.Exception.CustomException;
import com.ITL.Service.backendservice.Model.Permissions;
import com.ITL.Service.backendservice.Model.Roles;
import com.ITL.Service.backendservice.Model.RolesList;
import com.ITL.Service.backendservice.Model.UserPermissionsResponse;
import com.ITL.Service.backendservice.Repository.RolePermissionRepo;
import com.ITL.Service.backendservice.Repository.RoleRepository;
import com.ITL.Service.backendservice.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class RoleMgtController {

    @Autowired
    private RolePermissionRepo rolePermissionRepo;

    @Autowired
    private RoleService roleService;

    @Autowired
    private RoleRepository roleRepository;

    @PostMapping("/addUser")
    public Roles addUser(@RequestBody Roles roles) {
        return roleService.addUser(roles);
    }

    @PostMapping("/updateUserRoles")
    public Roles updateUserRoles(@RequestBody Roles roles) {
        return roleService.updateUserRoles(roles);
    }

    @GetMapping("/{userId}")
    public Optional<Roles> getUser(@PathVariable String userId) {
        return roleService.getUserById(userId);
    }

    @GetMapping("/allUserRoles")
    public List<Roles> getAllUsers() {
        return roleService.getAllUsers();
    }

    @GetMapping("/{userId}/roles") // Endpoint to get user roles
    public ResponseEntity<?> getUserRoles(@PathVariable String userId) {
        Optional<Roles> userOptional = roleService.getUserById(userId); // Get Optional<User>

        if (userOptional.isPresent()) {
            Roles roles = userOptional.get(); // Extract User from Optional
            return ResponseEntity.ok().body(roles.getRolesLists()); // Return the roles
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if user is not found
        }
    }

    @DeleteMapping("/removeUser/{userId}")
    public ResponseEntity<String> removeUser(@PathVariable String userId) {
        Optional<Roles> existingRolesOpt = roleRepository.findById(userId);

        if (existingRolesOpt.isPresent()) {
            roleRepository.deleteById(userId);
            return ResponseEntity.ok("User with ID " + userId + " has been deleted.");
        } else {
            throw new CustomException("User with ID " + userId + " not found.");
        }
    }

    @DeleteMapping("/removeUserRole/{userId}/{roleName}")
    public ResponseEntity<String> removeUserRole(@PathVariable String userId, @PathVariable String roleName) {
        Optional<Roles> existingRolesOpt = roleRepository.findById(userId);

        if (existingRolesOpt.isPresent()) {
            Roles existingRoles = existingRolesOpt.get();

            // Check if the role exists in the user's roles list
            boolean roleRemoved = existingRoles.getRolesLists().removeIf(role -> role.name().equals(roleName));

            if (roleRemoved) {
                roleRepository.save(existingRoles); // Save changes after removing the role
                return ResponseEntity.ok("Role '" + roleName + "' removed from user with ID " + userId + ".");
            } else {
                throw new CustomException("Role '" + roleName + "' not found for user with ID " + userId + ".");
            }
        } else {
            throw new CustomException("User with ID " + userId + " not found.");
        }
    }

    @GetMapping("/roles")
    public List<String> getRolesList() {
        // Convert enum values to a list of strings
        return Arrays.stream(RolesList.values())
                .map(Enum::name)
                .toList();
    }


    @GetMapping("/permissions/user/{userId}")
    public UserPermissionsResponse getUserPermissions(@PathVariable String userId) {
        return roleService.getPermissionsForUserId(userId);
    }

    @PostMapping("/permissions/new")
    public ResponseEntity<Permissions> addRole(@RequestBody Permissions newRole) {
        Permissions createdRole = roleService.addRole(newRole);
        return new ResponseEntity<>(createdRole, HttpStatus.CREATED);
    }

    // Endpoint to delete a role
    @DeleteMapping("/{roleName}")
    public ResponseEntity<String> deleteRole(@PathVariable String roleName) {
        roleService.deleteRole(roleName);
        return new ResponseEntity<>("Role " + roleName + " has been deleted.", HttpStatus.OK);
    }

    // Endpoint to update role permissions
    @PutMapping("/{roleName}/permissions")
    public ResponseEntity<Permissions> updateRolePermissions(@PathVariable String roleName, @RequestBody List<String> newPermissions) {
        Permissions updatedRole = roleService.updateRolePermissions(roleName, newPermissions);
        return new ResponseEntity<>(updatedRole, HttpStatus.OK);
    }

    @GetMapping("/Rolesnew")
    public List<Permissions> getRolesWithPermissions() {
        return rolePermissionRepo.findAll();
    }


    @GetMapping("/search")
    public ResponseEntity<List<String>> searchUsers(@RequestParam("query") String query) {
        List<String> matchingUserIds = roleRepository.findUserIdsByPrefix(query);
        return ResponseEntity.ok(matchingUserIds);
    }

    @GetMapping("/sync")
    public String syncRoles() {
        roleService.syncRolesWithLabCoordinators();
        return "Roles synced successfully!";
    }
}

