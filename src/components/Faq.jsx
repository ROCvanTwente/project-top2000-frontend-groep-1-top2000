import { useState } from "react";
import "./Faq.css";
import Navbar from "./Navbar";

export default function Faq() {
    const [openIndexes, setOpenIndexes] = useState([]);

    const toggleIndex = (index) => {
        setOpenIndexes(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const faqItems = [
        {
            question: "Waar kan ik de Top 2000 online terugkijken en luisteren?",
            answer:
                "Kijk en luister de NPO Radio 2 Top 2000 van 2025 terug op nporadio2.nl en de NPO Luister-app."
        },
        {
            question: "Waar kan ik de Openingsshow van de Top 2000 terugkijken?",
            answer:
                "Ga naar de voldende link om de Openingsshow van de Top 2000 te kijken: https://www.nporadio2.nl/nieuws/top2000/2ae87300-7dd9-47f4-954b-f266a5a03666/kijk-hier-live-naar-de-openingsshow-van-de-npo-radio-2-top-2000"
        },
        {
            question: "Staan alle nummers van de NPO Radio 2 Top 2000 ook in een Spotifylijst?",
            answer:
                "Elk jaar updaten we weer onze Spotifylijst met alle nummers uit de NPO Radio 2 Top 2000."
        },
        {
            question: "Wat is het dj-team voor 2025?",
            answer:
                "De volgende dj's zullen de Top 2000 draaien: Jeroen van Inkel, Daniël Lippens, Tim Op het Broek, Tannaz Hajeby, Jeroen Kijk in de Vegte, Bart Arens, Annemarieke Schollaardt, Paul Rabbering, Ruud de Wild, Emmely de Wilt, Morad El Ouakili, en Jan-Willem Roodbeen."
        },
        {
            question: "Wanneer begint de NPO Radio 2 Top 2000?",
            answer:
                "De uitzending van de NPO Radio 2 Top 2000 begint op donderdag 25 december meteen om 00.00 uur. Traditiegetrouw is de nummer 1 op oudejaarsdag vlak voor de jaarwisseling te horen."
        },
        {
            question: "Hoe kan ik bij de NPO Radio 2 Top 2000 aanwezig zijn?",
            answer:
                "Ticketverkoop voor het Top 2000 Café was op zaterdag 13 december om 10.00 uur."
        },
        {
            question: "Wanneer mag ik stemmen voor de NPO Radio 2 Top 2000?",
            answer:
                "Je kon stemmen voor de NPO Radio 2 Top 2000 van 1 t/m 8 december."
        },
        {
            question: "Hoe luister ik naar de NPO Radio 2 Top 2000?",
            answer:
                "Lees het volgende: https://www.nporadio2.nl/nieuws/top2000/14a5a14d-13e2-41be-9d08-967bfe653b0b/zo-volg-je-dit-jaar-de-npo-radio-2-top-2000"
        },
        {
            question: "Waar is de NPO Radio 2 Top 2000 op Visual Radio te zien?",
            answer:
                "De NPO Radio 2 Top 2000 is non-stop live te zien via nporadio2.nl en de gratis NPO Luister-app."
        },
        {
            question: "Wanneer wordt de complete lijst bekendgemaakt?",
            answer:
                "https://www.nporadio2.nl/nieuws/top2000/467529e3-adee-43d0-a02d-c7e310a743f9/dit-is-de-npo-radio-2-top-2000-lijst-van-2025"
        },
        {
            question: "Wat voor tune draaien jullie toch steeds?",
            answer:
                "Aan het begin van ieder uur hoor je: Tommy Overture (The Who). Deze is voor de eerste NPO Radio 2 Top 2000 in 1999 opnieuw opgenomen door het Metropole Orkest o.l.v. Dick Bakker. In 2016 is de tune in een nieuw jasje gestoken."
        },
        {
            question: "In welke kranten staat de lijst van de NPO Radio 2 Top 2000?",
            answer:
                "De lijst komt dit jaar in Dagblad van het Noorden te staan."
        },
        {
            question: "Waarom zenden jullie de NPO Radio 2 Top 2000 24 uur per dag uit?",
            answer:
                "In 1999, het eerste jaar van the Top 2000, is ervoor gekozen de lijst als bijzonder project, achter elkaar uit te zenden."
        },
        {
            question: "Kan ik de tunes van de NPO Radio 2 Top 2000 ergens downloaden?",
            answer:
                "Nee, helaas mogen de tunes niet ter download aangeboden worden."
        },
        {
            question: "Waarom brengen jullie de NPO Radio 2 Top 2000 niet helemaal uit op CD?",
            answer:
                "Dat is een rechtenkwestie; lang niet alle platenmaatschappijen en/of artiesten geven toestemming voor het uitbrengen van hun nummer op zo'n CD."
        }
    ];

    return (
        // use the shared .app wrapper so page background / width match the rest of the site
        <div className="app">
            <Navbar />
            <main className="main-content">
                <div className="faq-hero">
                    <h1 className="faq-title">Veelgestelde vragen</h1>
                    <p className="faq-subtitle">Antwoorden op veelgestelde vragen over de Top 2000</p>
                </div>

                <div className="faq-content">
                    <section className="faq-card">
                        {faqItems.map((item, index) => {
                            const isOpen = openIndexes.includes(index);

                            return (
                                <div key={index} className="faq-item">
                                    <button
                                        className="faq-question"
                                        onClick={() => toggleIndex(index)}
                                    >
                                        <span>{item.question}</span>
                                        <span className="toggle-icon">{isOpen ? "−" : "+"}</span>
                                    </button>

                                    {isOpen && (
                                        <div className="faq-answer">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </section>
                </div>
            </main>
        </div>
    );
}