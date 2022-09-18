import "./App.css";
import React from 'react';
import { useState, useEffect } from "react";
import { getTest } from "./services/test";

function App() {
    const [data, setData] = useState<string>("Hello World!");

    useEffect(() => {
        // Since the getTest method already has a try/catch block inside, there's no point in catching an error here
        getTest().then((res) => {
            if (res?.message) setData(res.message);
        });
    }, []);

    return (
        <div className="App">
            <h1>{data}</h1>
        </div>
    );
}

export default App;
