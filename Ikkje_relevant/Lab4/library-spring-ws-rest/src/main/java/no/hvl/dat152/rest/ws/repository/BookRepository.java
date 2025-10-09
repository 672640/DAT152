/**
 * 
 */
package no.hvl.dat152.rest.ws.repository;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import no.hvl.dat152.rest.ws.model.Book;

/**
 * 
 */
public interface BookRepository extends CrudRepository<Book, Long> {
	
	@Query("SELECT b FROM Book b WHERE b.isbn = :isbn")
	Book findBookByISBN(@Param("isbn") String isbn);
	
	// findByIsbn

}
