"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect, useRef } from "react";

function VideoPlayerFlask() {
    const videoUrl = "http://localhost:5000/getvideo"; // Flask endpoint to access the video

    return (
        <div>
            <h1>Watch the Video</h1>
            <video width="750" height="500" controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

const VideoPlayer = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRef = useRef(null);

    // List of video URLs
    const videos = ["/data/videos/00336.mp4", "/data/videos/00338.mp4", "/data/videos/00341.mp4"];

    // Handle video end
    const handleVideoEnd = () => {
        // If there's another video to play, update the state
        if (currentVideoIndex < videos.length - 1) {
            setCurrentVideoIndex((prevIndex) => prevIndex + 1);
        }
    };

    const replayVideos = () => {
        // If there's another video to play, update the state
        setCurrentVideoIndex(0);
    };

    // Automatically play the current video once the index changes
    useEffect(() => {
        if (videoRef.current) {
            // Ensure the video plays only after it has loaded
            videoRef.current.load();
            videoRef.current.play();
        }
    }, [currentVideoIndex]); // Run the effect whenever the current video index changes

    return (
        <div>
            <video
                ref={videoRef}
                width="750"
                height="500"
                onEnded={handleVideoEnd} // Trigger when video ends
                autoPlay // Start playing the video automatically
                muted // Mute the video for autoplay
            >
                <source src={videos[currentVideoIndex]} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <Button variant="outline" onClick={replayVideos}>
                Replay
            </Button>
        </div>
    );
};


// function readJSONFile(filePath) {
//     fs.readFile(filePath, "utf8", (err, data) => {
//         if (err) {
//             console.error("Error reading file:", err);
//             return;
//         }

//         try {
//             const jsonData = JSON.parse(data);
//             return jsonData;
//         } catch (parseError) {
//             return 
//         }
//     });
// }

// function newQuestion() {
//     const fs = require("fs");

//     // Function to read and parse JSON
    

//     // Use the function with your JSON file
//     readJSONFile("data.json");
//     for (let i = 0; i < cars.length; i++) {
//         text += cars[i] + "<br>";
//     }
// }

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-5xl">Sign Mate</h1>
                <VideoPlayer />
                <form>
                    <Input />
                    <Button variant="outline">Button</Button>
                </form>
            </main>
        </div>
    );
}
