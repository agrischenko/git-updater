import './Repositories.css';
import Button from "../Button";
import {useEffect, useState} from "react";
import Events from "../Events";
import {BEAN, refreshRepository} from "./behavior";

export default function Repository({value}) {

    const [isSyncing, setIsSyncing] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [folderError, setFolderError] = useState('');
    const [folderWarning, setFolderWarning] = useState('');
    const [originError, setOriginError] = useState('');
    const [originWarning, setOriginWarning] = useState('');
    const [commonError, setCommonError] = useState('');

    useEffect(() => {

        function resetMarks() {
            setFolderWarning('');
            setOriginWarning('');
            setFolderError('');
            setOriginError('');
            setCommonError('');
        }

        const sync = (name, newState) =>
            name === value.name && setIsSyncing(newState);
        const refresh = (name, newState) => {
            if (name !== value.name || (newState && isRefreshing))
                return;
            setIsRefreshing(newState);
            if (!newState)
                return;

            resetMarks();

            refreshRepository(value)
                .then(data => {
                    switch (data.bean) {
                        case BEAN.FOLDER:
                            setFolderWarning(data.status);
                            break;
                        case BEAN.ORIGIN:
                            setOriginWarning(data.status);
                            break;
                        default:
                    }
                    setIsRefreshing(false);
                })
                .catch(error => {
                    switch (error.bean) {
                        case BEAN.FOLDER:
                            setFolderError(error.status || error.message);
                            break;
                        case BEAN.ORIGIN:
                            setOriginError(error.status || error.message);
                            break;
                        default:
                            setCommonError(error.status || error.message);
                    }
                    setIsRefreshing(false);
                })
        }

        Events.on(Events.all.SYNC, sync);
        Events.on(Events.all.REFRESH, refresh);

        refresh(value.name, true);

        return () => {
            Events.off(Events.all.SYNC, sync);
            Events.off(Events.all.REFRESH, refresh);
        };
    }, [value]);

    return <div className={'repo-root'}>
        <div className={'repo-info'}>
            <Header repo={value} isRefreshing={isRefreshing}/>
            <Folder repo={value} warning={folderWarning} error={folderError}/>
            <GitSource repo={value} warning={originWarning} error={originError}/>
            <Branches repo={value}/>
        </div>
        <Issues error={commonError}/>
        <ButtonSync active={isSyncing} name={value.name}/>
    </div>
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

function GitSource({repo, error, warning}) {
    return <>
        <div className={'repo-source'}>{repo['origin']}</div>
        <Issues error={error} warning={warning}/>
    </>;
}

function Folder({repo, error, warning}) {
    return <>
        <div className={'repo-folder'}>{repo['folder']}</div>
        <Issues error={error} warning={warning}/>
    </>
}

function Branches({repo}) {
    return <div className={'repo-branches'}>
        {`${repo.source} => ${repo.dest}`}
    </div>;
}

function ButtonSync({name, active}) {
    return <Button className={'repo-btn-sync'}
                   onClick={() => Events.emit(Events.all.SYNC, name, !active)}>
        {active ? 'Syncing...' : 'Sync'}
    </Button>
}

function Header({repo, isRefreshing}) {
    return <div className={'repo-header'}>
        <div className={'repo-title'}>{repo.name}</div>
        <div className={'repo-refresh'}
             onClick={() => Events.emit(Events.all.REFRESH, repo.name, !isRefreshing)}>
            refresh ⟳
        </div>
    </div>;
}

