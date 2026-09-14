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

    const heading = document.createElement("h3");
    heading.textContent = name;

    const blockText = document.createElement("p");
    blockText.className = "student-block";
    blockText.textContent = block;

    const scores = document.createElement("dl");
    const scoreDetails = [
      ["Quiz", quiz],
      ["Laboratory", lab],
      ["Prelim Exam", exam],
      ["Final Grade", finalGrade.toFixed(2)]
    ];

    scoreDetails.forEach(([label, value]) => {
      const row = document.createElement("div");
      row.className = "score-row";

      if (label === "Final Grade") {
        row.classList.add("final-grade");
      }

      const term = document.createElement("dt");
      term.textContent = label;

      const description = document.createElement("dd");
      description.textContent = value;

      row.append(term, description);
      scores.append(row);
    });

    const status = document.createElement("p");
    const statusClass = academicStatus.toLowerCase().replaceAll(" ", "-");
    status.className = `status status-${statusClass}`;
    status.textContent = academicStatus;

    const remark = document.createElement("p");
    remark.className = "remark";
    remark.textContent = `Performance Remark: ${performanceRemark}`;

    card.append(heading, blockText, scores, status, remark);
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