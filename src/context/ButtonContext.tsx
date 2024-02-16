import { createContext, useContext, useState } from "react";
import Button from "./interface/Button";

type ButtonContextType=
{
    buttonObject:Button[];
    setButtonObject: React.Dispatch<React.SetStateAction<Button[]>>;
}

const ButtonContext=createContext<ButtonContextType>({
    buttonObject:[],
    setButtonObject:()=>{}
});

export const useButtonContext = () => useContext(ButtonContext);

export const ButtonProvider=({children}:any)=>
{
    const [buttonObject, setButtonObject] = useState<Button[]>([]);
    return(
        <ButtonContext.Provider value={{buttonObject, setButtonObject}}>
            {children}
        </ButtonContext.Provider>
    );
}