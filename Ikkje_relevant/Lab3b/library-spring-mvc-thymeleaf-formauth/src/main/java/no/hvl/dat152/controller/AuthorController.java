/**
 * 
 */
package no.hvl.dat152.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * @author tdoy
 */
@Controller
public class AuthorController {
	@GetMapping("/login")
	public String login() {
		return "login";
	}

}
