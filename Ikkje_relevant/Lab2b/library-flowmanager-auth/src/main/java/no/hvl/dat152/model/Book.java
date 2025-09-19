/**
 * 
 */
package no.hvl.dat152.model;


/**
 * @author tdoy
 */

public class Book {


	private String isbn;	

	private String title;
	
	private int authorId;
	
	public Book(String isbn, String title, int authorId) {
		this.isbn = isbn;
		this.title = title;
		this.authorId = authorId;
	}
	/**
	 * @return the isbn
	 */
	public String getIsbn() {
		return isbn;
	}

	/**
	 * @param id the isbn to set
	 */
	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @return the authorId
	 */
	public int getAuthorId() {
		return authorId;
	}

	/**
	 * @param authorId the authorId to set
	 */
	public void setAuthorId(int authorId) {
		this.authorId = authorId;
	}

    @Override
    public String toString() {
        return "Book [isbn=" + isbn + ", title=" + title + ", authorId=" + authorId + "]";
    }
}
