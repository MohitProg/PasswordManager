import { useContext } from "react"
import DispatchContext from "../Context/DispatchContext"

const useDispatch=()=>{
    return useContext(DispatchContext);
}

export default useDispatch;