package com.g1appdev.Moodel.security.services;

public abstract class PrefixHandler {

    protected static String removePrefix(String username) {
        String prefixToRemove = RolePrefix.getForUsername(username, "prefix");

        if (!prefixToRemove.isEmpty()) {
            return username.substring(prefixToRemove.length());
        } else {
            throw new IllegalArgumentException("🔴 ERROR: No matching prefix found in the username.");
        }
    }

    protected static String determineRole(String username) {
        String role = RolePrefix.getForUsername(username, "role");

        if (!role.isEmpty()) {
            return role;
        } else {
            throw new IllegalArgumentException("🔴 ERROR: No valid role found in the username prefix.");
        }
    }
    
}
