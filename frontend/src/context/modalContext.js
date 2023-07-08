import { createContext, useContext, useState } from "react";

    const ModalContext = createContext()
    export const useModalContext = () => useContext(ModalContext)


    export default function ModalProvider(props){
        const [modal, setModal] = useState(null)
        const [options, setOptions] = useState({})
        return(
        <ModalContext.Provider value={{modal, setModal, options, setOptions}}>
            {props.children}
        </ModalContext.Provider>
        )
    }
