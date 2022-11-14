import './App.css';
import Button from './common/Button';
import Repositories from './repositories';
import DataProvider from './DataProvider';
import {useEffect, useState} from "react";
import {RefreshAll} from "./behavior";

function App() {

    const [repos, setRepos] = useState([]);

    useEffect(() => {
        DataProvider.Settings.init()
            .then(() => setRepos(DataProvider.Settings.getRepos()))
    }, []);

    return (
        <div className="App">
            <h3>Git Repo Updater</h3>
            <div className={'Header'}>
                <Button className={'rounded'}
                        onClick={() => RefreshAll(repos)}>
                    Refresh All
                </Button>
                <Button className={'rounded'}>Sync All</Button>
            </div>
            <Repositories items={repos}/>
        </div>
    );
}

export default App;
