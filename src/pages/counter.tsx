import React from 'react'

const styledButton = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"

// Todo: setup prettier
export default function Counter() {
    const [number, setNumber] = React.useState(0)

    return (
        <div className='h-screen grid place-items-center'>
            <div className='grid grid-cols-3 place-items-center'>
                <button className={styledButton} onClick={() => setNumber(x => x -1)}>Minus</button>
                <p className='text-center'>{number}</p>
                <button className={styledButton} onClick={() => setNumber(x => x + 1)}>Add</button>
            </div>
        </div>
    )
}