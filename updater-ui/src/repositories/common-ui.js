import Button from "../common/Button";
import {Status} from "./status";
import {refreshRepository} from "./behavior";

export function GitSource({repo, error, warning}) {
    return <>
        <div className={'repo-source'}>{repo['origin']}</div>
        <Issues error={error} warning={warning}/>
    </>;
}

export function Folder({repo, error, warning}) {
    return <>
        <div className={'repo-folder'}>{repo['folder']}</div>
        <Issues error={error} warning={warning}/>
    </>
}

export function Branches({repo}) {
    return <div className={'repo-branches'}>
        {`${repo.source} => ${repo.dest}`}
    </div>;
}

export function ButtonSync({active}) {
    return <Button className={'repo-btn-sync'}>
        {active ? 'Syncing...' : 'Sync'}
    </Button>
}

export function Header({repo, status}) {
    let refreshTitle = 'refresh ⟳';
    switch (status) {
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
        <div className={'repo-title'}>{repo.name}</div>
        <div className={'repo-refresh'} data-enabled={status === Status.Idle}
             onClick={() => refreshRepository(repo)}>
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
