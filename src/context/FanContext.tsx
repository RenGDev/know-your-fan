import { createContext, useContext, useState } from "react"

type FanData = {
    name?: string
    cpf?: string
    address?: string
    email?: string
    games?: string[]
    events?: string
    products?: string
    nomeDetectado?: string;
    cpfDetectado?: string;
    documentoValidado?: boolean;
}

type FanContextType = {
    fanData: FanData;
    setFanData: (data: Partial<FanData>) => void;
}

const FanContext = createContext<FanContextType | undefined>(undefined)

export function FanProvider({children} : {children: React.ReactNode}){
    const [fanData, setFanDataState] = useState<FanData>({})

    const setFanData = (newData: Partial<FanData>) => {
        setFanDataState((prev) => ({
          ...prev,
          ...newData,
        }));
    }

    return(

        <FanContext.Provider value = {{fanData, setFanData}}>
            {children}
        </FanContext.Provider>
    )
}

export function useFan(){
    const context = useContext(FanContext)
    if(!context) throw new Error("useFan must be used inside FanProvider")
    return context
}