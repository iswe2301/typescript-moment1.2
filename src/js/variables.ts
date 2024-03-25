// Hämtar elementet genom ID, lagrar variabler för export
export const formEl = document.getElementById("form-container") as HTMLFormElement; // som formulär
export const codeInput = document.getElementById("code") as HTMLInputElement; // som input
export const nameInput = document.getElementById("name") as HTMLInputElement; // som input
export const progressionSelect = document.getElementById("progression") as HTMLSelectElement; // som select-element
export const syllabusInput = document.getElementById("syllabus") as HTMLInputElement; // som input
export const tableEl = document.getElementById("courses") as HTMLTableSectionElement; // som table-section
export const coursesEl = document.getElementById("course-section") as HTMLElement; // som HTML-element
export const popupEl = document.querySelector('.popup') as HTMLElement; // som HTML-element

// Skapar ett objekt för att kunna exportera editCode och ändra värdet senare.
// Lagrar variabel för kurskod för att som hålla reda på vilken kurs som redigeras, tom sträng = ingen kurs redigeras
export const newCourseCode: { editCode: string } = { editCode: "" };