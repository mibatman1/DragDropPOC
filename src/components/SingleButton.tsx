import { Draggable } from "react-beautiful-dnd";
import '../App.css';

type Props=
{
    index:number;
    button:string;
}

const SingleButton=({button, index}:Props)=>
{

    return(
        <Draggable draggableId={button.toString()} index={index}>
            {(provided)=>
            (
                <div className="hello"
                    {...provided.dragHandleProps} 
                    {...provided.draggableProps} 
                    ref={provided.innerRef}
                >
                    <button>{button}</button>
                </div>
            )}
        </Draggable>
    )
}

export default SingleButton;