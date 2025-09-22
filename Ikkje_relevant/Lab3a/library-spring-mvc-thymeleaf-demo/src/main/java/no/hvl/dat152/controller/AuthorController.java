/**
 * 
 */
package no.hvl.dat152.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import no.hvl.dat152.exceptions.BookNotFoundException;
import no.hvl.dat152.exceptions.UpdateBookFailedException;
import no.hvl.dat152.model.Author;
import no.hvl.dat152.model.Book;
import no.hvl.dat152.service.AuthorService;
import no.hvl.dat152.service.BookService;

/**
 * 
 */
public class AuthorController {

// TODO
	
	@Autowired
	private BookService bookService;
	
	@Autowired
	private AuthorService authorService;

	@GetMapping("/")
	public String defaultView() {
		return "index";
	}
/*
	@GetMapping("/viewauthor")
	public String findAll(Model model) {
		List<Author> authors = (List<Author>) authorService.findAll();
		model.addAttribute("authors", authors);
		
		return "viewauthor";
	}
*/
	@RequestMapping(value = "/addauthor", method = RequestMethod.GET)
	public String create(Model model) {
		List<Author> authors = authorService.findAll();
		model.addAttribute("authors", authors);
		return "addauthor";
	}
	
	@PostMapping("/addauthor")
	public String create(@RequestParam String firstname, @RequestParam String lastname) {
		Author author = new Author(firstname, lastname);
		authorService.saveAuthor(author);
		return "redirect:/";
	}
	
	
}
