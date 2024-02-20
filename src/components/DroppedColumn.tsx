import { Draggable, Droppable } from "react-beautiful-dnd"
import DroppedButton from "./DroppedButton";
type Props=
{
    index:number;
    button:string;
    columDropped:string[]
}

const DroppedColumn=({button, index, columDropped}:Props)=>
{
    return(
        <div>
            <Draggable draggableId={button.toString()+new Date()} index={index}>
                {(provided)=>
                (
                    <div className="hello"
                        {...provided.dragHandleProps} 
                        {...provided.draggableProps} 
                        ref={provided.innerRef}
                    >
                        <div className="gjs-row">
                            <Droppable droppableId="column-drop1">
                                {(provided)=>
                                (
                                    <div className="gjs-cell" ref={provided.innerRef} {...provided.droppableProps}>
                                        {columDropped.map((c, index)=>
                                        {
                                            return(
                                                <DroppedButton button={button+new Date()} index={index} key={button}/>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <Droppable droppableId="column-drop2">
                                {(provided)=>
                                (
                                    <div className="gjs-cell" ref={provided.innerRef} {...provided.droppableProps}>
                                        {columDropped.map((c, index)=>
                                        {
                                            return(
                                                <DroppedButton button={button+new Date()} index={index} key={button}/>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            
                            {/* <div className="gjs-cell"></div> */}
                        </div>
                        
                    </div>
                )}
            </Draggable>
        </div>
    )
}

export default DroppedColumn;