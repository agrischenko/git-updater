import './Repositories.css';
import Repository from "./Repository";

export default function Repositories ({items}) {
    return <div>
        {items.map((repo, n) => <Repository key={n} value={repo}/>)}
    </div>
}

