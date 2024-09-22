// Function to handle the form submission
document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const userId = document.getElementById('userId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    if (userId) {
        // Update user
        fetch(`/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email })
        })
        .then(response => response.json())
        .then(data => {
            console.log('User updated:', data);
            loadUsers();
            document.getElementById('userForm').reset(); // Clear the form
            document.getElementById('userId').value = ''; // Clear the userId field
        })
        .catch(error => console.error('Error:', error));
    } else {
        // Create user
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email })
        })
        .then(response => response.json())
        .then(data => {
            console.log('User added:', data);
            loadUsers();
            document.getElementById('userForm').reset(); // Clear the form
        })
        .catch(error => console.error('Error:', error));
    }
});

// Function to load and display users
function loadUsers() {
    fetch('/users')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            data.forEach(user => {
                userList.innerHTML += `
                    <div class="user-item">
                        ${user.name} - ${user.email}
                        <div>
                            <button onclick="editUser(${user.id})">Edit</button>
                            <button onclick="deleteUser(${user.id})">Delete</button>
                        </div>
                    </div>`;
            });
        })
        .catch(error => console.error('Error:', error));
}

// Function to edit a user
function editUser(id) {
    fetch(`/users/${id}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('userId').value = user.id;
            document.getElementById('name').value = user.name;
            document.getElementById('email').value = user.email;
        })
        .catch(error => console.error('Error:', error));
}

// Function to delete a user
function deleteUser(id) {
    fetch(`/users/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        console.log('User deleted');
        loadUsers();
    })
    .catch(error => console.error('Error:', error));
}

// Load users on page load
window.onload = loadUsers;
