package com.g1appdev.Moodel.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/*
 *  TODO: Added student side
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private CombinedUserDetailsService combinedUserDetailsService;

    /*
     *  Creates an HTTP security filter chain which basically handles any external source
     *  that is looking to use our APIs.
     * 
     *  As of 11/7/2024, the filter chain is set to permit all access to /api/teacher/register
     *  and api/teacher/login while allowing access to all APIs within teacher so long as they 
     *  are logged in with a user account that has the role of "ROLE_TEACHER".
     * 
     *  All other requests need authentication: meaning they will throw a 401 Unauthorized if
     *  an external source tries to use our APIs without being logged in first.
     */
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer:: disable)
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/teacher/register",
                                "/api/teacher/login"
                                )
                                .permitAll()
                .requestMatchers("/api/teacher/**").hasRole("TEACHER")
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults()); 
            
        return http.build();
    }

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();

        authenticationProvider.setUserDetailsService(combinedUserDetailsService);
        authenticationProvider.setPasswordEncoder(bCryptPasswordEncoder());

        return authenticationProvider;
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

     /*
     *  Creates a cross-origin resource sharing (CORS) configuration which handles which external
     *  points (in here, localhost ports) are allowed to access our APIs.
     * 
     *  As of 11/7/2024, localhost:8080 (local source) & localhost:3000 (our frontend source) 
     *  has access to our API which means they can all CRUD methods: GET, POST, PUT, & DELETE
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        config.setAllowCredentials(true);
        config.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        
        // registers configuration to all endpoints within the project
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
