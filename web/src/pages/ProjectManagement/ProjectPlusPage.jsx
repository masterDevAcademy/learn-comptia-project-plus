import React, { useState } from "react";
import { PMLessons } from "./lessons/lessonData";
import "./ProjectPlusPage.css";

const ProjectManagementPage = () => {
    const [currentLesson, setCurrentLesson] = useState(0);

    const handleNext = () => {
        if (currentLesson < PMLessons.length - 1) {
            setCurrentLesson(currentLesson + 1);
        }
    };

    const handlePrev = () => {
        if (currentLesson > 0) {
            setCurrentLesson(currentLesson - 1);
        }
    };

    const CurrentLesson = PMLessons[currentLesson].component;

    return (
        <div className="projectplus-page">
            {/* Sidebar */}
            <aside className="sidebar">
                <ul>
                    {PMLessons.map((lesson, index) => (
                        <li
                            key={index}
                            className={index === currentLesson ? "active" : ""}
                            onClick={() => setCurrentLesson(index)}
                        >
                            {lesson.title}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <main className="lesson-content">

    {/* Top Navigation */}
    <div className="lesson-navigation">
        <button
            onClick={handlePrev}
            disabled={currentLesson === 0}
        >
            Back
        </button>

        <button
            onClick={handleNext}
            disabled={currentLesson === PMLessons.length - 1}
        >
            Next
        </button>
    </div>

    {/* Lesson Body */}
    <div className="lesson-body">
        <CurrentLesson />
    </div>

    {/* Bottom Navigation */}
    <div className="lesson-navigation">
        <button
            onClick={handlePrev}
            disabled={currentLesson === 0}
        >
            Back
        </button>

        <button
            onClick={handleNext}
            disabled={currentLesson === PMLessons.length - 1}
        >
            Next
        </button>
    </div>

</main>

        </div>
    );
};

export default ProjectManagementPage;
