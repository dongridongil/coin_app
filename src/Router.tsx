import { Switch, Route, HashRouter } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

interface IRouertProps {}
function Router({}: IRouertProps) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/:coinId">
                    <Coin />
                </Route>
                <Route path="/">
                    <Coins />
                </Route>
            </Switch>
        </HashRouter>
    );
}
export default Router;
