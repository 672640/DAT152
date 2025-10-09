/**
 * 
 */
package no.hvl.dat152.rest.ws.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import no.hvl.dat152.rest.ws.exceptions.AuthorNotFoundException;
import no.hvl.dat152.rest.ws.model.Author;
import no.hvl.dat152.rest.ws.service.AuthorService;

/**
 * 
 */
@RestController
@RequestMapping("/elibrary/api/v1")
public class AuthorController {

	@Autowired
	private AuthorService authorService;
	
	@GetMapping("/authors")
	public ResponseEntity<Object> getAllAuthors() {
		List<Author> authors = authorService.findAll();

		if(authors.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(authors, HttpStatus.OK);
		}
	}

	@GetMapping("/authors")
	public ResponseEntity<Author> getAuthor(@PathVariable int id) throws AuthorNotFoundException {
		
		Author author = authorService.findById(id);
		
		if(author == null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
				return new ResponseEntity<>(author, HttpStatus.OK);	
		}
	}
	
	@GetMapping("/authors")
	public ResponseEntity<Author> createAuthor(@RequestBody Author author) {
		Author nauthor = authorService.saveAuthor(author);
		
		return new ResponseEntity<>(nauthor, HttpStatus.CREATED);
	}
	
	@PostMapping("/authors")
	public ResponseEntity<Author> updateAuthor(@RequestBody int id, Author updatedAuthor) throws AuthorNotFoundException {
		Author uauthor = authorService.updateAuthor(id, updatedAuthor);
		
		if(uauthor == null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(uauthor, HttpStatus.OK);
		}
	}
	
//Stod ikkje noko om at vi trengde å delete-e ein author, så... treng vel ikkje implementere det??
}
