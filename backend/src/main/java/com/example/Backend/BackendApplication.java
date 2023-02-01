package com.example.Backend;

import com.example.Backend.persistence.dto.AppUserDTO;
import com.example.Backend.persistence.dto.CityDTO;
import com.example.Backend.persistence.dto.RoleDTO;
import com.example.Backend.service.impl.AppUserService;
import com.example.Backend.service.impl.RoleService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Role;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.logout.DelegatingServerLogoutHandler;
import org.springframework.security.web.server.authentication.logout.SecurityContextServerLogoutHandler;
import org.springframework.security.web.server.authentication.logout.WebSessionServerLogoutHandler;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}


//	@Configuration
//	@EnableWebMvc
//	public class WebConfig implements WebMvcConfigurer {
//
//		@Override
//		public void addCorsMappings(CorsRegistry registry) {
//
//			registry.addMapping("/**")
//					.allowedOriginPatterns("*")
//					.allowCredentials(true)
//					.allowedMethods("GET", "POST", "PUT", "DELETE")
//					.maxAge(3600);
//		}
//	}
//
	@Bean
	CommandLineRunner run(AppUserService userService, RoleService roleService) {
		return args -> {
			// Las instrucciones en este scope se ejecutaran despues de que
			// la app se haya inicializado.
			roleService.create(new RoleDTO(null, "ADMIN"));
			roleService.create(new RoleDTO(null, "USER"));
			userService.create(new AppUserDTO(null, "admin", "admin", "admin@admin.com",
					"admin", new CityDTO(1), new ArrayList<>()));
			userService.addRoleToUser("admin@admin.com", "ADMIN");
			userService.addRoleToUser("admin@admin.com", "USER");

			userService.create(new AppUserDTO(null, "user", "user", "user@user.com",
					"user", new CityDTO(1), new ArrayList<>()));
			userService.addRoleToUser("user@user.com", "USER");
		};
	}

	// Bean to be inyected into spring security config
	@Bean
	PasswordEncoder passwordEncoder() {
		return	new BCryptPasswordEncoder();
	}
}



