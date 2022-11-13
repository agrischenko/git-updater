import {Status} from "./repositories/status";
import {refreshRepository, setRepositoryStatus} from "./repositories/behavior";

function pendingAll(repos) {
    repos.forEach(repo => setRepositoryStatus(repo, Status.Pending));
}

export async function RefreshAll(repos) {
    let chain = Promise.resolve().then(() => pendingAll(repos));
    repos.forEach(repo =>
        chain = chain
            .then(() => refreshRepository(repo))
    );
}