fetch('files/files/scripts/quiz_data.php')
  .then(response => response.json())
  .then(data => {
    const questions = data.map(question => ({
      question_number: question.question_number,
      question: question.question,
      option_a: question.option_a,
      option_b: question.option_b,
      option_c: question.option_c,
      option_d: question.option_d
    }));

    console.log(JSON.stringify(questions, null, 2));
  })
  .catch(error => console.error('Error fetching quiz data:', error));
