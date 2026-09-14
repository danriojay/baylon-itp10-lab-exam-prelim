import { students } from "./students.js";

import {
  searchStudents,
  filterStudentsByBlock,
  filterStudentsByStatus
} from "./gradeUtils.js";

import {
  displayStudents,
  displaySummary,
  displayMessage
} from "./display.js";

const searchInput = document.getElementById("searchInput");
const blockFilter = document.getElementById("blockFilter");
const statusFilter = document.getElementById("statusFilter");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");

function updateDashboard(filteredStudents) {
  displayStudents(filteredStudents);
  displaySummary(filteredStudents);
}

function applyFilters() {
  let filteredStudents = searchStudents(students, searchInput.value);

  filteredStudents = filterStudentsByBlock(
    filteredStudents,
    blockFilter.value
  );

  filteredStudents = filterStudentsByStatus(
    filteredStudents,
    statusFilter.value
  );

  updateDashboard(filteredStudents);
}

function resetDashboard() {
  searchInput.value = "";
  blockFilter.value = "All";
  statusFilter.value = "All";

  displayMessage("");
  updateDashboard(students);
}

applyBtn.addEventListener("click", applyFilters);
resetBtn.addEventListener("click", resetDashboard);

searchInput.addEventListener("input", applyFilters);
blockFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);

// ES modules run after the HTML has been parsed.
updateDashboard(students);