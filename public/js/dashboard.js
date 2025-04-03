document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");
    
    if (!token) {
        window.location.href = "login.html"; // Redirect if not logged in
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/user", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Invalid Token");
        }

        const data = await response.json();
        document.getElementById("welcome").innerText = `Welcome, ${data.user.name}!`;

        // Load code history
        const codeHistoryList = document.getElementById("code-history");
        codeHistoryList.innerHTML = ""; // Clear existing history

        if (data.user.codeHistory.length === 0) {
            codeHistoryList.innerHTML = "<li>No code history found.</li>";
        } else {
            data.user.codeHistory.forEach(code => {
                const listItem = document.createElement("li");
                listItem.innerText = code;
                codeHistoryList.appendChild(listItem);
            });
        }

    } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        window.location.href = "login.html"; // Redirect on error
    }
});
