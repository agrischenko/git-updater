import {Status} from "./repositories/status";
import * as RepoBehavior from "./repositories/behavior";
import * as RepoReducers from "./reducers";

function pendingAll(repos) {
    repos.forEach(repo => RepoReducers.setStatus(repo, Status.Pending));
}

export async function RefreshAll(repos) {
    let chain = Promise.resolve().then(() => pendingAll(repos));
    repos.forEach(repo =>
        chain = chain
            .then(() => RepoBehavior.refresh(repo))
    );
}