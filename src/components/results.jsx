import '../scss/results.scss';
import { AntDesignOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space, Result } from "antd";
import { createStyles } from 'antd-style';
import { ResultContext } from '../App';
import { useContext } from 'react';

const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
        &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
        > span {
            position: relative;
        }
    
        &::before {
            content: '';
            background: linear-gradient(135deg, #6253e1, #04befe);
            position: absolute;
            inset: -1px;
            opacity: 1;
            transition: all 0.3s;
            border-radius: inherit;
        }
    
        &:hover::before {
            opacity: 0;
        }
        }
    `,
}));

function Results () {
    const { results, checkHandler } = useContext(ResultContext);
    const { styles } = useStyle();

    if(results.length === 0) {
        return (
            <div className="results-container">
                <div className="result-container">
                    <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                        // extra={<Button type="primary">Back Home</Button>}
                    />
                </div>
                {/* <ConfigProvider
                    button={{
                    className: styles.linearGradientButton,
                    }}
                >
                    <Space>
                    <Button
                        type="primary"
                        size="large"
                        icon={<AntDesignOutlined />}
                        onClick={checkHandler}
                    >
                        Check
                    </Button>
                    </Space>
                </ConfigProvider> */}
            </div>
        )
    } else {
        return (
            <div className="results-container">
                <div className="result-container">
                    {results.map(
                        (result, idx) => (
                            <div key={`draw ${idx}`} className="draw-match-container">
                            <h4>{`Draw ${idx}`}</h4>
                            {result.map((releaseMatch, idx) => (
                                <div
                                key={`release ${idx}`}
                                className="release-match-container"
                                >
                                <p className="release-number">{`${releaseMatch[0]}: `}</p>
                                <p>{releaseMatch.slice(1).join(", ")}</p>
                                </div>
                            ))}
                            </div>
                        )
                    )}
                </div>
                {/* <ConfigProvider
                    button={{
                    className: styles.linearGradientButton,
                    }}
                >
                    <Space>
                    <Button
                        type="primary"
                        size="large"
                        icon={<AntDesignOutlined />}
                        onClick={checkHandler}
                    >
                        Check
                    </Button>
                    </Space>
                </ConfigProvider> */}
            </div>
        )
    }

    // return (
    //   <div className="results-container">
    //     <div className="result-container">
    //     {
    //         if(results.length === 0) {
                
    //         } else {
    //             results.map(
    //                 (result, idx) =>
    //                 result.length > 0 && (
    //                     <div key={`draw ${idx}`} className="draw-match-container">
    //                     <h4>{`Draw ${idx}`}</h4>
    //                     {result.map((releaseMatch, idx) => (
    //                         <div
    //                         key={`release ${idx}`}
    //                         className="release-match-container"
    //                         >
    //                         <p className="release-number">{`${releaseMatch[0]}: `}</p>
    //                         <p>{releaseMatch.slice(1).join(", ")}</p>
    //                         </div>
    //                     ))}
    //                     </div>
    //                 )
    //             )
    //         }
    //     }
    //       <ConfigProvider
    //         button={{
    //           className: styles.linearGradientButton,
    //         }}
    //       >
    //         <Space>
    //           <Button
    //             type="primary"
    //             size="large"
    //             icon={<AntDesignOutlined />}
    //             onClick={checkHandler}
    //           >
    //             Check
    //           </Button>
    //         </Space>
    //       </ConfigProvider>
    //     </div>
    //   </div>
    // );
}

export default Results