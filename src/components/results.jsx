import { Result, Card, Space, Flex } from "antd";
import { ResultContext } from '../App';
import { useContext } from 'react';

function Results () {
    const { results } = useContext(ResultContext);

    if(results.length === 0) {
        return (
            <div className="results-container">
                <div className="result-container">
                    <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the matches you find does not exist  :("
                        // extra={<Button type="primary">Back Home</Button>}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div className="results-container">
                <div className="result-container">
                    <Flex direction="vertical" size={16} gap={"small"} justify="center" wrap>
                        {results.map(
                            (drawMatch, idx) => (
                                <Card key={`draw ${idx}`} size="small" title={`Draw ${idx}`} style={{ width: 300 }}>
                                    {   
                                        drawMatch.map((releaseMatch, idx) => (
                                            <Flex key={`release ${idx}`} gap={"small"}>
                                                <div className="release-number caveat-400">{`${releaseMatch[0]}: `}</div>
                                                <Space>
                                                    {
                                                        releaseMatch.slice(1).map((match, idx) => {
                                                            if (match !== '') {
                                                                return (
                                                                  <img
                                                                    key={idx}
                                                                    src={`https://marcussyl.github.io/mark-sixer/assets/balls/${match}.svg`}
                                                                    alt={`${match}`}
                                                                    width={"28"}
                                                                    height={
                                                                      "28"
                                                                    }
                                                                  />
                                                                );
                                                            }
                                                        })
                                                    }
                                                </Space>
                                            </Flex>
                                        ))
                                    }
                                </Card>
                            )
                        )}
                    </Flex>
                </div>
            </div>
        )
    }
}

export default Results