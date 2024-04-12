const apiUrl = "http://localhost:3000"

export async function loginForm(formData) {
    // formData.email
    // formData.password
    try {
        const response = await fetch(`${apiUrl}/api/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        (data)
        if (response.ok) {
            localStorage.setItem('token', data.token);
            return data;
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Login Error:', error);
        alert('An error occurred. Please try again.');
    }
}

export async function signupForm(formData) {
    (formData)
    try {
        const response = await fetch(`${apiUrl}/api/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert(data.message)
            return data
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Sign Up Error:', error);
        alert('An error occurred. Please try again.');
    }
}

export async function allProducts() {
    try {
        const response = await fetch(`${apiUrl}/api/books`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching books:', error.message);
        throw error;
    }
}

export async function singleBook(bookSku) {
    try {
        const response = await fetch(`${apiUrl}/api/books/${bookSku}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('Error fetching book details:', error);
        throw error;
    }
}

export async function addToCart(token, book, user) {
    try {
        const response = await fetch(`${apiUrl}/api/cart/${user.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                "action": "add",
                "sku": book.sku,
                "price": book.price
            })
        });
        const data = await response.json();
        ("addtocart response: ")
        (data)
        return data.message;
    } catch (err) {
        console.error(err.message);
    }
}