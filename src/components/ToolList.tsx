import { Droppable } from "react-beautiful-dnd"

const ToolList=()=>
{
    return(
        <div>
            <Droppable droppableId="tool-list">
                {(provided)=>
                (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <button>Button</button>
                    </div>
                )}
            </Droppable>

            <Droppable droppableId="dropped">
                {(provided)=>
                (
                    <div className="dropping-zone" ref={provided.innerRef} {...provided.droppableProps}>

                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default ToolList;