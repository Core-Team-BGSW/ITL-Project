package com.ITL.Service.backendservice.Service;


import com.ITL.Service.backendservice.Exception.CustomException;
import com.ITL.Service.backendservice.Model.Permissions;
import com.ITL.Service.backendservice.Model.Roles;
import com.ITL.Service.backendservice.Model.RolesList;
import com.ITL.Service.backendservice.Model.UserPermissionsResponse;
import com.ITL.Service.backendservice.Repository.LabDataRepo;
import com.ITL.Service.backendservice.Repository.RolePermissionRepo;
import com.ITL.Service.backendservice.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Stream;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private LabDataRepo labRoleRepository;

    @Autowired
    private RolePermissionRepo rolePermissionsRepository;


    public Roles addUser(Roles roles) {

        String userId = roles.getUserId();
        Optional<Roles> existingRolesOpt = roleRepository.findById(userId);

        if (existingRolesOpt.isPresent()) {
            throw new CustomException("User with ID " + userId + " already exists.");
        } else {
            // User does not exist, save the new roles directly
            return roleRepository.save(roles);
        }
    }


    public Optional<Roles> getUserById(String userId) {
        return roleRepository.findByUserIdIgnoreCase(userId);
        // Return Optional<User>
    }
    public List<Roles> getAllUsers() {
        return roleRepository.findAll(); // Return Optional<User>
    }

    public Roles updateUserRoles(Roles newRoles) {
        String userId = newRoles.getUserId(); // Retrieve userId from the Roles object

        Optional<Roles> existingRolesOpt = roleRepository.findById(userId);

        if (existingRolesOpt.isPresent()) {
            Roles existingRoles = existingRolesOpt.get();

            // Overwrite the existing roles with the new roles
            existingRoles.setRolesLists(newRoles.getRolesLists());

            // Save the updated roles
            return roleRepository.save(existingRoles);
        } else {
            throw new CustomException("User with ID " + userId + " not found.");
        }
    }


    // Method to validate roles
    private void validateRoles(List<RolesList> rolesLists) {
        List<String> validRoles = Stream.of(RolesList.values())
                .map(Enum::name)
                .toList();

        for (RolesList rolesList : rolesLists) {
            if (!validRoles.contains(rolesList.name())) {
                throw new CustomException("No role exists with name: '" + rolesList.name() + "'");
            }
        }
    }

    public void syncRolesWithLabCoordinators() {
        // Fetch unique lab coordinators from labs collection
        List<String> uniqueLabCoordinators = labRoleRepository.findDistinctlabcordinators();

        // Iterate over each lab coordinator and assign them the LAB_COORDINATOR role if they don’t exist
        for (String labCoordinator : uniqueLabCoordinators) {
            if (!roleRepository.existsByUserId(labCoordinator)) {
                Roles newRole = new Roles(labCoordinator, List.of(RolesList.ROLE_COORDINATOR));
                roleRepository.save(newRole);
            }
        }
    }

    public List<String> getPermissionsForRole(String role) {
        return rolePermissionsRepository.findByRole(role)
                .map(Permissions::getPermissions)
                .orElseThrow(() -> new RuntimeException("Role not found"));
    }


    public UserPermissionsResponse getPermissionsForUserId(String userId) {
        Optional<Roles> userRolesOpt = roleRepository.findByUserIdIgnoreCase(userId);

        if (userRolesOpt.isEmpty()) {
            return new UserPermissionsResponse(new ArrayList<>(), new ArrayList<>());
        }

        Set<String> permissions = new HashSet<>();
        List<String> roles = new ArrayList<>();
        Roles userRoles = userRolesOpt.get();

        // Add roles to the roles list and retrieve permissions
        for (RolesList role : userRoles.getRolesLists()) {
            roles.add(role.name()); // Add each role to the roles list

            // Fetch permissions for the role and add them to the permissions set
            List<String> rolePermissions = rolePermissionsRepository.findByRole(role.name())
                    .map(Permissions::getPermissions)
                    .orElse(new ArrayList<>());
            permissions.addAll(rolePermissions);
        }

        return new UserPermissionsResponse(roles, new ArrayList<>(permissions));
    }

    public Permissions addRole(Permissions newRole) {
        // Check if role already exists
        if (rolePermissionsRepository.findByRole(newRole.getRole()).isPresent()) {
            throw new CustomException("Role " + newRole.getRole() + " already exists.");
        }
        return rolePermissionsRepository.save(newRole);
    }

    public void deleteRole(String roleName) {
        // Find the role using Optional
        Optional<Permissions> role = rolePermissionsRepository.findByRole(roleName);

        // If role doesn't exist, throw an exception
        if (role.isEmpty()) {
            throw new CustomException("Role " + roleName + " not found.");
        }

        // Delete the role
        rolePermissionsRepository.delete(role.get());
    }

    public Permissions updateRolePermissions(String roleName, List<String> newPermissions) {
        // Fetch the role using Optional
        Optional<Permissions> role = rolePermissionsRepository.findByRole(roleName);

        // If the role doesn't exist, throw an exception
        if (role.isEmpty()) {
            throw new CustomException("Role " + roleName + " not found.");
        }

        // Get the existing role
        Permissions existingRole = role.get();

        // Add new permissions to existing ones (avoiding duplicates)
        List<String> updatedPermissions = existingRole.getPermissions();
        updatedPermissions.addAll(newPermissions.stream()
                .filter(permission -> !updatedPermissions.contains(permission))  // avoid duplicates
                .toList());

        // Update the permissions in the role
        existingRole.setPermissions(updatedPermissions);

        // Save the updated role
        return rolePermissionsRepository.save(existingRole);
    }

}

