package com.g1appdev.Moodel.security;

public abstract class RolePrefixes {

    /**
     *   Randomly generated prefix to check if incoming username belongs to a teacher.
     * 
     *   This generated prefix is provided through the frontend.
     * 
     *   Intentionally added symbols such as the '.' in the beginning to prevent mistaking
     *   for an actual email address.
     * */
    protected static final String PREFIX_TEACHER_SECRET = ".nC1G`89;y.";

    protected static String removePrefix(String username) {
        if(username.contains(PREFIX_TEACHER_SECRET)) {
            return username.substring(RolePrefixes.PREFIX_TEACHER_SECRET.length());
        }
        
        // STUDENT PREFIX
        // if(username.contains(PREFIX_STUDENT_SECRET)) {
        //     return username.substring(RolePrefixes.PREFIX_STUDENT_SECRET.length());
        // }

        return "";
    }
    
}
