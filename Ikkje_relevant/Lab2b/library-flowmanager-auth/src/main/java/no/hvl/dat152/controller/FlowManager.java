/**
 * 
 */
package no.hvl.dat152.controller;

import java.util.HashMap;
import java.util.Map;

/**
 * 
 */
public class FlowManager {

	private final Map<String, String> pages;
	/**
	 * 
	 */
	public FlowManager() {
		
		this.pages = new HashMap<>();
		
		pages.put("addbookform", "/addbook.jsp");
		pages.put("addbook", "/viewbooks.jsp");
		pages.put("updatebookform", "/updatebook.jsp");
		pages.put("updatebook", "/viewbook.jsp");
		pages.put("viewbook", "/viewbook.jsp");
		pages.put("viewbooks", "/viewbooks.jsp");
		pages.put("loginform", "/login.jsp");
		pages.put("addauthorform", "/addauthor.jsp");
		pages.put("addauthor", "/viewbooks.jsp");
		pages.put("deletebookconfirm", "/viewbooks.jsp");
		pages.put("deletebook", "/viewbooks.jsp");
		pages.put("deletebookaction", "/viewbooks.jsp");
	}
	
	public String getPage(String cmd) {
		return pages.get(cmd);
	}

}
