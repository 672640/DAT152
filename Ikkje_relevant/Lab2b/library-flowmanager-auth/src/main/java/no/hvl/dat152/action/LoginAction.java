/**
 * 
 */
package no.hvl.dat152.action;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import no.hvl.dat152.dao.AppUserDAO;
import no.hvl.dat152.security.model.AppUser;

/**
 * 
 */
public class LoginAction implements ControllerAction {

	@Override
	public int execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		request.getSession().setAttribute("message", "");
		
		login(request, response);
		
		return ControllerAction.SUCCESS;

	}
	
	private boolean login(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		boolean successfulLogin = false;

		if (username != null && password != null) {

			AppUserDAO userDAO = new AppUserDAO();
			AppUser authUser = userDAO.getAuthenticatedUser(username, password);

			if (authUser != null) {
				successfulLogin = true;
				request.getSession().setAttribute("auth_user", authUser);
			}
		}
		
		return successfulLogin;
	}

}
