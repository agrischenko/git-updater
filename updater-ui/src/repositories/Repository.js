import './Repositories.css';
import {useEffect, useReducer} from "react";
import {ButtonSync, Folder, Branches, Header, GitSource, Issues} from "./common-ui";
import {Status} from "./status";
import {repoReducer, setRepoDispatcher} from "../reducers";
import {refreshRepository} from "./behavior";


export default function Repository({value}) {

    const [state, dispatch] = useReducer(repoReducer,
        Object.assign({}, value, {status: Status.Idle}));
    setRepoDispatcher(state.name, dispatch);

    const {
        status,
        folderWarning, folderError,
        originWarning, originError,
        commonError
    } = state;

    useEffect(() => {
        refreshRepository(state).then(() => {});
    }, []);

    return <div className={'repo-root'}>
        <div className={'repo-info'}>
            <Header repo={state}
                    status={status} dispatch={dispatch}/>
            <Folder repo={state}
                    warning={folderWarning}
                    error={folderError}/>
            <GitSource repo={state}
                       warning={originWarning}
                       error={originError}/>
            <Branches repo={state}/>
        </div>
        <Issues error={commonError}/>
        <ButtonSync active={status === Status.Syncing}
                    name={state.name}/>
    </div>
}


