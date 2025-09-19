/**
 * 
 */
package no.hvl.dat152.action;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * 
 */
public class LogoutAction implements ControllerAction {

	@Override
	public int execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		request.getSession().invalidate();
		
		request.getSession().setAttribute("message", "You are now logged out.");
		
		return ControllerAction.SUCCESS;

	}

}
