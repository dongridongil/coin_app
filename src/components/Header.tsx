import styled from 'styled-components';

interface IPercent24h {
    percent24h: number | undefined;
}

const Head = styled.header`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 30px 0;
`;

const TitleDiv = styled.div`
    display: flex;
    flex-direction: column;
`;
const Title = styled.h1`
    font-size: 22px;
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
`;
const PriceSpan = styled.span`
    font-size: 22px;
    font-weight: 600;
    margin: 9px 0;
    color: ${(props) => props.theme.textColor};
`;
const Percent24h = styled.span<IPercent24h>`
    color: ${(props) => (props.percent24h && props.percent24h >= 0 ? '#DA5157' : '#4880EE')};
    font-weight: 600;
    span {
        color: ${(props) => props.theme.grayText};
        font-weight: normal;
        margin-left: 5px;
    }
`;
const Rank = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 20px;
    border-radius: 12px;
    background-color: ${(props) => props.theme.divColor};
    span {
        font-size: 18px;
        color: ${(props) => props.theme.textColor};
    }
    p {
        margin-top: 5px;
        font-size: 25px;
        font-weight: 600;
        color: ${(props) => props.theme.textColor};
    }
`;

interface IHeaderProps {
    name: string | undefined;
    rank: number | undefined;
    price: number | undefined;
    per24: number | undefined;
}

function Header({ name, rank, price, per24 }: IHeaderProps) {
    return (
        <Head>
            <TitleDiv>
                <Title>{name}</Title>
                <PriceSpan>${Number(price?.toFixed(2)).toLocaleString()}</PriceSpan>
                <Percent24h percent24h={per24}>
                    {price && per24
                        ? per24 >= 0
                            ? `+$${((price * Math.abs(per24)) / 100).toFixed(2)}`
                            : `-$${((price * Math.abs(per24)) / 100).toFixed(2)}`
                        : undefined}{' '}
                    ({per24}%) <span>24시간전</span>
                </Percent24h>
            </TitleDiv>
            <Rank>
                <span>Rank</span>
                <p>{rank}</p>
            </Rank>
        </Head>
    );
}

export default Header;
