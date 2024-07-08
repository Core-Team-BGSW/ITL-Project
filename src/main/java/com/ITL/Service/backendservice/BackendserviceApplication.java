package com.ITL.Service.backendservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class BackendserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendserviceApplication.class, args);
	}

}
