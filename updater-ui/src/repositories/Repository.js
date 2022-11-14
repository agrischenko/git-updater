import './Repositories.css';
import {useEffect, useReducer} from "react";
import {ButtonSync, Folder, Branches, Header, GitSource, Issues} from "./common-ui";
import {reducer, getDefaultState, setDispatcher} from "../reducers";
import * as RepoBehavior from "./behavior";


export default function Repository({value}) {

    const [state, dispatch] = useReducer(reducer, getDefaultState(value));
    setDispatcher(state, dispatch);

    useEffect(() => {
        RepoBehavior.refresh(state).then(() => {});
    // eslint-disable-next-line
    }, []);

    return <div className={'repo-root'}>
        <div className={'repo-info'}>
            <Header state={state}/>
            <Folder state={state}/>
            <GitSource state={state}/>
            <Branches state={state}/>
        </div>
        <Issues error={state.commonError}/>
        <ButtonSync state={state}/>
    </div>
}


