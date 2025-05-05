const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        {/* TODO Student data goes here! */}
        <h3>{props.major}</h3>
        <p>{props.name.first} is taking {props.numCredits} and is {props.fromWisconsin ? '': 'NOT ' }from Wisconsin.</p>
        <p>They have {props.interests.length} interests including...</p>
        <ul>
            {props.interests.map((interest, index) => {
                return <li key={index}>{interest}</li>
            })}
        </ul>
    </div>
}

export default Student;