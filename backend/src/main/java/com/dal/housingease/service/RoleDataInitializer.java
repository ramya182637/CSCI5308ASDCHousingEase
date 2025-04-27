package com.dal.housingease.service;

import com.dal.housingease.enums.RoleEnum;
import com.dal.housingease.model.Role;
import com.dal.housingease.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class RoleDataInitializer {

    @Autowired
    private RoleRepository roleRepository;

    @PostConstruct
    public void init() {
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role()
                    .setName(RoleEnum.ADMIN)
                    .setDescription("Housing Ease Administrator"));
            roleRepository.save(new Role()
                    .setName(RoleEnum.SEEKER)
                    .setDescription("Property Rental Seeker"));
            roleRepository.save(new Role()
                    .setName(RoleEnum.LISTER)
                    .setDescription("Property Rental Lister"));
        }
    }
}

