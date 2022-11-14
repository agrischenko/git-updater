import Button from "../common/Button";
import {Status} from "./status";
import * as RepoBehavior from "./behavior";

export function GitSource({state}) {
    return <>
        <div className={'repo-source'}>{state['origin']}</div>
        <Issues warning={state.originWarning} error={state.originError}/>
    </>;
}

export function Folder({state}) {
    return <>
        <div className={'repo-folder'}>{state['folder']}</div>
        <Issues warning={state.folderWarning} error={state.folderError}/>
    </>
}

export function Branches({state}) {
    return <div className={'repo-branches'}>
        {`${state.source} => ${state.dest}`}
    </div>;
}

export function ButtonSync({state}) {
    const {status} = state || {};
    return <Button className={'repo-btn-sync'}>
        {status === Status.Syncing ? 'Syncing...' : 'Sync'}
    </Button>
}

export function Header({state}) {
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
             onClick={() => RepoBehavior.refresh(state)}>
            {refreshTitle}
        </div>
    </div>;
}

export function Issues ({error, warning}) {
    return <>
        {warning ?
            (<div className={'warning'}>{warning}</div>) : null
        }
        {error ?
            (<div className={'error'}>{error}</div>) : null
        }
    </>
}
