/**
 * 
 */
package no.hvl.dat152.repository;


import org.springframework.data.repository.CrudRepository;

import no.hvl.dat152.model.Book;

/**
 * 
 */
public interface BookRepository extends CrudRepository<Book, Long> {


}
