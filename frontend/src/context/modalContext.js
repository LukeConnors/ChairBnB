import { createContext, useContext, useState } from "react";

    const ModalContext = createContext()
    export const useModalContext = () => useContext(ModalContext)


    export default function ModalProvider(props){
        const [modal, setModal] = useState(null)
        return(
        <ModalContext.Provider value={{modal, setModal}}>
            {props.children}
        </ModalContext.Provider>
        )
    }
