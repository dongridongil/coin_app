import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atom';
import { MdOutlineDarkMode } from 'react-icons/md';

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
    background-color: white;
    color: black;
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;
const Title = styled.h1`
    text-align: center;
    font-size: 58px;
    color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
    text-align: center;
    display: block;
`;
const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;
interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}
const Nav = styled.div`
    position: absolute; /* 절대 위치 */
    margin-top: 20px;
    margin-left: 500px;
`;

interface ICoinDark {}
function Coins({}: ICoinDark) {
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);
    return (
        <Container>
            <Helmet>
                <title>Coins</title>
            </Helmet>

            <Header>
                <Title>Coin aPp</Title>
                <Nav>
                    <button onClick={toggleDarkAtom}>
                        <MdOutlineDarkMode size={'30'} />
                    </button>
                </Nav>
            </Header>
            {isLoading ? (
                <Loader>API 호출중입니다.</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link
                                to={{
                                    pathname: `/${coin.id}`,
                                    state: { name: coin.name },
                                }}
                            >
                                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
}
export default Coins;
