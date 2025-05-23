export async function login({ email, password }) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'user@example.com' && password === 'password') {
                resolve({
                    id: 1,
                    name: 'Test User',
                    email: 'user@example.com'
                });
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, 500);
    });
}

export async function logout() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 300);
    });
}