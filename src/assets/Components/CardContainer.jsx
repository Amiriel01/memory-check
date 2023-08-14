import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';


export default function ({ updateCurrentCards, highScore }) {

    const [characters, setCharacters] = useState([]);
    
    useEffect(() => {
        const getCharacters = async function () {
            const baseURL = "https://hp-api.onrender.com/api/characters";
            const response = await axios.get(baseURL);
            const data = response.data.filter(char => char.image);
            console.log("data", data);
            let fiveRandomCharacters = [];
            for (let i = 0; i < 5; i++) {
                const index = Math.floor(Math.random() * data.length);
                const check = data.includes(index);
                if (check === false) {
                    fiveRandomCharacters.push(data[index])
                } else {
                    while (check === true) {
                        index = Math.floor(Math.random() * data.length);
                        // check = data.includes(index);
                        if(check === false) {
                            fiveRandomCharacters.push(data[index])
                        }
                    }
                }
            }
            setCharacters(fiveRandomCharacters);
        }
        getCharacters();
    }, [])

    //this function will sort cards randomly//
    const randomCardOrder = () => {
        characters.sort(() => Math.random() > .5 ? -1 : 1)
    }

    //useEffect will check criteria each time highScore updates. If the highScore is equal to the cards array length the winner will be called.//
    const winner = () => {
        document.querySelector('.winner-message').innerText = "You Win!";
    }

    useEffect(() => {
        if (highScore === characters.length) {
            // console.log("winner")
            winner();
        }
    }, [highScore])

    // useEffect(() => {
    //     randomCardOrder();
    // })

    return (
        <div>
            <div>
                <p>Card Container Section</p>
                {/*Map over the characters array using each character and the character index.*/}
                {characters.map((character) => {
                    console.log(character.id)
                    return <div key={character.id}>
                        <Card
                            // key={index}

                            imageURL={character.image}
                            name={character.name}
                            updateCurrentCards={updateCurrentCards}
                            randomCardOrder={randomCardOrder} />
                    </div>
                })}
            </div>
            {/*Posts the winner message to the page*/}
            <div className="winner-container">
                <div className='winner-message'></div>

            </div>
        </div>
    )
}



