<%@ page contentType="text/html" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>View Books</title>
</head>
<body>
	<div>
		<table border=1>
			<tr>
				<th>ISBN</th>
				<th>Title</th>
			</tr>
			<c:forEach var="book" items="${books}">
			<tr>
				<td> ${book.isbn}</td>
				<td> ${book.title}</td>
				<td>
					<a href="viewbook?isbn=${book.isbn}&authorid=${book.authorId}">view</a>
				</td>
				<td>
					<a href="updatebookform?isbn=${book.isbn}&authorid=${book.authorId}">update</a>
				</td>
				<td>
					<a href="deletebookconfirm?isbn=${book.isbn}&authorid=${book.authorId}">delete</a>
				</td>
				<td>
					<a href="deletebookform?isbn=${book.isbn}&authorid=${book.authorId}">delete</a>
				</td>
				<td>
					<a href="deletebook?isbn=${book.isbn}&authorid=${book.authorId}">delete</a>
				</td>
			</tr>
			</c:forEach>
		</table>
		<p>
		<div>
			<a href="/library">Home</a>
		</div>
	</div>
</body>
</html>