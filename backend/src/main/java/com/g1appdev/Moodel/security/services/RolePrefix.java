package com.g1appdev.Moodel.security.services;

public enum RolePrefix {
    TEACHER(".nC1G`89;y.", "Teacher"),
    STUDENT(".uQY0b28$m.", "Student"),
    ADMIN(".W4bPM0:2Hk.", "Admin");

    private final String prefix;
    private final String role;

    RolePrefix(String prefix, String role) {
        this.prefix = prefix;
        this.role = role;
    }

    public String getPrefix() {
        return prefix;
    }

    public String getRole() {
        return role;
    }

    public static String getForUsername(String username, String getType) {
        for (RolePrefix rolePrefix : values()) {
            if (username.contains(rolePrefix.getPrefix())) {
                switch(getType) {
                    case "role":
                        return rolePrefix.getRole();
                    case "prefix":
                        return rolePrefix.getPrefix();
                    default:
                        throw new IllegalArgumentException("🔴 ERROR: Invalid getType. Use 'role' or 'prefix'.");
                }
            }
        }
        throw new IllegalArgumentException("🔴 ERROR: No valid role prefix found in username.");
    }
}


