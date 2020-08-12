package com.jcflorezv.draft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ServerLabsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerLabsApplication.class, args);
    }
}