/**
 * 
 */
package no.hvl.dat152.action;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import no.hvl.dat152.dao.BookDAO;

/**
 * 
 */
public class UpdateBookAction implements ControllerAction {

	@Override
	public int execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String isbn = request.getParameter("isbn");
		String title = request.getParameter("title");
		String authorid = request.getParameter("authorid");

		int author = Integer.parseInt(authorid);
		
		// save in DB
		BookDAO dao = new BookDAO();
		dao.updateBook(isbn, title, author);
		
		new ViewBookAction().execute(request, response);
//		if(success)
//			response.sendRedirect("viewbook?isbn="+isbn+"&authorid="+authorid);
//		else
//			response.sendError(401, "Update Not Successful...");
		
		return ControllerAction.SUCCESS;


	}

}
