package com.g1appdev.Moodel.controller.teacher;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.g1appdev.Moodel.entity.teacher.Teacher;
import com.g1appdev.Moodel.entity.teacher.TeacherCourseOwnership;
import com.g1appdev.Moodel.entity.teacher.TeacherCourseOwnershipKey;
import com.g1appdev.Moodel.service.teacher.TeacherCourseOwnershipService;

@RestController
@RequestMapping("/api/teacherCourseOwnership")
public class TeacherCourseOwnershipController {

    @Autowired
    TeacherCourseOwnershipService tcoserv;

    //#################
    // UTILITY FUNCTIONS
    //#################

    @GetMapping("/test")
    public ResponseEntity<String> print() {
        return ResponseEntity.status(HttpStatus.OK).body("✅ SUCCESS: TeacherCourseOwnership API connected successfully!");
    }

    //#################
    // CREATE FUNCTIONS
    //#################

    @PostMapping("/create")
    public ResponseEntity<TeacherCourseOwnership> create(@RequestBody TeacherCourseOwnership teacherCourseOwnership) {
        TeacherCourseOwnership newOwnership = tcoserv.postTeacherCourseOwnership(teacherCourseOwnership);
        return ResponseEntity.status(HttpStatus.CREATED).body(newOwnership);
    }

    //#################
    // READ FUNCTIONS
    //#################

    @GetMapping("/getAll")
    public ResponseEntity<List<TeacherCourseOwnership>> getAll() {
        List<TeacherCourseOwnership> ownerships = tcoserv.getAllTeacherCourseOwnerships();
        return ResponseEntity.status(HttpStatus.OK).body(ownerships);
    }

    @GetMapping("/getByCourseId")
    public ResponseEntity<List<TeacherCourseOwnership>> getByCourseId(@RequestParam int courseId) {
        List<TeacherCourseOwnership> ownerships = tcoserv.getTeacherCourseOwnershipsByCourseId(courseId);
        return ResponseEntity.status(HttpStatus.OK).body(ownerships);
    }

    @GetMapping("/getByTeacherId")
    public ResponseEntity<List<TeacherCourseOwnership>> getByTeacherId(@RequestParam int teacherId) {
        List<TeacherCourseOwnership> ownerships = tcoserv.getTeacherCourseOwnershipsByTeacherId(teacherId);
        return ResponseEntity.status(HttpStatus.OK).body(ownerships);
    }

    //#################
    // UPDATE FUNCTIONS
    //#################

    @PutMapping("/update")
    public ResponseEntity<TeacherCourseOwnership> update(@RequestBody TeacherCourseOwnership newTeacherCourseOwnership) {
        TeacherCourseOwnership updatedOwnership = tcoserv.putTeacherCourseOwnership(newTeacherCourseOwnership);
        return ResponseEntity.status(HttpStatus.OK).body(updatedOwnership);
    }

    //#################
    // DELETE FUNCTIONS
    //#################

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody TeacherCourseOwnershipKey key) {
        String result = tcoserv.deleteTeacherCourseOwnership(key);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
