package com.g1appdev.Moodel.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.g1appdev.Moodel.entity.IndividualSubmissions;
import com.g1appdev.Moodel.entity.Student;


@Repository
public interface IndividualSubmissionRepo extends JpaRepository<IndividualSubmissions, Integer> {
	List<IndividualSubmissions> findByStudent(Student student);
}
