import './Tags.scss';
import {useState} from 'react';

export function Tags({changed}) {
    const tags = {
        dog: 'Собаки',
        cat: 'Кошки',
        city: 'Города'
    }

    const [currentState, setCurrentState] = useState('dog')

    function handleButton(name) {
        if (name === currentState) {
            return
        }
        setCurrentState(name)
        if (typeof changed === 'function') {
            changed(name)
        }
    }

    return (
        <ul className='tags'>
            {Object.keys(tags).map(item => (
                <li className='tags__item' key={item}>
                    <button
                        className={`tags__button ${currentState === item ? 'current' : ''}`}
                        onClick={() => handleButton(item)}>{tags[item]}</button>
                </li>
            ))}
        </ul>
    )
}
