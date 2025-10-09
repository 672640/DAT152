/**
 * 
 */
package no.hvl.dat152.rest.ws.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.hvl.dat152.rest.ws.exceptions.AuthorNotFoundException;
import no.hvl.dat152.rest.ws.model.Author;
import no.hvl.dat152.rest.ws.repository.AuthorRepository;

/**
 * 
 */
@Service
public class AuthorService {

	@Autowired
	private AuthorRepository authorRepository;
/*
	public Author findById(int id) {
		
		return authorRepository.findById(id).get();
	}
*/
	public List<Author> findAll() {
		return (List<Author>) authorRepository.findAll();
	}

	public Author saveAuthor(Author author) {
		return authorRepository.save(author);
	}
	
	public Author findById(int id) throws AuthorNotFoundException {
		return authorRepository.findById(id).orElseThrow(() -> new AuthorNotFoundException("Author with id = " + id + " not found!"));
	}
	
	public Author updateAuthor(int id, Author updatedAuthor) throws AuthorNotFoundException {
        Author existing = authorRepository.findById(id)
                .orElseThrow(() -> new AuthorNotFoundException("Author with id = " + id + " not found!"));

        // Update allowed fields
        existing.setFirstname(updatedAuthor.getFirstname());
        existing.setLastname(updatedAuthor.getLastname());
        existing.setBooks(updatedAuthor.getBooks());

        return authorRepository.save(existing);
	}
}
