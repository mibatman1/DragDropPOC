import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import Section from "./components/Section";
import { useState } from 'react';
import { ButtonProvider } from './context/ButtonContext';

const App=()=>
{
  const[buttons, setButtons]=useState<string[]>(['a','b','c']);
  const [droppedButtons, setDroppedButton]=useState<string[]>([]);

  const onDragEnd=(result:DropResult)=>
  {
    console.log(result)
    const {source, destination}=result;
    if(!destination)
      return;

    if(source.droppableId===destination.droppableId && destination.index===source.index)
      return;

    let add;
    let active = buttons;
    let dropped=droppedButtons;
    if(source.droppableId==='tool-list')
    {
      add=active[source.index];
      //active.splice(source.index,1)
    }
    else
    {
      add=dropped[source.index]
      dropped.splice(source.index,1);
    }

    if(destination.droppableId==='tool-drop')
    {
      dropped.splice(destination.index,0,add);
    }
    // else
    // {
    //   active.splice(destination.index,0,add);
    // }
    setButtons(active)
    setDroppedButton(dropped);
  }

  

  return(
    <DragDropContext onDragEnd={onDragEnd}>
      <ButtonProvider>
        <div className="container">
          <Section buttons={buttons} dropped={droppedButtons}/>
        </div>
      </ButtonProvider>
    </DragDropContext>
  )
}

export default App;