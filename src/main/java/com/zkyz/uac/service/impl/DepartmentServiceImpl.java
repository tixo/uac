package com.zkyz.uac.service.impl;

import com.zkyz.uac.domain.Department;
import com.zkyz.uac.domain.Employee;
import com.zkyz.uac.repository.DepartmentRepository;
import com.zkyz.uac.repository.EmployeeRepository;
import com.zkyz.uac.service.DepartmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Department.
 */
@Service
@Transactional
public class DepartmentServiceImpl implements DepartmentService {

    private final Logger log = LoggerFactory.getLogger(DepartmentServiceImpl.class);

    private final DepartmentRepository departmentRepository;

    private final EmployeeRepository employeeRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository, EmployeeRepository employeeRepository) {
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
    }

    /**
     * Save a department.
     *
     * @param department the entity to save
     * @return the persisted entity
     */
    @Override
    public Department save(Department department) {
        log.debug("Request to save Department : {}", department);        return departmentRepository.save(department);
    }

    /**
     * Get all the departments.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Department> findAll() {
        log.debug("Request to get all Departments");
        List<Employee> allEmps = employeeRepository.findAll();
        List<Department> allDepts = departmentRepository.findAllWithEmps();
        List<Department> ret = new ArrayList<>();
        for (Department department : allDepts){
            for (Employee e : allEmps){
                if(e.getDepartment().getId().longValue() == (department.getId().longValue())){
                    department.addEmp(e);
                    ret.add(department);
                }
            }

        }

        return ret;
    }


    /**
     * Get one department by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Department> findOne(Long id) {
        log.debug("Request to get Department : {}", id);
        return departmentRepository.findById(id);
    }

    /**
     * Delete the department by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Department : {}", id);
        departmentRepository.deleteById(id);
    }
}
