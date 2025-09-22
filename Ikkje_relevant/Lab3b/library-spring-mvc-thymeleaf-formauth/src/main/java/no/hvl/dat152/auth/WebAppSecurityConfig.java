/**
 * 
 */
package no.hvl.dat152.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;


/**
 * 
 */

@Configuration
@EnableWebSecurity
public class WebAppSecurityConfig {

	
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	        .formLogin(Customizer.withDefaults()) // Use default form login
	        .authorizeHttpRequests(authorize -> authorize
	        	.requestMatchers("/", "/css/**").permitAll() // Allow public pages
	            .anyRequest().authenticated() // All other requests require authentication
	        );

	    return http.build();
	}
    
    @Bean
    public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
    @Bean
	public UserDetailsService userDetailsService() {
    	
    	PasswordEncoder encoder = passwordEncoder();
		UserDetails user = User.withUsername("user")
			.password(encoder.encode("password"))
			.roles("USER")
			.build();
		
		UserDetails admin = User.withUsername("admin")
			.password(encoder.encode("password123"))
			.roles("ADMIN")
			.build();
		
		return new InMemoryUserDetailsManager(user, admin);
	}
}
