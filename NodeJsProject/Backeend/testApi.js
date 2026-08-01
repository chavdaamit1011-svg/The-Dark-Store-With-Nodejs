fetch("http://localhost:8024/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "chavdaamit1011@gmail.com" })
}).then(res => res.json()).then(data => console.log("Response:", data)).catch(err => console.log("Error:", err));
