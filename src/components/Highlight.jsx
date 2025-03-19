

function Highlight ({children, color, textColor = "#1b1b1b"}) {

    return <em style={{color: textColor, backgroundColor: color, padding: `${2.5}px`, borderRadius: `${8}px`}}>{children}</em>
}

export default Highlight;
