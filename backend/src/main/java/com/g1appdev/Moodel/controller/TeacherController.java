/**
 * The `TeacherController` class in a Java Spring application handles CRUD operations for teacher
 * entities and authentication using JWT.
 */

package com.g1appdev.Moodel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.g1appdev.Moodel.entity.Teacher;
import com.g1appdev.Moodel.security.AuthRequest;
import com.g1appdev.Moodel.security.TeacherDetails;
import com.g1appdev.Moodel.security.TeacherDetailsService;
import com.g1appdev.Moodel.service.TeacherService;
import org.springframework.web.bind.annotation.PutMapping;



// The annotations `@RestController`, `@CrossOrigin(origins = "http://localhost:3000")`, and
// `@RequestMapping(method = RequestMethod.GET, path="/api/teacher")` in the `TeacherController` class
// are used to define the behavior of the controller in a Java Spring application.
@RestController
@RequestMapping(method = RequestMethod.GET,path="/api/teacher")

/**
 * The `TeacherController` class in Java contains methods for CRUD operations on teacher records and
 * authentication using JWT tokens.
 */
public class TeacherController {
    
    // The `@Autowired` annotation in Java is used for automatic dependency injection. In the
    // `TeacherController` class, these annotations are used to automatically inject instances of
    // `TeacherService`, `JwtService`, and `AuthenticationManager` into the controller.
    @Autowired
    TeacherService tserv;



    /**
    * The function returns a success message indicating that the Teacher API connection was
    * successful.
    * 
    * @return The method `print()` is returning the String "✅ SUCCESS: Teacher API connected
    * successfully!"
    */
    @GetMapping("/testConnection")
    public String print() {
        return "✅ SUCCESS: Teacher API connected sucessfully!";
    }

    //#################
    // CREATE FUNCTIONS
    //#################

    // This part of the code is defining a method `postTeacherRecord` in the `TeacherController` class
    // that handles the creation (or insertion) of a new teacher record.
    @PostMapping("/postTeacherRecord")
    public Teacher postTeacherRecord(@RequestBody Teacher teacher) {
        return tserv.postTeacherRecord(teacher);
    }


    //#################
    // READ FUNCTIONS
    //#################

    /**
    * This Java function uses a GET request to retrieve a list of all teachers from a service.
    * 
    * @return A list of all teachers is being returned.
    */
    @GetMapping("/getAllTeachers")
    public List<Teacher> getAllTeachers() {
        return tserv.getAllTeachers();
    }

    /**
     * This Java function retrieves a teacher by their email address.
     * 
     * @param email The code you provided is a Spring `@GetMapping` endpoint that retrieves a `Teacher`
     * object by email. The `email` parameter is passed as a request parameter in the URL.
     * @return The `getTeacherByEmail` method in the controller is returning a `Teacher` object based
     * on the email parameter passed in as a request parameter.
     */
    @GetMapping("/getTeacherByEmail")
    public Teacher getTeacherByEmail(@RequestParam String email) {
        return tserv.getTeacherByEmail(email);
    }


    //#################
    // UPDATE FUNCTIONS
    //#################

    /**
     * This Java function updates teacher details based on the provided ID and new teacher object.
     * 
     * @param id The `id` parameter in the `putTeacherDetails` method is of type `int` and is annotated
     * with `@RequestParam`. This means that the `id` value is expected to be passed as a request
     * parameter in the URL when making a PUT request to the endpoint `/putTeacherDetails`.
     * @param newTeacher The `newTeacher` parameter in the `putTeacherDetails` method is of type
     * `Teacher` and is annotated with `@RequestBody`. This means that the `newTeacher` object will be
     * deserialized from the request body, typically in JSON format, and mapped to the `Teacher` class
     * before
     * @return An instance of the `Teacher` class is being returned.
     */
    @PutMapping("/putTeacherDetails")
    public Teacher putTeacherDetails (@RequestParam int id, @RequestBody Teacher newTeacher) {
        return tserv.putTeacherDetails(id, newTeacher);
    }


    //#################
    // DELETE FUNCTIONS
    //#################

    /**
     * This Java function uses a DeleteMapping annotation to delete teacher details based on the
     * provided ID.
     * 
     * @param id The `id` parameter in the `deleteTeacher` method is used to specify the unique
     * identifier of the teacher whose details need to be deleted from the system. This identifier is
     * typically used to locate and remove the corresponding teacher record from the database or any
     * other data storage mechanism being used in the application.
     * @return The method is returning the result of the `deleteTeacher` method from the `tserv`
     * service, which is likely a message or status indicating the success or failure of the deletion
     * operation for the teacher with the specified `id`.
     */
    @DeleteMapping("/deleteTeacherDetails/{id}")
    public String deleteTeacher(@PathVariable int id) {
        return tserv.deleteTeacher(id);
    }

    //#################
    // AUTH FUNCTIONS
    //#################

    @PostMapping("/register")
    public ResponseEntity<Teacher> newTeacher(@RequestBody Teacher teacher) {
        Teacher newTeacher = tserv.postTeacherRecord(teacher);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTeacher);
    }
    
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest authRequest) {
        String username = authRequest.getUsername();
        String password = authRequest.getPassword();

        if (username == null || password == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("🔴 ERROR: Missing username or password");
        }
    
        boolean isAuthenticated = tserv.authenticateTeacher(username, password);
        if (!isAuthenticated) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("🔴 ERROR: Invalid credentials");
        }

        String token = tserv.generateTokenForTeacher(username);
        return ResponseEntity.ok(token);
    }
}
