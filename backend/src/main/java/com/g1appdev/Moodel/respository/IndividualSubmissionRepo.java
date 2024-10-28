package com.g1appdev.Moodel.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.g1appdev.Moodel.Entity.IndividualSubmissionsEntity;
import com.g1appdev.Moodel.Entity.StudentEntity;


@Repository
public interface IndividualSubmissionRepository extends JpaRepository<IndividualSubmissionEntity, Integer> {
	List<IndividualSubmissionEntity> findByStudent(StudentEntity student);
}
