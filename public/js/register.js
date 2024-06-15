form.addEventListener("submit", () => {
    const register = {
        email: email.value,
        password: password.value
    }

    fetch('/api/register', {
        method: "POST",
        body: JSON.stringify(register),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            if (data.status == "error") {
                error.style.display = "block";
                error.innerText = data.error;
            }
            else {
                success.style.display = "block";
                success.innerText = data.success;
            }
        })
})