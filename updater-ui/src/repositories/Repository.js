import './Repositories.css';
import {useEffect, useReducer} from "react";
import * as Reducer from "../model/reducers";
import * as Controller from "../controllers/repo";
import Button from "../common/Button";
import {Status} from "../model/status";

export default function Repository({value}) {

    const [state, dispatch] =
        useReducer(Reducer.reducer, Reducer.getDefaultState(value));
    Reducer.setDispatcher(state, dispatch);

    useEffect(() => {
        Controller.refresh(state).then(() => {});
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

function GitSource({state}) {
    return <>
        <div className={'repo-source'}>{state['origin']}</div>
        <Issues warning={state.originWarning} error={state.originError}/>
    </>;
}

function Folder({state}) {
    return <>
        <div className={'repo-folder'}>{state['folder']}</div>
        <Issues warning={state.folderWarning} error={state.folderError}/>
    </>
}

function Branches({state}) {
    return <div className={'repo-branches'}>
        {`${state.source} => ${state.dest}`}
    </div>;
}

function ButtonSync({state}) {
    const {status} = state || {};
    const enabled = Reducer.isSyncEnabled(state) && status === Status.Idle;
    return <Button className={'repo-btn-sync'}
                   enabled={enabled}>
        {status === Status.Syncing ? 'Syncing...' : 'Sync'}
    </Button>
}

function Header({state}) {
    let refreshTitle = 'refresh ⟳';
    const {name, status} = state;
    switch (state.status) {
        case Status.Pending:
            refreshTitle = 'pending...';
            break;
        case Status.Refreshing:
            refreshTitle = 'refreshing...';
            break;
        case Status.Syncing:
            refreshTitle = 'syncing...';
            break;
    }

    return <div className={'repo-header'}>
        <div className={'repo-title'}>{name}</div>
        <div className={'repo-refresh'} data-enabled={status === Status.Idle}
             onClick={() => Controller.refresh(state)}>
            {refreshTitle}
        </div>
    </div>;
}

function Issues ({error, warning}) {
    return <>
        {warning ?
            (<div className={'warning'}>{warning}</div>) : null
        }
        {error ?
            (<div className={'error'}>{error}</div>) : null
        }
    </>
}
