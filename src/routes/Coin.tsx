import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import { Switch, Route, useLocation, useParams, useRouteMatch, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import Chart from './Chart';
import Price from './Price';
import { FcHome } from 'react-icons/fc';
import Header from '../components/Header';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atom';
import { MdOutlineDarkMode } from 'react-icons/md';

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
    text-align: center;
    display: block;
`;
const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const BtnToHome = styled.button`
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.grayText};
`;

// const Header = styled.header`
//     height: 15vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;
    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;
const Description = styled.div`
    background-color: ${(props) => props.theme.divColor};
    border-radius: 15px;
    padding: 25px 22px;
    margin-bottom: 100px;
    color: ${(props) => props.theme.textColor};
    span {
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 15px;
        display: block;
    }
    p {
        font-size: 16px;
        line-height: 1.4em;
    }
`;
const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
    a {
        padding: 7px 0px;
        display: block;
    }
`;
interface RouteParams {
    coinId: string;
}
interface RouteState {
    name: string;
}
interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}
interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

interface ICoinProps {}
function Coin({}: ICoinProps) {
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation<RouteState>();
    const priceMatch = useRouteMatch('/:coinId/price');
    const chartMatch = useRouteMatch('/:coinId/chart');
    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(['info', coinId], () =>
        fetchCoinInfo(coinId)
    );
    // console.log(infoData, '인뽀데이타');
    const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
        ['tickers', coinId],
        () => fetchCoinTickers(coinId),
        {
            refetchInterval: 5000,
        }
    );
    const loading = infoLoading || tickersLoading;
    // const percent24h = tickersData?.quotes.USD.percent_change_24h;
    const coinPrice = tickersData?.quotes.USD.price;
    return (
        <Container>
            {loading ? (
                <Loader>API 호출중입니다.</Loader>
            ) : (
                <>
                    <Helmet>
                        <title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</title>
                    </Helmet>
                    <Nav>
                        <BtnToHome>
                            <Link to={'/'}>
                                <FcHome size={'50'} />
                            </Link>
                        </BtnToHome>
                        <button onClick={toggleDarkAtom}>
                            <MdOutlineDarkMode size={'30'} />
                        </button>
                    </Nav>

                    {/* <Header name={infoData?.name} rank={infoData?.rank} price={coinPrice} per24={percent24h} /> */}

                    <Switch>
                        <Route path={`/:coinId/price`}>
                            <Price
                                percent30m={tickersData?.quotes.USD.percent_change_30m}
                                percent1h={tickersData?.quotes.USD.percent_change_1h}
                                percent12h={tickersData?.quotes.USD.percent_change_12h}
                                percent7d={tickersData?.quotes.USD.percent_change_7d}
                                percent30d={tickersData?.quotes.USD.percent_change_30d}
                                percent1y={tickersData?.quotes.USD.percent_change_1y}
                            />
                        </Route>
                        <Route path={`/:coinId/chart`}>
                            <Chart coinId={coinId} />
                        </Route>
                    </Switch>
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>
                    <Description>
                        <span>Description</span>
                        <p>{infoData?.description}</p>
                    </Description>
                </>
            )}
        </Container>
    );
}
export default Coin;
