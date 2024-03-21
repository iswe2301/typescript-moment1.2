// Importerar moduler
import { saveCourses, getCourses } from './storage';
import { codeInput, nameInput, progressionSelect, syllabusInput, tableEl, coursesEl, newCourseCode } from './variables';

// Funktion för att visa sparade kurser på webbsidan
export function displayCourses(): void {
    const courses = getCourses(); // Hämtar befintliga kurser från localStorage
    // Kontrollerar om det finns sparade kurser
    if (courses.length > 0) {
        coursesEl.style.display = "block"; // Visar container för kurslistan/tabellen
        tableEl.innerHTML = ""; // Rensar innehållet i tabellen

        // Loopar genom varje kurs
        courses.forEach(course => {

            // Skapar en ny tabellrad för varje kurs
            const rowEl: HTMLTableRowElement = document.createElement("tr");
            tableEl.appendChild(rowEl); // Lägger till den nya raden i tabellens body

            // Skapar en ny cell för kurskod
            const courseCodeEl: HTMLTableCellElement = document.createElement("td");
            courseCodeEl.innerHTML = course.code; // Sätter cellens innehåll till kursens kod
            rowEl.appendChild(courseCodeEl); // Lägger till cellen i raden

            // Skapar en ny cell för kursnamn
            const courseNameEl: HTMLTableCellElement = document.createElement("td");
            courseNameEl.innerHTML = course.name; // Sätter cellens innehåll till kursens namn
            rowEl.appendChild(courseNameEl); // Lägger till cellen i raden

            // Skapar en ny cell för progression
            const progressionEl: HTMLTableCellElement = document.createElement("td");
            progressionEl.innerHTML = course.progression; // Sätter cellens innehåll till kursens progression
            rowEl.appendChild(progressionEl); // Lägger till cellen i raden

            // Skapar en cell för kursplanlänken
            const syllabusEl: HTMLTableCellElement = document.createElement("td");
            const link: HTMLAnchorElement = document.createElement("a"); // Skapar ett nytt a-element
            link.href = course.syllabus; // Sätter länkens url till kursens syllabus
            link.innerHTML = "Kursplan"; // Sätter länkens text
            link.target = "_blank"; // Sätter target till öppnas i ny flik
            syllabusEl.appendChild(link); // Lägger till länken i cellen
            rowEl.appendChild(syllabusEl); // Lägger till cellen i raden

            // Skapar en cell för redigeringsknappen
            const editEl: HTMLTableCellElement = document.createElement("td")
            const editButton: HTMLButtonElement = document.createElement("button"); // Skapar en ny knapp
            editButton.innerHTML = "Redigera <i class='fa-solid fa-pen-to-square'></i>"; // Sätter knappens innehåll
            editButton.addEventListener("click", () => editCourse(course.code)); // Skapar en händelselyssnare som vid klick anropar funktion för att redigera kurs, skickar med kurskod som argument
            editButton.className = "edit-btn"; // Lägger till en klass för knappen
            editEl.appendChild(editButton); // Lägger till knappen i cellen
            rowEl.appendChild(editEl); // Lägger till cellen i raden

            // Skapar en cell för ta-bort knappen
            const deleteEl: HTMLTableCellElement = document.createElement("td");
            const deleteButton: HTMLButtonElement = document.createElement("button"); // Skapar en ny knapp
            deleteButton.innerHTML = "Ta bort <i class='fa fa-solid fa-trash-can'></i>"; // Sätter knappens innehåll
            deleteButton.addEventListener("click", () => deleteCourse(course.code)); // Skapar en händelselyssnare som vid klick anropar funktion för att radera kurs, skickar med kurskod som argument
            deleteButton.className = "delete-btn"; // Lägger till en klass för knappen
            deleteEl.appendChild(deleteButton); // Lägger till knappen i cellen
            rowEl.appendChild(deleteEl); // Lägger till cellen i raden
        });
    } else {
        coursesEl.style.display = "none"; // Döljer container för kurslistan/tabellen om inga kurser finns
    }
}

// Funktion för att radera kurs baserat på kurskod
export function deleteCourse(courseCode: string): void {
    const courses = getCourses(); // Hämtar kurserna som finns sparade i localStorage
    let remainingCourses = courses.filter(course => course.code !== courseCode); // Filtrerar ut alla kurser som inte matchar den aktuella kurskoden och skapar en ny lista
    saveCourses(remainingCourses); // Sparar den uppdaterade listan av kurser till localStorage
    displayCourses(); // Anropar funktion för att uppdatera kurserna som visas på webbsidan
}

// Funktion för att redigera kurs baserat på kurskod
export function editCourse(courseCode: string): void {
    const course = getCourses().find(course => course.code === courseCode); // Hämtar den aktuella kursen från localStorage baserat på kurskoden
    // Kontrollerar om en kurs hittades
    if (course) {
        // Fyller isåfall i formuläret med kursinformation
        codeInput.value = course.code;
        nameInput.value = course.name;
        progressionSelect.value = course.progression;
        syllabusInput.value = course.syllabus;

        // Uppdaterar editcode till den aktuella kursens kod för att inte få fel i unikhet vid submit i formuläret
        newCourseCode.editCode = courseCode;
    }
}