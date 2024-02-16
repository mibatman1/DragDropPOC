import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import style from "../interface/style";
import { useButtonContext } from "../context/ButtonContext";

type Props=
{
    index:number;
    button:string;
}

const DroppedButton=({button, index}:Props)=>
{
    const { buttonObject ,setButtonObject }=useButtonContext();
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [currentButtonID, setCurrentButtonID]=useState<string>("");
    const [style, setStyle] = useState<style>({
        color:'',
        backgroundColor:'',
        padding:'',
        border:'',
        text:'',
        href:'',
        target:''
    });

    const handleUpdateStyle = (buttonId:string) => 
    {
        setShowPopup(!showPopup);
        setCurrentButtonID(buttonId);
    };

    const handleApplyStyle=()=>
    {
        const button=document.getElementById(currentButtonID);
        console.log(button);
        if(button)
        {
            button.style.color=style.color
            button.style.padding=style.padding
            button.style.backgroundColor=style.backgroundColor
            button.style.border=style.border
            button.innerText=style.text
            button.setAttribute('href',style.href);
            button.setAttribute('target',style.target)

            const newButtonObject = {
                id: currentButtonID,
                style: style,
            };
            console.log(newButtonObject)
            setButtonObject([...buttonObject,newButtonObject]);
        }
        setShowPopup(false);
        setCurrentButtonID("");
    }

    return(
        <div>
            <Draggable draggableId={button.toString()} index={index}>
                {(provided)=>
                (
                    <div className="hello"
                        {...provided.dragHandleProps} 
                        {...provided.draggableProps} 
                        ref={provided.innerRef}
                    >
                        <a id={`dragged${button}`} onContextMenu={()=>{handleUpdateStyle(`dragged${button}`)}}>{`Button ${button}`}</a>
                        
                    </div>
                )}
            </Draggable>
            {showPopup && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="box">
                            <h3 className="title is-4">Update Style</h3>
                            <label className="label">
                                Color:
                                <input
                                    className="input"
                                    type="text"
                                    value={style.color || ''}
                                    onChange={(e) => setStyle({ ...style, color: e.target.value })}
                                />
                            </label>
                            <label className="label">
                                Background Color:
                                <input
                                    className="input"
                                    type="text"
                                    value={style.backgroundColor || ''}
                                    onChange={(e) => setStyle({ ...style, backgroundColor: e.target.value })}
                                />
                            </label>
                            <label className="label">
                                Padding:
                                <input
                                    className="input"
                                    type="text"
                                    value={style.padding || ''}
                                    onChange={(e) => setStyle({ ...style, padding: e.target.value })}
                                />
                            </label>
                            <label className="label">
                                Button Text:
                                <input
                                    className="input"
                                    type="text"
                                    value={style.text || ''}
                                    onChange={(e) => setStyle({ ...style, text: e.target.value })}
                                />
                            </label>
                            <label className="label">
                                Border:
                                <input
                                    className="input"
                                    type="text"
                                    value={style.border || ''}
                                    onChange={(e) => setStyle({ ...style, border: e.target.value })}
                                />
                            </label>
                            <label className="label">
                                Href:
                                <input
                                    className="input"
                                    type="text"
                                    value={style.href || ''}
                                    onChange={(e) => setStyle({ ...style, href: e.target.value })}
                                />
                            </label>
                            <label className="label">
                                Target:
                                <input
                                    className="input"
                                    type="text"
                                    value={style.target || ''}
                                    onChange={(e) => setStyle({ ...style, target: e.target.value })}
                                />
                            </label>
                            <button className="button is-primary mt-2 mr-1" onClick={handleApplyStyle}>
                                Apply
                            </button>
                            <button className="button is-danger mt-2" onClick={() => setShowPopup(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                    <button
                        className="modal-close is-large"
                        aria-label="close"
                        onClick={() => setShowPopup(false)}
                    ></button>
                </div>
            )}
        </div>
        
    )
}

export default DroppedButton;