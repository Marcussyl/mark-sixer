import { Result, Card, Space, Flex, Tag } from "antd";
import { ResultContext } from '../App';
import { useContext } from 'react';

function ballSrc(num) {
  return `https://marcussyl.github.io/mark-sixer/assets/balls/${Number(num)}.svg`;
}

function Results () {
    const { results } = useContext(ResultContext);
    const hasMatches = results.some((drawMatch) => drawMatch && drawMatch.length > 0);

    if (!hasMatches) {
        return (
            <div className="results-container">
                <div className="result-container">
                    <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the matches you find does not exist  :("
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="results-container">
            <div className="result-container">
                <Flex direction="vertical" size={16} gap={"small"} justify="center" wrap>
                    {results.map((drawMatch, drawIdx) => {
                        if (!drawMatch || drawMatch.length === 0) return null;
                        return (
                            <Card
                                key={`draw-${drawIdx}`}
                                size="small"
                                title={`Draw ${drawIdx + 1}`}
                                style={{ width: 320 }}
                            >
                                {drawMatch.map((releaseMatch, rIdx) => (
                                    <Flex
                                        key={`release-${rIdx}`}
                                        vertical
                                        gap={4}
                                        style={{ marginBottom: 8 }}
                                    >
                                        <Flex gap="small" align="center" wrap>
                                            <div className="release-number caveat-400">
                                                {`${releaseMatch.releaseId}:`}
                                            </div>
                                            <Tag color="gold">{releaseMatch.prize}</Tag>
                                        </Flex>
                                        <Space wrap>
                                            {releaseMatch.mainHits.map((match) => (
                                                <img
                                                    key={`main-${match}`}
                                                    src={ballSrc(match)}
                                                    alt={`${match}`}
                                                    width={28}
                                                    height={28}
                                                />
                                            ))}
                                            {releaseMatch.specialHit != null && (
                                                <img
                                                    key={`special-${releaseMatch.specialHit}`}
                                                    src={ballSrc(releaseMatch.specialHit)}
                                                    alt={`special ${releaseMatch.specialHit}`}
                                                    title="特別號碼"
                                                    width={28}
                                                    height={28}
                                                    style={{
                                                        outline: "2px solid #e57373",
                                                        borderRadius: "50%",
                                                    }}
                                                />
                                            )}
                                        </Space>
                                    </Flex>
                                ))}
                            </Card>
                        );
                    })}
                </Flex>
            </div>
        </div>
    );
}

export default Results
