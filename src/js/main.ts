const formEl = document.getElementById("form-container") as HTMLFormElement; // som formulär
const codeInput = document.getElementById("code") as HTMLInputElement; // som input
const nameInput = document.getElementById("name") as HTMLInputElement; // som input
const progressionSelect = document.getElementById("progression") as HTMLSelectElement; // som select-element
const syllabusInput = document.getElementById("syllabus") as HTMLInputElement; // som input

// Interface som definierar strukturen på en kurs, tar emot strängar
interface CourseInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

window.onload = init;
function init(): void {
    formEl.addEventListener("submit", submitForm);
}

// Funktion för att skicka formulär
function submitForm(event: Event) {
    event.preventDefault(); // Förhindrar standardbeteende för formulär

    // Skapar ett objekt med den nya/uppdaterade kursinformationen från formulärets värden enligt interface-struktur
    const course: CourseInfo = {
        code: codeInput.value,
        name: nameInput.value,
        progression: progressionSelect.value,
        syllabus: syllabusInput.value
    };

    formEl.reset(); // Återställer formuläret
}
