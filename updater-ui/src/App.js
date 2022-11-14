import './App.css';
import {useEffect, useState} from "react";
import DataProvider from './DataProvider';
import * as Controller from "./controllers/common";
import Button from './common/Button';
import Repositories from './repositories';

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
                        onClick={() => Controller.refreshAll(repos)}>
                    Refresh All
                </Button>
                <Button className={'rounded'}
                        onClick={() => Controller.syncAll(repos)}>
                    Sync All
                </Button>
            </div>
            <Repositories items={repos}/>
        </div>
    );
}

export default App;
