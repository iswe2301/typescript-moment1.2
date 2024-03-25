// Importerar moduler
import { courseInfo } from './interface';
import { displayCourses } from './courses';
import { saveCourses, getCourses } from './storage';
import { isUnique, isValid } from './validation';
import { formEl, codeInput, nameInput, progressionSelect, syllabusInput, newCourseCode, popupEl } from './variables';

// Funktion för att skicka formulär
export function submitForm(event: Event) {
    event.preventDefault(); // Förhindrar standardbeteende för formulär

    // Skapar ett objekt med den nya/uppdaterade kursinformationen från formulärets värden enligt interface-struktur
    const course: courseInfo = {
        code: codeInput.value,
        name: nameInput.value,
        progression: progressionSelect.value,
        syllabus: syllabusInput.value
    };

    // Kontrollerar att den angivna kurskoden är unik
    if (!isUnique(course.code)) {
        alert("Kurskoden måste vara unik."); // Om den inte är unik avbryts funktionen och felmeddelande visas
        return;
    }

    // Kontrollerar att progression är giltig
    if (!isValid(course.progression)) {
        alert("Ogiltig progression. Välj A, B, eller C."); // Om inte så avbryts funktionen och ett felmeddelande visas.
        return;
    }

    // Hämtar befintliga kurser från localStorage
    const courses = getCourses();
    // Kontrollerar om en kurs redigeras (om editcode är inte tom textsträng)
    if (newCourseCode.editCode !== "") {
        // Söker efter kursens index genom att loopa över alla kurser och jämföra om editCode är samma som kurskoden
        const index = courses.findIndex(course => course.code === newCourseCode.editCode);
        // Uppdaterar befintlig kurs med ny information.
        courses[index] = course;
    } else {
        // Lägger till ny kurs i listan om den inte redigeras
        courses.push(course);
    }

    saveCourses(courses); // Sparar den uppdaterade kurslistan i localStorage
    displayCourses(); // Uppdaterar visningen av kurser på webbsidan
    formEl.reset(); // Återställer formuläret
    newCourseCode.editCode = ""; // Rensar editCode inför nästa redigering

    popupEl.classList.add("show"); // Lägger till klassen show vid klick på knappen
    popupEl.innerHTML = `Kursen ${course.code} tillagd i "Mina kurser"!`; // Skapar innehållet för popupen

    // Döljer popup efter 3 sekunder
    setTimeout(function () {
        popupEl.classList.remove("show"); // Tar bort show-klassen
        popupEl.innerHTML = ''; // Tömmer innehållet
    }, 3000); // 3 sekunder
}