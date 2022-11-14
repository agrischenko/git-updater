import {Status} from "../model/status";
import * as RepoBehavior from "./repo";
import * as RepoReducer from "../model/reducers";

function pendingAll(repos) {
    repos.forEach(repo => RepoReducer.setStatus(repo, Status.Pending));
}

export async function refreshAll(repos) {
    let chain = Promise.resolve().then(() => pendingAll(repos));
    repos.forEach(repo =>
        chain = chain
            .then(() => RepoBehavior.refresh(repo))
    );
}