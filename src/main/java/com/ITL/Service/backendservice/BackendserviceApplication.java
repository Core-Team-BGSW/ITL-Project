package com.ITL.Service.backendservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Date;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@EnableScheduling
public class BackendserviceApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendserviceApplication.class, args);
	}
}
