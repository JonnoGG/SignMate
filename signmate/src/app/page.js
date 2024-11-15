"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect, useRef } from "react";

const VideoPlayer = ({ videos }) => {};

// Fetch data function
async function fetchData() {
    try {
        const res = await fetch("/data/map.json");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Unable to fetch data:", error);
        return [];
    }
}

function sentenceChecker(correctSentence, inputSentence) {
    const correctList = correctSentence.replace(".", "").toLowerCase().split(" ");
    const inputList = inputSentence.replace(".", "").toLowerCase().split(" ");
    const result = [];

    for (let i = 0; i < inputList.length; i++) {
        if (i < correctList.length) {
            result.push({ word: inputList[i], isCorrect: inputList[i] === correctList[i] });
        } else {
            result.push({ word: inputList[i], isCorrect: false });
        }
    }
    return result;
}

export default function Home() {
    const [wordsArray, setWordsArray] = useState([]); // Store the words from JSON
    const [currentWords, setCurrentWords] = useState([]); // Store the current 3 random words
    const [videos, setVideos] = useState([
        "/data/videos/00336.mp4",
        "/data/videos/00338.mp4",
        "/data/videos/00376.mp4",
    ]);
    const [correctSentence, setCorrectSentence] = useState("");
    const [inputSentence, setInputSentence] = useState("");
    const [results, setResults] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        const checkResults = sentenceChecker(correctSentence, inputSentence);
        setResults(checkResults);
        setSubmitted(true);
        setIsHidden(false);
    };
    // Fetch data on mount
    useEffect(() => {
        const fetchDataAsync = async () => {
            const data = await fetchData();
            setWordsArray(data); // Set the words from JSON to state
        };
        fetchDataAsync();
    }, []);

    // Generate new random words from wordsArray
    const newQuestion = () => {
        // Make sure wordsArray is populated
        if (wordsArray.length === 0) return [];

        const randomWords = [];
        for (let i = 0; i < 5; i++) {
            const randIndex = Math.floor(Math.random() * wordsArray.length);
            randomWords.push(wordsArray[randIndex]);
        }
        setCurrentWords(randomWords);

        const newVideos = [];
        for (let i = 0; i < randomWords.length; i++) {
            let path = "/data/videos/" + randomWords[i]["video_id"] + ".mp4";
            newVideos.push(path);
        }
        setVideos(newVideos);

        let correctSentence = "";
        for (let i = 0; i < randomWords.length; i++) {
            correctSentence = correctSentence + randomWords[i]["word"] + " ";
        }

        setCorrectSentence(correctSentence);

        replayVideos();
        setIsHidden(true);
    };
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRef = useRef(null);

    // Handle video end
    const handleVideoEnd = () => {
        if (currentVideoIndex < videos.length - 1) {
            setCurrentVideoIndex((prevIndex) => prevIndex + 1);
        }
    };

    const replayVideos = () => {
        setCurrentVideoIndex(0);
    };

    // Automatically play the current video once the index changes
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play();
        }
    }, [currentVideoIndex]);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center justify-center">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                    }}
                >
                    <h1 className="text-6xl drop-shadow-xl">Sign Mate</h1>
                    <img src="logo.png" width="50px" />
                </div>
                {/* <VideoPlayer videos={videos} /> */}
                <video
                    ref={videoRef}
                    style={{ borderRadius: "25px" }}
                    width="750"
                    height="500"
                    onEnded={handleVideoEnd}
                    autoPlay
                    muted
                >
                    <source src={videos[currentVideoIndex]} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                    }}
                >
                    <Button variant="outline" onClick={replayVideos} className="purpleButton">
                        Replay Videos
                    </Button>
                    <Button variant="outline" onClick={() => newQuestion()} className="purpleButton">
                        New Question
                    </Button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Input
                            type="text"
                            value={inputSentence}
                            onChange={(e) => setInputSentence(e.target.value)}
                            required
                            style={{ width: "400px" }}
                        />
                        <Button variant="outline" className="purpleButton">
                            Check Sentence
                        </Button>
                    </form>
                    <div
                        style={{
                            display: isHidden ? "none" : "flex", // Set display conditionally to "none" or "flex"
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        {submitted && (
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        gap: "10px",
                                    }}
                                >
                                    <div>
                                        <h3>
                                            <strong>Results:</strong>
                                        </h3>
                                    </div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                        {results.map((result, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    padding: "5px 10px",
                                                    backgroundColor: result.isCorrect ? "#d4edda" : "#f8d7da",
                                                    color: result.isCorrect ? "#155724" : "#721c24",
                                                    border: "1px solid",
                                                    borderColor: result.isCorrect ? "#c3e6cb" : "#f5c6cb",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                {result.word} - {result.isCorrect ? "Correct" : "Incorrect"}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <p>
                                        <strong>Answer: </strong>
                                        {correctSentence}
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
