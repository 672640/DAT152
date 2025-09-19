package no.hvl.dat152.security.filters;

import jakarta.servlet.http.HttpServletRequest;
import no.hvl.dat152.security.model.AppUser;

public class RequestHelper {
	
	public static boolean isLoggedIn(HttpServletRequest request) {
		
		return request.getSession().getAttribute("auth_user") != null;
	}
	
	public static String getRole(HttpServletRequest request) {
		
		AppUser user = (AppUser) request.getSession().getAttribute("auth_user");
		
		return user.getRole();
	}

}
