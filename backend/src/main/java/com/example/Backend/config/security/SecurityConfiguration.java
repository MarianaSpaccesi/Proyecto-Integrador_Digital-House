package com.example.Backend.config.security;

import com.example.Backend.filters.CustomAuthenticateFilter;
import com.example.Backend.filters.CustomAuthorizationFilter;
import com.example.Backend.service.impl.AppUserService;
import com.example.Backend.service.impl.SecurityUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {

    // Inyecyted by @ResquiredArgsConstructor
    @Autowired
    private SecurityUserService userService;

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder bCryptPasswordEncoder;
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager, CorsConfigurationSource corsConfigurationSource) throws Exception {
        CustomAuthenticateFilter customAuthenticateFilter =
                new CustomAuthenticateFilter(authenticationManager);
        customAuthenticateFilter.setFilterProcessesUrl("/user/login");

        http.csrf().disable().cors().configurationSource(corsConfigurationSource).and()
                .sessionManagement().sessionCreationPolicy(STATELESS);

        http
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/")
                        .invalidateHttpSession(true)
                );
        http.authorizeRequests()
                .antMatchers(POST, "/user/create","/user/login", "/logout/**", "/user/token/refresh/**").permitAll()
                .antMatchers(GET, "/product/**", "/category/**", "/city/**", "/feature/**", "/booking/**", "/logout/**").permitAll();
        http.authorizeRequests()
                .antMatchers(PUT, "/booking/**").hasAnyAuthority("USER")
                .antMatchers(DELETE, "/booking/**").hasAnyAuthority("USER")
                .antMatchers(POST, "/booking/**", "/logout/**").hasAnyAuthority("USER", "ADMIN");
        http.authorizeRequests()
                .antMatchers(GET, "/rol/**", "/image/**", "/logout/**").hasAnyAuthority("ADMIN")
                .antMatchers(POST, "/rol/**", "/image/**").hasAnyAuthority("ADMIN")
                .antMatchers(PUT, "/product/**", "/category/**", "/city/**", "/feature/**", "/rol/**", "/image/**")
                .hasAnyAuthority("ADMIN")
                .antMatchers(DELETE, "/product/**", "/category/**", "/city/**", "/feature/**", "/rol/**", "/image/**")
                .hasAnyAuthority("ADMIN");
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(customAuthenticateFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    //grants public access to swagger
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer()  {
        return (web) -> web.ignoring().antMatchers("/v3/api-docs/**",
                "/swagger-ui.html",
                "/swagger-ui/**",
                "/configuration/**",
                "/swagger-resources/**");
    }
    @Bean
    @Primary
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://nuncataxi.ar.s3-website.us-east-2.amazonaws.com"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList("Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Origin", "Cache-Control", "Content-Type", "Authorization"));
        configuration.setAllowedMethods(Arrays.asList("DELETE", "GET", "POST", "PATCH", "PUT"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}