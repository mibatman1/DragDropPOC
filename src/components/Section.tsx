import { Droppable } from 'react-beautiful-dnd';
import '../App.css';
import SingleButton from './SingleButton';
import DroppedButton from './DroppedButton';
import FileSaver from 'file-saver';
import { useButtonContext } from '../context/ButtonContext';
import Column from './Column';
import DroppedColumn from './DroppedColumn';

type Props=
{
    element:string[]
    dropped:string[]
    columndropped:string[]
}

const Section=({element, dropped, columndropped}:Props)=>
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
                            element.map((element, index)=>
                            {
                                if(element==='button')
                                    return <SingleButton button={element} index={index} key={index}/>
                                else if(element==='column')
                                    return <Column button={element} index={index} key={index}/>
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
                                if(button==='button')
                                    return <DroppedButton button={button+new Date()} index={index} key={button}/>
                                else if(button==='column')
                                    return <DroppedColumn button={button} index={index} key={button} columDropped={columndropped}/>
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