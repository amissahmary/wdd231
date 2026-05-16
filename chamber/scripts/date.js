document.getElementById("lastModified").innerHTML = document.lastModified;
const year = document.querySelector("#currentYear");
year.innerHTML = "&copy; " + new Date().getFullYear();