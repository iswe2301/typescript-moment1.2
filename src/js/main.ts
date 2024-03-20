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

    // Hämtar befintliga kurser från localStorage
    const courses = getCourses();
    // Lägger till kurs i listan med sparade kurser
    courses.push(course);

    saveCourses(courses); // Sparar den uppdaterade kurslistan i localStorage
    formEl.reset(); // Återställer formuläret
}

// Funktion för att spara kurser i localStorage, tar en array av CourseInfo-objekt som argument
function saveCourses(courses: CourseInfo[]): void {
    // Konverterar arrayen till en sträng och lagrar under "courses" i localStorage
    localStorage.setItem("courses", JSON.stringify(courses));
}

// Funktion för att hämta kurser från localStorage
function getCourses(): CourseInfo[] {
    // Hämtar kurser från localStorage
    const savedCourses = localStorage.getItem("courses");
    // Returnerar sparade kurser och omvandlar tillbaka till array av objekt eller en tom array om inga sparade kurser finns
    return savedCourses ? JSON.parse(savedCourses) : [];
}