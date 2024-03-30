document.getElementById('stDataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form data
    const fullname = document.getElementById('full_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const roll = document.getElementById('roll').value;
  
    // Display data in a new div
    const stDataView = document.getElementById('student_data_view');
    stDataView.innerHTML += `
      <div class="added_stdata">
        <span class="stdata"><strong>Roll No:</strong> <p class="add_to_db">${roll}</p></span>
        <span class="stdata"><strong>Name:</strong> <p class="add_to_db">${fullname}</p></span>
        <span class="stdata"><strong>Email:</strong> <p class="add_to_db">${email}</p></span>
        <span class="stdata"><strong>Password:</strong> <p class="add_to_db">${password}</p></span>
      </div>
    `;
  });

  document.getElementById('uploadButton').addEventListener('click', function() {
    const addedStData = document.querySelectorAll('.added_stdata');
  
    const studentData = [];
  
    addedStData.forEach(student => {
      const stGroupData = {
        roll: student.querySelectorAll('.add_to_db')[0].textContent,
        name: student.querySelectorAll('.add_to_db')[1].textContent,
        email: student.querySelectorAll('.add_to_db')[2].textContent,
        password: student.querySelectorAll('.add_to_db')[3].textContent
      };
      studentData.push(stGroupData);
    });
    fetch('upload_student_data.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Student data uploaded successfully');
      } else {
        console.error('Failed to upload student data');
      }
    })
    .catch(error => console.error('Error uploading student data:', error));
  });
  
  