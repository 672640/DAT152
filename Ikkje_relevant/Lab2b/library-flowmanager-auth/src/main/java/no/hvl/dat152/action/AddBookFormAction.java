/**
 * 
 */
package no.hvl.dat152.action;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import no.hvl.dat152.dao.AuthorDAO;
import no.hvl.dat152.model.Author;

/**
 * 
 */
public class AddBookFormAction implements ControllerAction {

	@Override
	public int execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		// auto create isbn (this is just a toy example)
		String isbn = UUID.randomUUID().toString();
		request.setAttribute("isbn", isbn);		
		
		// collect authors
		AuthorDAO dao = new AuthorDAO();
		List<Author> authors = dao.getAllAuthors();
		request.setAttribute("authors", authors);
		
		return ControllerAction.SUCCESS;

	}

}
