import {
  calculateFinalGrade,
  getAcademicStatus,
  getPerformanceRemark,
  calculateClassAverage,
  countPassingStudents,
  getTopStudent
} from "./gradeUtils.js";

export function displayMessage(message) {
  document.getElementById("messageArea").textContent = message;
}

export function displayStudents(students) {
  const studentList = document.getElementById("studentList");
  studentList.replaceChildren();

  if (students.length === 0) {
    displayMessage("No students found");
    return;
  }

  displayMessage("");

  const fragment = document.createDocumentFragment();

  students.forEach((student) => {
    const { id, name, block, quiz, lab, exam } = student;

    const finalGrade = calculateFinalGrade(student);
    const academicStatus = getAcademicStatus(finalGrade);
    const performanceRemark = getPerformanceRemark(finalGrade);

    const card = document.createElement("article");
    card.className = "student-card";
    card.dataset.studentId = id;

    // Student details and final grade.
    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";

    const studentInfo = document.createElement("div");
    studentInfo.className = "student-info";

    const studentName = document.createElement("h3");
    studentName.className = "student-name";
    studentName.textContent = name;

    const studentBlock = document.createElement("p");
    studentBlock.className = "student-block";
    studentBlock.textContent = block;

    studentInfo.append(studentName, studentBlock);

    const gradeDisplay = document.createElement("div");
    gradeDisplay.className = "grade-display";

    const gradeValue = document.createElement("span");
    gradeValue.className = "grade-value";
    gradeValue.textContent = finalGrade.toFixed(2);

    const gradeLabel = document.createElement("span");
    gradeLabel.className = "grade-label";
    gradeLabel.textContent = "Final Grade";

    gradeDisplay.append(gradeValue, gradeLabel);
    cardHeader.append(studentInfo, gradeDisplay);

    // Display the three component scores in columns.
    const componentScores = document.createElement("dl");
    componentScores.className = "component-scores";

    const scores = [
      ["Quiz", quiz],
      ["Laboratory", lab],
      ["Exam", exam]
    ];

    scores.forEach(([label, value]) => {
      const score = document.createElement("div");
      score.className = "component-score";

      const scoreLabel = document.createElement("dt");
      scoreLabel.textContent = label;

      const scoreValue = document.createElement("dd");
      scoreValue.textContent = value;

      score.append(scoreLabel, scoreValue);
      componentScores.append(score);
    });

    // Academic status and performance remark.
    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";

    const status = document.createElement("p");
    status.className = "status";

    const statusLabel = document.createElement("span");
    statusLabel.className = "sr-only";
    statusLabel.textContent = "Academic status: ";

    status.append(statusLabel, academicStatus);

    const remark = document.createElement("p");
    remark.className = "remark";

    const remarkLabel = document.createElement("span");
    remarkLabel.className = "sr-only";
    remarkLabel.textContent = "Performance remark: ";

    remark.append(remarkLabel, performanceRemark);
    cardFooter.append(status, remark);

    card.append(cardHeader, componentScores, cardFooter);
    fragment.append(card);
  });

  studentList.append(fragment);
}

export function displaySummary(students) {
  document.getElementById("classAverage").textContent =
    calculateClassAverage(students).toFixed(2);

  document.getElementById("passingCount").textContent =
    countPassingStudents(students);

  document.getElementById("displayedCount").textContent =
    students.length;

  const topStudent = getTopStudent(students);

  document.getElementById("topStudent").textContent = topStudent
    ? `${topStudent.name} (${calculateFinalGrade(topStudent).toFixed(2)})`
    : "N/A";
}