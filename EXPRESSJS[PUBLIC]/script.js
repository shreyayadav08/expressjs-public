document.getElementById('fetch-users').addEventListener('click', async () => {
    try {
      const response = await fetch('/users');
      const data = await response.json();
      const userList = document.getElementById('user-list');
      userList.innerHTML = ''; // Clear any existing content
  
      data.data.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user';
  
        const userImage = document.createElement('img');
        userImage.src = user.avatar;
        userDiv.appendChild(userImage);
  
        const userInfo = document.createElement('div');
        userInfo.className = 'user-info';
        userInfo.innerHTML = `<h3>${user.first_name} ${user.last_name}</h3><p>${user.email}</p>`;
        userDiv.appendChild(userInfo);
  
        userList.appendChild(userDiv);
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  });
  
  document.getElementById('fetch-user').addEventListener('click', async () => {
    const userId = document.getElementById('user-id').value;
    if (!userId) {
      alert('Please enter a user ID');
      return;
    }
  
    try {
      const response = await fetch(`/user/${userId}`);
      const data = await response.json();
      const userInfo = document.getElementById('user-info');
      userInfo.innerHTML = ''; // Clear any existing content
  
      const userDiv = document.createElement('div');
      userDiv.className = 'user';
  
      const userImage = document.createElement('img');
      userImage.src = data.data.avatar;
      userDiv.appendChild(userImage);
  
      const userInfoDiv = document.createElement('div');
      userInfoDiv.className = 'user-info';
      userInfoDiv.innerHTML = `<h3>${data.data.first_name} ${data.data.last_name}</h3><p>${data.data.email}</p>`;
      userDiv.appendChild(userInfoDiv);
  
      userInfo.appendChild(userDiv);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  });


  document.addEventListener('DOMContentLoaded', () => {
    const createUserForm = document.getElementById('create-user-form');
  
    if (createUserForm) {
      createUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('user-name').value;
        const job = document.getElementById('user-job').value;
  
        try {
          const response = await fetch('/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, job }),
          });
          const data = await response.json();
          const createdUserInfo = document.getElementById('created-user-info');
          createdUserInfo.innerHTML = `
            <div class="user">
              <h3>${data.name}</h3>
              <p>Job: ${data.job}</p>
              <p>ID: ${data.id}</p>
              <p>Created At: ${data.createdAt}</p>
            </div>
          `;
        } catch (error) {
          console.error('Error creating user:', error);
        }
      });
    }
  });
  
  