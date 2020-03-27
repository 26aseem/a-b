import React from 'react'
import "../styles.css"
import { API } from "../backend"
import Base from "./Base"

export default function Home() {
    console.log("API IS", API);
    return (
        <Base title="Home Page">
            <h1 className="text-white"> Hello front end </h1>
        </Base>
    )
}
