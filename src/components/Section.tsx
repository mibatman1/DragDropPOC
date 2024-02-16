import { Droppable } from 'react-beautiful-dnd';
import '../App.css';
import SingleButton from './SingleButton';
import DroppedButton from './DroppedButton';
import FileSaver from 'file-saver';
import { useButtonContext } from '../context/ButtonContext';

type Props=
{
    buttons:string[]
    dropped:string[]
}

const Section=({buttons, dropped}:Props)=>
{
    const { buttonObject }=useButtonContext();
    const handleJson=()=>
    {
        if(!buttonObject)
            return null;

        console.log(buttonObject);
        const json=
        {
            rows:dropped.map((button, index)=>
            {
                const matchingObj=buttonObject.find(obj=>obj.id==="dragged"+button);
                const baseObj=
                {
                    id: "dragged"+button,
                    index:index,
                    tag: 'button',
                    content: `Button ${button}`,
                }
                if(matchingObj)
                {
                    return {...baseObj, style:matchingObj}
                }
                return baseObj;
            })    
        }
        console.log(json);
        var blob = new Blob([JSON.stringify(buttonObject)], {type: "application/json"});
        FileSaver.saveAs(blob, "element.json");
    }
   

    return(
        <div className="container">

            <Droppable droppableId='tool-list'>
                {(provided)=>
                (
                    <div className="left-side" ref={provided.innerRef} {...provided.droppableProps}>
                        {
                            buttons.map((button, index)=>
                            {
                                return(
                                    <SingleButton button={button} index={index} key={button}/>
                                )
                            })
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <Droppable droppableId='tool-drop'>
                
                {(provided)=>
                (
                    
                    <div className="right-side" ref={provided.innerRef} {...provided.droppableProps}>
                        {dropped.length!==0 && <button onClick={handleJson}>Download JSON</button>}
                        {
                            dropped.map((button, index)=>
                            {
                                return(
                                    <DroppedButton button={button} index={index} key={button}/>
                                )
                            })
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>


        </div>
    )
}

export default Section;