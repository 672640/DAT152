<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>View Book</title>
</head>
<body>

<div>
	<table border=1>
		<tr>
			<td width="100px">ISBN:</td>
			<td>${book.isbn}</td>
		</tr>
		<tr>
			<td>Title:</td>
			<td>${book.title}</td>
		</tr>
		<tr>
			<td>Author:</td>
			<td>${author.firstname} ${author.lastname}</td>
		</tr>
	</table>
	<p>
	<div>
		<a href="updatebookform?isbn=${book.isbn}">Update</a>
		<a href="/library">Home</a>
	</div>
</div>
</body>
</html>