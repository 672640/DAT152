/**
 * 
 */
package no.hvl.dat152.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.hvl.dat152.model.Author;
import no.hvl.dat152.repository.AuthorRepository;

/**
 * @author tdoy
 */
@Service
public class AuthorService {

	@Autowired		// use dependency injection to get an instance of AuthorRepository instead of Autowired
	private AuthorRepository authorRepository;

	
	// TODO : saveAuthor(Author author)
	
	public List<Author> findAll(){
		
		return (List<Author>) authorRepository.findAll();
	}
	
	public Author findById(int id) {
		
		return authorRepository.findById(id).get();
	}
}
