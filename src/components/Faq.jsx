import { useState } from "react";
import "./Faq.css";

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqItems = [
        {
            question: "Waar kan ik de Top 2000 online terugkijken en luisteren?",
            answer:
                "Je kunt de NPO Radio 2 Top 2000 terugkijken en luisteren via nporadio2.nl en de NPO Luister-app."
        },
        {
            question: "Staan alle nummers van de Top 2000 op Spotify?",
            answer:
                "Ja, elk jaar verschijnt er een officiële Spotify-playlist met alle nummers uit de NPO Radio 2 Top 2000."
        },
        {
            question: "Wanneer begint de NPO Radio 2 Top 2000?",
            answer:
                "De Top 2000 start traditioneel op 25 december om 00.00 uur en eindigt op oudejaarsavond."
        },
        {
            question: "Wanneer kan ik stemmen voor de Top 2000?",
            answer:
                "Stemmen is meestal mogelijk begin december. De exacte data worden elk jaar bekendgemaakt door NPO Radio 2."
        },
        {
            question: "Waarom wordt de Top 2000 24 uur per dag uitgezonden?",
            answer:
                "Sinds 1999 wordt de lijst onafgebroken uitgezonden als traditie en om de spanning erin te houden."
        }
    ];

    return (
        <div className="faq-page">
            <h1>Veelgestelde vragen</h1>

            {faqItems.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                    <div key={index} className="faq-item">
                        <button
                            className="faq-question"
                            onClick={() =>
                                setOpenIndex(isOpen ? null : index)
                            }
                        >
                            <span>{item.question}</span>
                            <span>{isOpen ? "−" : "+"}</span>
                        </button>

                        {isOpen && (
                            <div className="faq-answer">
                                {item.answer}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
