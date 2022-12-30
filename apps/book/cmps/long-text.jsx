const { useState, useEffect } = React

export function LongTxt({ text }) {
    const [isHidden, setIsHidden] = useState(true)

    useEffect(() => {
        getTextToShow(text)
    }, [isHidden])


    function getTextToShow(text) {
        if (isHidden) return text.substr(0, 100)
        else return text
    }

    function isTextLong(text) {
        return text.length > 100
    }


    return (
        <p>{getTextToShow(text)} 
            {isTextLong(text) && <a className="green" onClick={() => setIsHidden(!isHidden)} >
                {isHidden ? ' Continue Reading...' : ' Show less...'}</a>}
        </p>
    )
}

