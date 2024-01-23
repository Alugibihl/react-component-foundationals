import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const Nasa = () => {
    let [data, setData] = useState([])
    let [today, setToday] = useState([])
    let [count, setCount] = useState("")
    let [randData, setRandData] = useState([])

    useEffect(() => {
        // getNasa()
        getNasaToday()
    }, [])

    useEffect(() => {
        getNasaRandom()
    }, [count])

    // const getNasa = async () => {
    //     try {
    //         let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=2')
    //         if (response.ok) {
    //             let info = await response.json()
    //             setData(info)
    //         }
    //     }
    //     catch (e) {
    //         console.error("failed to get nasa")
    //     }
    // }
    const getNasaToday = async () => {
        try {
            let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=Nz8jgT2MFYZej5PrQ5VmY42sjHJhGgdHsSK6aGu9')
            if (response.ok) {
                let info = await response.json()
                setToday(info)
            }
        }
        catch (e) {
            console.error("failed to get nasa")
        }
    }
    const getNasaRandom = async () => {
        try {
            let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=Nz8jgT2MFYZej5PrQ5VmY42sjHJhGgdHsSK6aGu9&count=${count}`)
            if (response.ok) {
                let info = await response.json()
                setRandData(info)
            }
        }
        catch (e) {
            console.error("failed to get nasa")
        }
    }


    console.log("data", data, "today", today);

    let navigate = useNavigate()
    return (
        <div>
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/images")}>Carousel</button>
            <div>
                <div>{today.date}</div>
                <div>{today.title}</div>
                <img src={today.url} alt={today.title} />
                <div>{today.explanation}</div>
            </div>
            <div>
                <label>
                    Get Photos
                    <input
                        type="number"
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        min={1}
                        max={20}
                    />
                </label>
                {typeof count === Number &&
                    <div>
                        {randData.map((data) => {
                            return <div key={data.id}>
                                <img src={data.url} alt={data.title} />
                            </div>
                        })}
                    </div>
                }
            </div>
        </div >
    )
}

export default Nasa;



// fetch data from this api https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
// fetch todays pic of the day
// fetch a specific pic of the day by date
// fetch random number of pictures
// fetch photos from a date range
// specific, random, and range, always have pic of the day and its data displaying
