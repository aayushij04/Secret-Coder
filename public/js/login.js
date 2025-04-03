document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "dashboard.html"; // Redirect to dashboard after login
        } else {
            alert(data.message); // Show error if login fails
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Something went wrong. Please try again.");
    }
});
