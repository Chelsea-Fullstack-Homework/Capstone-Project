const apiUrl = ""

export async function loginForm(formData) {
    try {
        const response = await fetch(`${apiUrl}/users/LoginForm`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        console.log(data)
        if (response.ok) {
            localStorage.setItem('token', data.token);

        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Login Error:', error);
        alert('An error occurred. Please try again.');
    }
}

export async function signupForm(formData) {
    try {
        const response = await fetch(`${apiUrl}/users/SignUpForm`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);

        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Sign Up Error:', error);
        alert('An error occurred. Please try again.');
        throw error
    }
}