
export const determineCareerPath = (quizAnswers: string[]) => {
  const careerPathScores = {
    "tech": 0,
    "healthcare": 0,
    "creative": 0,
    "leadership": 0,
    "environment": 0,
    "hospitality": 0,
    "trades": 0
  };

  quizAnswers.forEach(answer => {
    // First question scoring
    if (answer.includes("complex problems")) {
      careerPathScores["tech"] += 2;
      careerPathScores["environment"] += 1;
    }
    if (answer.includes("supporting others")) {
      careerPathScores["healthcare"] += 2;
      careerPathScores["hospitality"] += 1;
    }
    if (answer.includes("creating")) {
      careerPathScores["creative"] += 2;
      careerPathScores["trades"] += 1;
    }
    if (answer.includes("organizing")) {
      careerPathScores["leadership"] += 2;
      careerPathScores["hospitality"] += 1;
    }

    // Second question scoring
    if (answer.includes("planner")) {
      careerPathScores["leadership"] += 2;
      careerPathScores["environment"] += 1;
    }
    if (answer.includes("creative")) {
      careerPathScores["creative"] += 2;
    }
    if (answer.includes("mediator")) {
      careerPathScores["healthcare"] += 2;
      careerPathScores["hospitality"] += 1;
    }
    if (answer.includes("executor")) {
      careerPathScores["tech"] += 1;
      careerPathScores["trades"] += 2;
    }

    // Third question scoring
    if (answer.includes("Fast-paced")) {
      careerPathScores["tech"] += 1;
      careerPathScores["hospitality"] += 2;
    }
    if (answer.includes("Structured")) {
      careerPathScores["leadership"] += 1;
      careerPathScores["trades"] += 1;
      careerPathScores["environment"] += 1;
    }
    if (answer.includes("Creative")) {
      careerPathScores["creative"] += 2;
    }
    if (answer.includes("Collaborative")) {
      careerPathScores["healthcare"] += 2;
      careerPathScores["leadership"] += 1;
    }
  });

  return Object.entries(careerPathScores).reduce((a, b) => b[1] > a[1] ? b : a)[0];
};
