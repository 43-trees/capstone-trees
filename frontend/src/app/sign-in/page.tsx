'use client'
import React, { useState } from "react";


export default function App() {
    const handleSubmit = (username: string, password: string) => {
        console.log(username, password);
    };
    return (
        <div className="App">
            <RegistrationForm onSubmit={handleSubmit} />
        </div>
    );
}

function RegistrationForm({ onSubmit}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isEnable, setEnable] = useState(true);
    const handleKeyUp = () => {
        if (username.length > 0 && password.length > 0) setEnable(false);
        else setEnable(true);
    };
    return (
        <div className="">
            <label className="justify-center">User Name</label>
            <input
                className="justify-center"
                type="text"
                id="username-input"
                placeholder="username"
                value={username}
                onKeyUp={handleKeyUp}
                onChange={(event) => setUsername(event.target.value)}
            />
            <br />
            <br />
            <label>Password</label>
            <input
                type="password"
                id="password-input"
                placeholder="Password"
                onKeyUp={handleKeyUp}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <br />
            <button
                type="submit"
                id="button-input"
                disabled={isEnable}
                onClick={() => onSubmit(username, password)}
            >
                Register
            </button>
        </div>
    );
}
