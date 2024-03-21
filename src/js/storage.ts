// Importerar modul
import { courseInfo } from './interface';

// Funktion för att spara kurser i localStorage, tar en array av CourseInfo-objekt som argument
export function saveCourses(courses: courseInfo[]): void {
    // Konverterar arrayen till en sträng och lagrar under "courses" i localStorage
    localStorage.setItem("courses", JSON.stringify(courses));
}

// Funktion för att hämta kurser från localStorage
export function getCourses(): courseInfo[] {
    // Hämtar kurser från localStorage
    const savedCourses = localStorage.getItem("courses");
    // Returnerar sparade kurser och omvandlar tillbaka till array av objekt eller en tom array om inga sparade kurser finns
    return savedCourses ? JSON.parse(savedCourses) : [];
}