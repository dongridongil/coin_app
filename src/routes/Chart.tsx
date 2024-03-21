import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atom';
import { isWhiteSpaceLike } from 'typescript';

interface IHistorical {
    time_open: string;
    time_close: number;
    open: number;
    high: number;
    low: number;
    close: string;
    volume: number;
    market_cap: number;
}
interface ChartProps {
    coinId: string;
}

const Message = styled.span`
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    display: block;
    color: ${(props) => props.theme.textColor};
`;

function Chart({ coinId }: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId), {
        refetchInterval: 10000,
    });
    const exceptData = data ?? [];
    let chartData = null;
    if (Array.isArray(data)) {
        chartData = exceptData?.map((i) => {
            return {
                x: i.time_close,
                y: [i.open, i.high, i.low, i.close],
            };
        });
    }
    return (
        <div>
            {isLoading ? (
                <Message>Loading chart...</Message>
            ) : chartData ? (
                <ApexChart
                    type="candlestick"
                    series={[{ data: chartData }]}
                    options={{
                        theme: {
                            mode: isDark ? 'dark' : 'light',
                        },
                        chart: {
                            height: 500,
                            width: 500,
                            background: 'transparent',
                            toolbar: { show: false },
                        },
                        tooltip: {
                            y: {
                                formatter: (value) => `$${Number(value.toFixed(2)).toLocaleString()}`,
                            },
                        },
                        grid: {
                            show: false,
                        },
                        xaxis: {
                            labels: {
                                show: false,
                            },
                            type: 'datetime',
                        },
                        yaxis: {
                            labels: {
                                show: false,
                            },
                            tooltip: {
                                enabled: true,
                            },
                        },
                    }}
                />
            ) : (
                <Message>Price data not found</Message>
            )}
        </div>
    );
}
export default Chart;
