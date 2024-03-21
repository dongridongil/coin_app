import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    justify-items: center;
    gap: 20px;
    grid-template-columns: repeat(2, 1fr);
`;

const Box = styled.div`
    background-color: ${(props) => props.theme.divColor};
    padding: 20px;
    border-radius: 15px;
    width: 100%;
`;
const TimeBox = styled.span`
    font-size: 18px;
    display: block;
    margin-bottom: 10px;
    color: ${(props) => props.theme.grayText};
    font-weight: 600;
`;
interface IPriceProps {
    percent30m: number | undefined;
    percent1h: number | undefined;
    percent12h: number | undefined;
    percent7d: number | undefined;
    percent30d: number | undefined;
    percent1y: number | undefined;
}
const PercentBox = styled.div<{ percent: number | undefined }>`
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: ${(props) =>
        props.percent ? (props.percent > 0 ? '#DA5157' : props.percent < 0 ? '#4880EE' : '#000') : 'none'};
`;
const Percent = styled.span`
    font-size: 35px;
    font-weight: 600;
`;
function Price({ percent30m, percent1h, percent12h, percent7d, percent30d, percent1y }: IPriceProps) {
    const percentList = [
        { text: '30분', value: percent30m },
        { text: '1시간', value: percent1h },
        { text: '12시간', value: percent12h },
        { text: '7일', value: percent7d },
        { text: '30일', value: percent30d },
        { text: '1년', value: percent1y },
    ];
    return (
        <Container>
            {percentList.map((item) => (
                <Box key={item.text}>
                    <TimeBox>{item.text} 전</TimeBox>
                    <PercentBox percent={item.value}>
                        <Percent>{item.value && item.value > 0 ? `+${item.value}%` : `${item.value}%`}</Percent>
                    </PercentBox>
                </Box>
            ))}
        </Container>
    );
}

export default Price;
