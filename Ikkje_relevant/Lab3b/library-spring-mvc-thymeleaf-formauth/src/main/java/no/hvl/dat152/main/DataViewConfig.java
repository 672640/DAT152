/**
 * 
 */
package no.hvl.dat152.main;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 
 */
@EnableJpaRepositories("no.hvl.dat152.repository")
@EntityScan("no.hvl.dat152.model")
@ComponentScan(basePackages = {"no.hvl.dat152.service", 
								"no.hvl.dat152.controller", 
								"no.hvl.dat152.exceptions",
								"no.hvl.dat152.auth"})
@Configuration
public class DataViewConfig implements WebMvcConfigurer {

	public void addViewControllers(ViewControllerRegistry registry) {
//		registry.addViewController("/login").setViewName("login");
//		registry.addViewController("/").setViewName("index");
//		registry.addViewController("/index").setViewName("index");
	}
}
