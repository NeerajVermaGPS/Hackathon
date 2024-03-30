document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form data
    const question = document.getElementById('question').value;
    const optionA = document.getElementById('optionA').value;
    const optionB = document.getElementById('optionB').value;
    const optionC = document.getElementById('optionC').value;
    const optionD = document.getElementById('optionD').value;
    const answer = document.getElementById('answer').value;
  
    // Display data in a new div
    const quizResultDiv = document.getElementById('quizResult');
    quizResultDiv.innerHTML += `
      <div class="added_question">
        <span class="question_data"><strong>Question:</strong> <p class="add_to_db">${question}</p></span>
        <span class="question_data"><strong>Option A:</strong> <p class="add_to_db">${optionA}</p></span>
        <span class="question_data"><strong>Option B:</strong> <p class="add_to_db">${optionB}</p></span>
        <span class="question_data"><strong>Option C:</strong> <p class="add_to_db">${optionC}</p></span>
        <span class="question_data"><strong>Option D:</strong> <p class="add_to_db">${optionD}</p></span>
        <span class="question_data"><strong>Correct Answer:</strong> <p class="add_to_db">${answer}</p></span>
      </div>
    `;
  });

  document.getElementById('uploadButton').addEventListener('click', function() {
    const addedQuestions = document.querySelectorAll('.added_question');
  
    const quizData = [];
  
    addedQuestions.forEach(question => {
      const questionData = {
        question: question.querySelectorAll('.add_to_db')[0].textContent,
        option_a: question.querySelectorAll('.add_to_db')[1].textContent,
        option_b: question.querySelectorAll('.add_to_db')[2].textContent,
        option_c: question.querySelectorAll('.add_to_db')[3].textContent,
        option_d: question.querySelectorAll('.add_to_db')[4].textContent,
        correct_answer: question.querySelectorAll('.add_to_db')[5].textContent
      };
      quizData.push(questionData);
    });
    fetch('upload_quiz_data.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quizData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Quiz data uploaded successfully');
      } else {
        console.error('Failed to upload quiz data');
      }
    })
    .catch(error => console.error('Error uploading quiz data:', error));
  });
  
  