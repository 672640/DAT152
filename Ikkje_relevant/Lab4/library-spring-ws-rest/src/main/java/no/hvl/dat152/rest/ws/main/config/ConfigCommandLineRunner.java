package no.hvl.dat152.rest.ws.main.config;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import no.hvl.dat152.rest.ws.model.Author;
import no.hvl.dat152.rest.ws.model.Book;
import no.hvl.dat152.rest.ws.repository.AuthorRepository;
import no.hvl.dat152.rest.ws.repository.BookRepository;
import no.hvl.dat152.rest.ws.service.AuthorService;

@Component
class ConfigCommandLineRunner implements CommandLineRunner  {

  private static final Logger log = LoggerFactory.getLogger(ConfigCommandLineRunner.class);

  @Autowired
  AuthorService authorService;
  
  @Autowired
  BookRepository bookRepository;
  
  @Autowired
  AuthorRepository authorRepository;
  
  @Override
  public void run(String... args) throws Exception {
	  
	  authorRepository.saveAll(createDefaultAuthors());
	  bookRepository.saveAll(creatDefaultBooks());
   
  }
  
	private Iterable<Author> createDefaultAuthors() {
		
		List<Author> authors = new ArrayList<Author>();
		
		authors.add(new Author("Shari", "Pfleeger"));
		authors.add(new Author("Perry", "Lea"));
		authors.add(new Author("James", "Kurose"));
		authors.add(new Author("Keith", "Ross"));
		authors.add(new Author("Martin", "Kleppmann"));
		
		return authors;
	}
	
	private Iterable<Book> creatDefaultBooks() {
		
		Author author1 = authorService.findById(1);
		Author author2 = authorService.findById(2);
		
		Set<Author> authors = new HashSet<Author>();
		authors.add(author1);

		Book book1 = new Book();
		book1.setIsbn("abcde1234");
		book1.setTitle("Software Engineering");
		book1.setAuthors(authors);
		
		Set<Author> authors2 = new HashSet<Author>();
		Book book2 = new Book();
		book2.setIsbn("ghijk1234");
		book2.setTitle("Computer Network");
		authors2.add(author1);
		authors2.add(author2);
		book2.setAuthors(authors2);
		
		List<Book> books =  new ArrayList<Book>();		
		books.add(book1);
		books.add(book2);
		
		return books;
	}

}
