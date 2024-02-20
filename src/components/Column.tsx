import { Draggable } from "react-beautiful-dnd"
type Props=
{
    index:number;
    button:string;
}

const Column=({button, index}:Props)=>
{
    return(
        <Draggable draggableId={button} index={index}>
            {(provided)=>
            (
                <div 
                    {...provided.dragHandleProps} 
                    {...provided.draggableProps} 
                    ref={provided.innerRef}
                >
                    <div className="gjs-row">
                        <div className="gjs-cell"></div>
                        <div className="gjs-cell"></div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Column;